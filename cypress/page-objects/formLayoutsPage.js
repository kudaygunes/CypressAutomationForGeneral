
class FormLayoutsPage{
    /**
     * Method to submit the 'Using the Grid' form with provided email, password, and radio button option index
     * @param {string} email - valid user email
     * @param {string} password - valid user password
     * @param {number} optionIndex - index of the radio button to select (0 = first option)
     */
    submitUsingTheGridForm(email, password, optionIndex){
        // Find the 'Using the Grid' form card and store it for use in subsequent operations
        cy.contains('nb-card', 'Using the Grid').then(form => {
            // Type the provided email address into the email input field (ID: inputEmail1)
            cy.wrap(form).find('#inputEmail1').type(email)
            
            // Type the provided password into the password input field (ID: inputPassword2)
            cy.wrap(form).find('#inputPassword2').type(password)
            
            // Select the radio button at the specified index (0 = first option, 1 = second, etc.)
            cy.wrap(form).find('[type="radio"]').eq(optionIndex).check({force:true})
            
            // Click the 'Sign in' button to submit the form
            cy.wrap(form).contains('Sign in').click()
        })
    }

    /**
     * Method to submit the 'Basic form' form with provided email, password, and radio button option index
     * @param {string} email - valid user email
     * @param {string} password - valid user password
     * @param {boolean} isCheckboxSelected - whether to check the checkbox or not
     */
    submitBasicForm(email, password, isCheckboxSelected){
        // Find the 'Basic form' card and store it for use in subsequent operations
        cy.contains('nb-card', 'Basic form').then(form => {
            // Type the provided email address into the email input field (ID: exampleInputEmail1)
            cy.wrap(form).find('#exampleInputEmail1').type(email)
            
            // Type the provided password into the password input field (ID: exampleInputPassword1)
            cy.wrap(form).find('#exampleInputPassword1').type(password)
            
            // If isCheckboxSelected is true, check the checkbox using force:true to bypass visibility checks
            if(isCheckboxSelected){
                cy.wrap(form).find('[type="checkbox"]').check({force:true})
            }
            
            // Check the checkbox (this line appears to always execute regardless of the if condition)
            cy.wrap(form).find('[type="checkbox"]').check({force:true})
            
            // Click the 'Submit' button to submit the form
            cy.wrap(form).contains('Submit').click()
        })
    }
}

export const onFormLayoutsPage = new FormLayoutsPage()