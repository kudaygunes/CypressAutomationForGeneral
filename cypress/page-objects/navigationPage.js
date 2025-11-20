
// Helper: Ensures a side-menu group is expanded before selecting an item inside it.
// Parameter: `groupItemName` - the visible text of the group anchor to find (e.g. 'Forms', 'Modal & Overlays')
function selectGroupMenuItem(groupItemName){
    // Find an anchor (<a>) that contains the provided group text and read its `aria-expanded` attribute
    // `invoke('attr', 'aria-expanded')` returns a string like 'true' or 'false'
    cy.contains('a', groupItemName).invoke('attr', 'aria-expanded').then(attr => {
        // If the anchor reports it is not expanded (contains 'false'), click it to expand the group
        // Using includes() is tolerant of string formats; the intent is to click only when collapsed
        if(attr.includes('false')){
            cy.contains('a', groupItemName).click()
        }
        // If already expanded, do nothing — the function simply guarantees the group is open
    })
}

class NavigationPage{
    formLayoutsPage(){
        selectGroupMenuItem('Forms')
        cy.contains('Form Layouts').click()
    }

    datepickerPage(){
        selectGroupMenuItem('Forms')
        cy.contains('Datepicker').click()
    }

    dialogPage(){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Dialog').click()
    }

    toastrPage(){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Toastr').click()
    }

    tooltipPage(){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Tooltip').click()
    }

    smartTablePage(){
        selectGroupMenuItem('Tables & Data')
        cy.contains('Smart Table').click()
    }

    dragAndDropPage(){
        selectGroupMenuItem('Extra Components')
        cy.contains('Drag & Drop').click()
    }
}

export const navigateTo = new NavigationPage()