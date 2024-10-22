'use client'

import SaveChangesDialog from "@/app/inserat/create/[inseratId]/sections/_components/save-changes-dialog";


export const switchSectionOverview = (hasChanged: boolean, openDialog: (value: boolean) => void) => {
    
    if (hasChanged) {
        openDialog(true); // This should now trigger the dialog open state correctly
        return; // Return here to stop execution after opening the dialog
    }
    // Get the current URL's pathname (without the query parameters)
    const newUrl = window.location.pathname;

    // Use history.pushState to update the URL without the query parameters
    window.history.pushState(null, '', newUrl);
};