import { navigateTo } from "../page-objects/navigationPage"

beforeEach('Open test application', () => {
        cy.visit('/')
})

it.only('checkboxes', () => {
    // Navigate to Modal & Overlays section and Toastr page
    navigateTo.toastrPage()

    // Find all checkbox elements on the page and check them all at once using force:true to bypass visibility checks
    cy.get('[type="checkbox"]').check({force:true})
    
    // Verify all checkboxes are now checked
    cy.get('[type="checkbox"]').should('be.checked')
})

it.only('lists and dropdowns', () => {
    // Navigate to Modal & Overlays section and Toastr page
    navigateTo.toastrPage()

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