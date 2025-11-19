import { navigateTo } from "../page-objects/navigationPage"

beforeEach('Open test application', () => {
        cy.visit('/')
})

it.only('radio buttons', () => {
    // Navigate to Forms section and Form Layouts page
    navigateTo.formLayoutsPage()
    
    // Find the 'Using the Grid' card, locate all radio button inputs, and store them for batch operations
    cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(allRadioButtons => {
        // Select the first radio button (index 0), check it with force, and verify it's checked
        cy.wrap(allRadioButtons).eq(0).check({force:true}).should('be.checked')
        
        // Select the second radio button (index 1) and check it (this will uncheck the first one)
        cy.wrap(allRadioButtons).eq(1).check({force:true})
        
        // Verify the first radio button is now unchecked (since only one can be selected)
        cy.wrap(allRadioButtons).eq(0).should('not.be.checked')
        
        // Verify the third radio button (index 2) is disabled and cannot be interacted with
        cy.wrap(allRadioButtons).eq(2).should('be.disabled')
    })

    // Find the 'Using the Grid' card, locate the text 'Option 1', and click on it
    cy.contains('nb-card', 'Using the Grid').contains('Option 1').click()
    
    // Find the 'Using the Grid' card, locate the label containing 'Option 1', then find the input inside it and check it
    cy.contains('nb-card', 'Using the Grid').contains('label', 'Option 1').find('input').check()
})

it.only('input fields', () => {
    // Navigate to Forms section and Form Layouts page
    navigateTo.formLayoutsPage()

    // Define a test variable to use in input assertions
    const name = 'gunes'
    
    // Target the email input by ID, type 'deranzo' with 200ms delay between keystrokes, clear it, type 'şumşin', then clear again
    cy.get('#inputEmail1').type('deranzo', {delay:200}).clear().type('şumşin').clear()
    
    // Find the 'Using the Grid' card, locate the 'Email' label within it, and type the name variable into that field
    cy.contains('nb-card', 'Using the Grid').contains('Email').type(`${name}`)

    // Verify the email input is empty, clear it, type 'deranzo huşevni', and press the TAB key to move to the next field
    cy.get('#inputEmail1').should('not.have.value', '').clear().type('deranzo huşevni').press(Cypress.Keyboard.Keys.TAB)


    /*
    cy.contains('Auth').click()
    cy.contains('Login').click()

    cy.get('#input-email').type('deranzo@muebbetmuhabbet.com')
    cy.get('#input-password').type('deranzo123{enter}')
    */
})