'use client';

import { useState } from "react";
import AddContactProfile from "./add-contact-profile";

const ContactProfiles = () => {

    const [currentMails, setCurrentMails] = useState([]);
    const [currentPhones, setCurrentPhones] = useState([]);

    return ( 
        <div>
            <div className="text-lg font-semibold flex flex-row items-center gap-x-4">
                Email-Addressen
                <AddContactProfile
                onAddContact={(addedContact) => setCurrentMails([...currentMails, addedContact])} 
                contactType="EMAIL"
                />
            </div>
            <div>
                {
                    currentMails.length > 0 ? (
                        currentMails.map((mail) => (
                        
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">{mail.title}</span>
                                <span className="text-sm text-gray-200/60">{mail.content}</span>
                            </div>
                        ))
                    ) : (
                        <div>
                            <span className="text-xs text-gray-200/60">
                                Noch keine Email-Adressen hinterlegt..
                            </span>
                        </div>
                    )
                }
            </div>
            <div className="text-lg font-semibold flex flex-row items-center gap-x-4 mt-8">
                Telefonnummern
                <AddContactProfile 
                onAddContact={(addedContact) => setCurrentPhones([...currentPhones, addedContact])}
                contactType="PHONE"
                />
            </div>
            <div >
                {
                    currentPhones.length > 0 ? (
                        <div className="flex flex-col items-center">
                            2
                        </div>
                    ) : (
                        <div>
                            <span className="text-xs text-gray-200/60">
                                Noch keine Telefonnnummer hinterlegt..
                            </span>
                        </div>
                    )
                }
            </div>
        </div>
     );
}
 
export default ContactProfiles;