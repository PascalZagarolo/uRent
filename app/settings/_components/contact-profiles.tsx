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
                contactType="email"
                />
            </div>
            <div className="">
                {
                    currentMails.length > 0 ? (
                        <div className="flex flex-col items-center">
                            2
                        </div>
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
                contactType="phone"
                />
            </div>
            <div className="">
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