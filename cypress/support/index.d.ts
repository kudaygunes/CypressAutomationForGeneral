
declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command to open the home page
         */
        openHomePage(): Chainable<void>
    }
}