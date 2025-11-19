/// <reference types="cypress" />

import { navigateTo } from "../page-objects/navigationPage"

beforeEach('Open test application', () => {
        cy.visit('/')
})

it.only('drag and drop', () => {
    // Navigate to Extra Components section and Drag & Drop page
    navigateTo.dragAndDropPage()

    // Get the first div element from the todo-list, trigger a dragstart event to initiate dragging
    cy.get('#todo-list div').first().trigger('dragstart')
    
    // Trigger a drop event on the drop-list container to simulate dropping the dragged element there
    cy.get('#drop-list').trigger('drop')
})