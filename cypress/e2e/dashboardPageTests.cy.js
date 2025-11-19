/// <reference types="cypress" />

import { navigateTo } from "../page-objects/navigationPage"

beforeEach('Open test application', () => {
        cy.visit('/')
})

it.only('sliders', () => {
    // Get the temperature slider circle element and set its center coordinates using invoke()
    // The cx and cy attributes define the circle's position on the SVG canvas
    cy.get('[tabtitle="Temperature"] circle')
    // Invoke the 'attr' method to set the cx (center x-coordinate) attribute to '256.72'
    .invoke('attr', 'cx', '256.72')
    // Invoke the 'attr' method to set the cy (center y-coordinate) attribute to '80.52'
    .invoke('attr', 'cy', '80.52')
    // Click the slider circle to set the new temperature value
    .click()

    // Find the temperature value display element and verify it shows the expected value of 25
    cy.get('[class="value temperature h1"]').should('contain.text', '25')
})