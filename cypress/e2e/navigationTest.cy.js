/// <reference types="cypress" />

import { navigateTo } from "../page-objects/navigationPage"

beforeEach('Open test application', () => {
        cy.visit('/')
})

it('navigation', () => {
    navigateTo.datepickerPage()
    navigateTo.dialogPage()
    navigateTo.dragAndDropPage()
    navigateTo.formLayoutsPage()
    navigateTo.smartTablePage()
    navigateTo.toastrPage()
    navigateTo.tooltipPage()
})