/// <reference types="cypress" />

import { navigateTo } from "../page-objects/navigationPage"
import { onDatepickerPage } from "../page-objects/datePickerPage"

beforeEach('Open test application', () => {
        cy.visit('/')
        //cy.openHomePage()
})

it.only('datepickers', () => {
    // Navigate to Forms section and Datepicker page
    navigateTo.datepickerPage()

    // Helper function: Calculate a future date and navigate the calendar to select it
    // Parameters: day - number of days from today to select (e.g., 70 for 70 days from now)
    function selectDateFromCurrentDay(day){
        // Create a new Date object with today's date
        var date = new Date()
        
        // Add the specified number of days to today's date
        date.setDate(date.getDate() + day)
        
        // Extract the day of the month from the calculated date (e.g., 15)
        var futureDay = date.getDate()
        
        // Get the full month name in English locale (e.g., 'January')
        var futureMonthLong = date.toLocaleDateString('en-US', {month: 'long'})
        
        // Get the abbreviated month name in English locale (e.g., 'Jan')
        var futureMonthShort = date.toLocaleDateString('en-US', {month: 'short'})
        
        // Get the full year (e.g., 2025)
        var futureYear = date.getFullYear()
        
        // Create the assertion string in the format expected by the input field (e.g., 'Jan 15, 2025')
        var dateAssert =`${futureMonthShort} ${futureDay}, ${futureYear}`

        // Get the current month and year displayed in the calendar header and check if it matches the target date
        cy.get('nb-calendar-view-mode').invoke('text').then(calenderMonthAndYear => {
            // If the calendar is NOT showing the target month and year, navigate forward
            if(!calenderMonthAndYear.includes(futureMonthLong) || !calenderMonthAndYear.includes(futureYear)){
                // Click the right chevron to move to the next month
                cy.get('[data-name="chevron-right"]').click()
                
                // Recursively call the function again to check if we've reached the target month
                selectDateFromCurrentDay(day)
            }
            else {
                // Calendar is now showing the correct month and year, so click the day cell
                // .not('.bounding-month') ensures we skip dates from adjacent months
                cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
            }      
        })
        
        // Return the formatted date string for later assertion
        return dateAssert
    }

    // Get the date picker input field and interact with it
    cy.get('[placeholder="Form Picker"]').then(input => {
        // Click the input field to open the calendar picker
        cy.wrap(input).click()
        
        // Call the helper function to select a date 70 days from today
        // This returns the expected date in the format 'Mon DD, YYYY'
        const dateAssert = selectDateFromCurrentDay(70)     
        
        // Verify the input field now contains the selected date value
        cy.wrap(input).should('have.value', dateAssert)
    })
})

it.only('parameterized datepicker', () => {
    // Navigate to Forms section and Datepicker page
    navigateTo.datepickerPage()
    
    // Use the page object method to select a date 70 days from today on the common datepicker
    onDatepickerPage.selectCommonDatepickerDateFromToday(70)
    
    // Use the page object method to select a date range starting 7 days from today and ending 12 days from today
    onDatepickerPage.selectRangeDatepickerFromToday(7, 12)
})