/// <reference types="cypress" />

import { navigateTo } from "../page-objects/navigationPage"

beforeEach('Open test application', () => {
        cy.visit('/')
})

it.only('tooltips', () => {
    // Navigate to Modal & Overlays section and Tooltip page
    navigateTo.tooltipPage()

    // Trigger a mouseenter event on the button labeled 'Top' to display the tooltip
    cy.contains('button', 'Top').trigger('mouseenter')

    // Assert the tooltip element appears and contains the expected text
    cy.get('nb-tooltip').should('have.text', 'This is a tooltip')
})