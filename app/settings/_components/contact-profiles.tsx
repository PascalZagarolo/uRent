'use client';

import { useState } from "react";
import AddContactProfile from "./add-contact-profile";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";

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

                            
                                <div className="flex flex-col bg-[#141414] rounded-md w-1/2 px-4 py-2 pb-4 mt-2"
                                key={mail.id}
                                >
                                    <div className="flex flex-row items-center ">
                                    <span className="text-sm font-semibold">{mail.title}</span>
                                    <Button variant="ghost" size="sm" className="ml-4">
                                        <PencilIcon className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <TrashIcon className="w-4 h-4" />
                                    </Button>
                                    </div>
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