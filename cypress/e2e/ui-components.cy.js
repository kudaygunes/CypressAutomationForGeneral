/// <reference types="cypress" />

beforeEach('Open test application', () => {
        cy.visit('/')
})

it.only('input fields', () => {
    // Navigate to Forms section and Form Layouts page
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

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

it.only('radio buttons', () => {
    // Navigate to Forms section and Form Layouts page
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

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

it.only('checkboxes', () => {
    // Navigate to Modal & Overlays section
    cy.contains('Modal & Overlays').click()
    
    // Navigate to Toastr page within Modal & Overlays
    cy.contains('Toastr').click()

    // Find all checkbox elements on the page and check them all at once using force:true to bypass visibility checks
    cy.get('[type="checkbox"]').check({force:true})
    
    // Verify all checkboxes are now checked
    cy.get('[type="checkbox"]').should('be.checked')
})

it.only('lists and dropdowns', () => {
    // Navigate to Modal & Overlays section
    cy.contains('Modal & Overlays').click()
    
    // Navigate to Toastr page within Modal & Overlays
    cy.contains('Toastr').click()

    // Find the div containing 'Toast type:', locate the select element within it, select 'info' option, and verify the selection
    cy.contains('div', 'Toast type:').find('select').select('info').should('have.value', 'info')
    
    // Find the div containing 'Position:', locate the nb-select dropdown, and click to open it
    cy.contains('div', 'Position:').find('nb-select').click()
    
    // In the opened dropdown list, find and click the 'bottom-right' option
    cy.get('.option-list').contains('bottom-right').click()
    
    // Verify the 'Position:' dropdown now displays 'bottom-right' as the selected value
    cy.contains('div', 'Position:').find('nb-select').should('have.text', 'bottom-right')

    // Store the dropdown element and iterate through all available options to test each one
    cy.contains('div', 'Position:').find('nb-select').then(dropdown => {
        // Click to open the dropdown
        cy.wrap(dropdown).click()
        
        // Loop through each option in the dropdown list
        cy.get('.option-list nb-option').each((option, index, list) => {
            // Click the current option
            cy.wrap(option).click()
            
            // If not the last option, click the dropdown again to reopen it for the next iteration
            if(index < list.length-1)
            {
                cy.wrap(dropdown).click()
            }
        })
    })
})

it.only('tooltips', () => {
    // Navigate to Modal & Overlays section
    cy.contains('Modal & Overlays').click()

    // Open the Tooltip demo page
    cy.contains('Tooltip').click()

    // Trigger a mouseenter event on the button labeled 'Top' to display the tooltip
    cy.contains('button', 'Top').trigger('mouseenter')

    // Assert the tooltip element appears and contains the expected text
    cy.get('nb-tooltip').should('have.text', 'This is a tooltip')
})

it.only('dialog boxes', () => {
    // Navigate to Tables & Data section
    cy.contains('Tables & Data').click()

    // Open the Smart Table demo page
    cy.contains('Smart Table').click()

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
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

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
        cy.wait(1000)

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