
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

class DatepickerPage{
    /**
     * Method to select a date based on days from today
     * @param {*} numberOfDaysFromToday - a day from today to select
     */
    selectCommonDatepickerDateFromToday(numberOfDaysFromToday){
        // Get the date picker input field and interact with it
        cy.get('[placeholder="Form Picker"]').then(input => {
            // Click the input field to open the calendar picker
            cy.wrap(input).click()
            
            // Call the helper function to select a date based on numberOfDaysFromToday parameter
            // This returns the expected date in the format 'Mon DD, YYYY'
            const dateAssert = selectDateFromCurrentDay(numberOfDaysFromToday)     
            
            // Verify the input field now contains the selected date value
            cy.wrap(input).should('have.value', dateAssert)
        })
    }

    /**
     * Method to select a date range in the range date picker based on days from today
     * @param {number} numberOfDaysFromTodayStart - a day from today for the start date
     * @param {number} numberOfDaysFromTodayEnd - a day from today for the end date
     */
    selectRangeDatepickerFromToday(numberOfDaysFromTodayStart, numberOfDaysFromTodayEnd){
        // Get the range date picker input field and interact with it
        cy.get('[placeholder="Range Picker"]').then(input => {
            // Click the input field to open the calendar picker for date range selection
            cy.wrap(input).click()
            
            // Call the helper function to select the start date of the range
            const dateAssertStart = selectDateFromCurrentDay(numberOfDaysFromTodayStart)     
            
            // Call the helper function to select the end date of the range
            const dateAssertEnd = selectDateFromCurrentDay(numberOfDaysFromTodayEnd) 
            
            // Combine both dates into the expected format 'Mon DD, YYYY - Mon DD, YYYY'
            const finalDate = `${dateAssertStart} - ${dateAssertEnd}`
            
            // Verify the input field now contains the selected date range
            cy.wrap(input).should('have.value', finalDate)
        })
    }
}

export const onDatepickerPage = new DatepickerPage()