/// <reference types="cypress" />

beforeEach('Open test application', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
})
it('deranzo huşevni 1', () => {
        //by tag
        cy.get('input')

        //by id
        cy.get('#inputEmail')

        //by class
        cy.get('.input-full-width')

        //by attribute
        cy.get('[fullwidth]')

        //by attribute value
        cy.get('[placeholder="Email"]')

        //by entire attribute value
        cy.get('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

        //how to combine attributes
        cy.get('[placeholder="Email"][fullwidth]')
        cy.get('input[placeholder="Email"]')

        //find by data-cy attribute
        cy.get('[data-cy="inputEmail1"]')
})

it.only('cypress locator methods', ()=> {
        
        // get: find elements on the page globally
        // find: find only child elements
        // contains: find elements by text

        cy.contains('Sign in')
        cy.contains('[status="warning"]', 'Sign in')
        cy.contains('nb-card', 'Horizontal form').find('button')
        cy.contains('nb-card', 'Horizontal form').contains('Sign in')
        cy.contains('nb-card', 'Horizontal form').get('button')
})

it.only('Child Elements', () => {
        // Find nb-card containing "Using the Grid", then find .row within it, then find button within that row
        cy.contains('nb-card', 'Using the Grid').find('.row').find('button')
        
        // Find all nb-card elements, then find nb-radio-group child within them, then locate text "Option 1"
        cy.get('nb-card').find('nb-radio-group').contains('Option 1')
        
        // Find nb-card elements and nb-radio-group descendants using CSS selector, then locate text "Option 1"
        cy.get('nb-card nb-radio-group').contains('Option 1')
        
        // Find nb-card element with direct child nb-card-body, then find input with placeholder "Jane Doe" using attribute selector
        cy.get('nb-card > nb-card-body [placeholder="Jane Doe"]')
                
        })

it.only('Parent Elements' , () => {
        // Select the element with id "inputEmail1", traverse up through its ancestors to the nearest <form>,
        // then find any <button> elements inside that form.
        cy.get('#inputEmail1').parents('form').find('button')

        // Find an element containing the text "Using the Grid", get its direct parent element,
        // then search for <button> elements within that parent.
        cy.contains('Using the Grid').parent().find('button')

        // Starting from #inputEmail1, collect all ancestor elements up until (but not including)
        // the element matched by 'nb-card-body'. Useful for inspecting the ancestry chain.
        cy.get('#inputEmail1').parentsUntil('nb-card-body')
        })

it.only('Reusing locators', () => {
        // 1. Cypress Alias - Store element reference with a named alias for reuse
        // Get the email input element and assign it the alias 'emailInput1'
        cy.get('#inputEmail1').as('emailInput1')
        
        // Use the stored alias to find parent form and locate button within it
        cy.get('@emailInput1').parents('form').find('button')
        
        // Use the same alias again to find parent form and locate nb-radio within it
        cy.get('@emailInput1').parents('form').find('nb-radio')

        // 2. Cypress then() method - Capture element and execute commands within callback
        // Get the email input element and execute a callback function with the element
        cy.get('#inputEmail1').then( inputEmail => {
                // Wrap the captured element and find parent form, then locate button
                cy.wrap(inputEmail).parents('form').find('button')
                
                // Wrap the captured element and find parent form, then locate nb-radio
                cy.wrap(inputEmail).parents('form').find('nb-radio')
                
                // Create an alias 'inputEmail2' for the captured element for later use
                cy.wrap(inputEmail).as('inputEmail2')
        })
        
        // Use the alias created in the then() callback to click the element
        cy.get('@inputEmail2').click()
})

it.only('Extracting values', () => {
        // 1. Using jQuery method - Extract text using .text() jQuery method
        // Get the label element and extract its text content using jQuery
        cy.get('[for="exampleInputEmail1"]').then(label => {
                // Use jQuery .text() method to extract the text from the label element
                const emailLabel = label.text()
                // Log the extracted text to the console
                console.log(emailLabel)
        })

        // 2. Using invoke method - Extract value using Cypress .invoke() command
        // Get the label element and invoke the 'text' jQuery method to extract text
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(emailLabel => {
                // Log the extracted text to the console
                console.log(emailLabel)
        })

        // Get the label element, invoke 'text' method, and store the result as an alias
        cy.get('[for="exampleInputEmail1"]').invoke('text').as('emailLabel')
        
        // Verify the label contains the expected text 'Email address'
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        // 3. Invoke attribute value - Extract HTML attribute using .invoke()
        // Get the input element and invoke the 'attr' method to extract the 'class' attribute
        cy.get('#exampleInputEmail1').invoke('attr', 'class').then(classValue => {
                // Log the extracted class attribute value to the console
                console.log(classValue)
        })

        // Verify the input element has a specific class attribute with the expected full value
        cy.get('#exampleInputEmail1').should('have.attr', 'class', 'input-full-width size-medium status-basic shape-rectangle nb-transition')

        // 4. Invoke input field value - Extract the value property from an input element
        // Type 'deranzo' into the input field
        cy.get('#exampleInputEmail1').type('deranzo')
        
        // Get the input element and invoke the 'prop' method to extract its current 'value' property
        cy.get('#exampleInputEmail1').invoke('prop', 'value').then(value => {
                // Log the extracted input value to the console
                console.log(value)
        })
})

it.only('Assertions', () => {
        // Cypress should() syntax - Verify label contains 'Email address' text
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')
        
        // Cypress should() syntax - Verify label has exact text 'Email address'
        cy.get('[for="exampleInputEmail1"]').should('have.text', 'Email address')
        
        // Using then() callback with Chai expect() - Extract element and use expect assertions
        cy.get('[for="exampleInputEmail1"]').then(label => {
                // Use Chai expect to verify the label jQuery object contains 'Email address'
                expect(label).to.contain('Email address')
                
                // Use Chai expect to verify the label has exact text 'Email address'
                expect(label).to.have.text('Email address')
                
                // Log the label element to the console for debugging
                console.log(label)
        })
        
        // Extract text value and use Chai expect() and Cypress should() for assertions
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(emailLabel => {
                // Use Chai expect to verify the extracted string equals 'Email address' exactly
                expect(emailLabel).to.equal('Email address')
                
                // Wrap the extracted string and use Cypress should() syntax for assertion
                cy.wrap(emailLabel).should('equal', 'Email address')
        })
})


it.only('timeouts', () =>{
        // Navigate to Modal & Overlays section by clicking on its text
        cy.contains('Modal & Overlays').click()
        
        // Navigate to Dialog subsection by clicking on its text
        cy.contains('Dialog').click()
        
        // Click the button/link that opens a dialog with a 3-second delay
        cy.contains('Open with delay 3 seconds').click()
        
        // Find the dialog header element with a custom timeout of 11 seconds (longer than the 3-second delay),
        // and verify it contains the text 'Friendly reminder'
        cy.get('nb-dialog-container nb-card-header', {timeout: 11000}).should('have.text', 'Friendly reminder')
})