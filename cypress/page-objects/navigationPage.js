class NavigationPage{
    formLayoutsPage(){
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
    }

    datepickerPage(){
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()
    }

    dialogPage(){
        cy.contains('Modal & Overlays').click()
        cy.contains('Dialog').click()
    }

    toastrPage(){
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()
    }

    tooltipPage(){
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()
    }

    smartTablePage(){
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()
    }

    dragAndDropPage(){
        cy.contains('Extra Components').click()
        cy.contains('Drag & Drop').click()
    }
}

export const navigateTo = new NavigationPage()