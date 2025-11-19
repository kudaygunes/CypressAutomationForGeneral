/// <reference types="cypress" />

import { navigateTo } from "../page-objects/navigationPage"

beforeEach('Open test application', () => {
        cy.visit('/')
})

it.only('iFrames', () => {
    // Navigate to Modal & Overlays section and Dialog page
    navigateTo.dialogPage()

    // Wait for the iframe with data-cy attribute 'esc-close-iframe' to load before proceeding
    // This ensures the iframe is ready for interaction
    cy.frameLoaded('[data-cy="esc-close-iframe"]')

    // Method 1: Using cy.iframe() - Access elements inside the iframe and interact with them
    // Find the button text 'Open Dialog with esc close' inside the iframe and click it
    cy.iframe('[data-cy="esc-close-iframe"]').contains('Open Dialog with esc close').click()
    
    // Find and click the 'Dismiss Dialog' button (this closes the dialog)
    cy.contains('Dismiss Dialog').click()

    // Method 2: Using cy.enter() - Get the iframe body and execute commands within its context
    // Enter the iframe and receive the getBody function to access its DOM
    cy.enter('[data-cy="esc-close-iframe"]').then(getBody => {
        // Use getBody() to find elements within the iframe and click 'Open Dialog with esc close'
        getBody().contains('Open Dialog with esc close').click()
        
        // Click the 'Dismiss Dialog' button to close the dialog
        cy.contains('Dismiss Dialog').click()
        
        // Use getBody() again to find and click 'Open Dialog without esc close'
        getBody().contains('Open Dialog without esc close').click()
        
        // Click the 'OK' button to close this dialog variant
        cy.contains('OK').click()
    })
})