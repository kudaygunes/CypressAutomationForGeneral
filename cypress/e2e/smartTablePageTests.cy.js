/// <reference types="cypress" />

import { navigateTo } from "../page-objects/navigationPage"

beforeEach('Open test application', () => {
        cy.visit('/')
})

it.only('dialog boxes', () => {
    // Navigate to Tables & Data section and Smart Table page
    navigateTo.smartTablePage()

    /*
    The commented block below shows the default browser confirm handling approach:
    - Click the first trash icon to trigger the confirm dialog
    - Use cy.on('window:confirm') to listen to and assert the confirm message
    */
    /*
    cy.get('.nb-trash').first().click()
    cy.on('window:confirm', confirm => {
        expect(confirm).to.equal('Are you sure you want to delete?')
    })
    */

    // Use cy.window() to get the window object, stub its confirm() method, name the stub 'dialogBox', and return false
    // Returning false simulates the user clicking 'Cancel' on the confirm dialog
    cy.window().then(win => {
        cy.stub(win, 'confirm').as('dialogBox').returns(false)
    })

    // Click the first trash icon which will invoke the stubbed confirm
    cy.get('.nb-trash').first().click()

    // Verify the stubbed confirm was called with the expected message
    cy.get('@dialogBox').should('be.calledWith', 'Are you sure you want to delete?')
})

it.only('web tables', () => {
    // Navigate to Tables & Data section and Smart Table page
    navigateTo.smartTablePage()

    // 1. how to find by text
    cy.get('tbody').contains('tr', 'Ruben').then( tableRow => {
        // Click the edit icon for the located row
        cy.wrap(tableRow).find('.nb-edit').click()

        // Clear the Age input and type a new value
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('40')

        // Click the checkmark to save the row changes
        cy.wrap(tableRow).find('.nb-checkmark').click()

        // Assert the last table cell in the row shows the updated age
        cy.wrap(tableRow).find('td').last().should('have.text', '40')
    })

    // 2. how to find bu index
    cy.get('.nb-plus').click()
    cy.get('thead tr').eq(2).then( tableRow => {
        // Fill the new row inputs for First Name, Last Name, E-mail and Age
        cy.wrap(tableRow).find('[placeholder="First Name"]').type('Mülayim')
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Sert')
        cy.wrap(tableRow).find('[placeholder="E-mail"]').type('sertmulayim@protonmail.com')
        cy.wrap(tableRow).find('[placeholder="Age"]').type('40')

        // Click the checkmark to add/save the new row
        cy.wrap(tableRow).find('.nb-checkmark').click()

        // Verify the first row in tbody contains the newly added values in the expected columns
        cy.get('tbody tr').first().find('td').then( tableColumns => {
            cy.wrap(tableColumns).eq(2).should('have.text', 'Mülayim')
            cy.wrap(tableColumns).eq(3).should('have.text', 'Sert')
            cy.wrap(tableColumns).eq(5).should('have.text', 'sertmulayim@protonmail.com')
            cy.wrap(tableColumns).eq(6).should('have.text', '40')
        })
    })

    // 3. looping through rows

    const ages = [20, 30, 40, 333]
    cy.wrap(ages).each( age => {
        // For each age in the array, type it into the Age filter/input, wait for table to update, then assert rows
        cy.get('[placeholder="Age"]').clear().type(age)

        // Small wait for UI update; in real tests prefer waiting on network or DOM change instead of fixed waits
        cy.wait(500)

        // Iterate over each table row and verify the last column matches the expected behavior
        cy.get('tbody tr').each( tableRows => {
            if(age == 333){
                // For the sentinel value 333, expect the table to show 'No data found'
                cy.wrap(tableRows).find('td').last().should('contain', 'No data found')
            }
            else{
                // Otherwise, expect the last cell to show the entered age
                cy.wrap(tableRows).find('td').last().should('have.text', age)
            }
        })
    })
})