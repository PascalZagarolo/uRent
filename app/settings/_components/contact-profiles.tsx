'use client';

import { useState } from "react";
import AddContactProfile from "./add-contact-profile";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import EditContactProfile from "./edit-contact-profile";
import DeleteContactProfile from "./delete-contact-profile";
import { userContactprofiles } from "@/db/schema";
import { cn } from "@/lib/utils";

interface ContactProfilesProps {
    foundProfiles: typeof userContactprofiles.$inferSelect[];
    foundEmail: typeof userContactprofiles.$inferSelect[];
}

const ContactProfiles = ({ foundProfiles, foundEmail }: ContactProfilesProps) => {

    const loginMail = {
        id: 1,
        title: "Anmeldedaten",
        content: foundEmail,
        profileType: "EMAIL"
    };

    const [currentMails, setCurrentMails] = useState([
        loginMail,
        ...foundProfiles.filter((profile) => profile.profileType === "EMAIL"),
    ]);
    const [currentPhones, setCurrentPhones] = useState(
        foundProfiles.filter((profile) => profile.profileType === "PHONE")
    );

    return (
        <div>
            <div className="text-lg font-semibold flex flex-row items-center gap-x-4">
                Email-Addressen
                <AddContactProfile
                    onAddContact={(addedContact) => setCurrentMails([...currentMails, addedContact])}
                    contactType="EMAIL"
                />
            </div>
            <p className="text-xs text-gray-200/60">
                Füge Kontaktprofile hinzu, um schneller Inserate auszufüllen. <br/> 
                Deine Kontaktprofile sind nicht öffentlich sichtbar.
            </p>
            <div>
                {
                    currentMails.length > 0 ? (
                        currentMails.map((mail) => (
                            <div className="flex flex-col bg-[#141414] rounded-md w-1/2 px-4 py-2 pb-4 mt-2"
                                key={mail.id}
                            >
                                <div className={cn("flex flex-row items-center ", mail?.id === 1 && "py-2")}>
                                    <span className={cn("text-sm font-semibold", mail.id === 1 && "underline text-indigo-800 font-bold")}>{mail.title}</span>
                                    {mail.id !== 1 && (
                                        <>
                                            <EditContactProfile thisProfile={mail as any}
                                                onChangeProfile={(profile) => {
                                                    const newMails = currentMails.map((m) => {
                                                        if (m.id === mail.id) {
                                                            return profile;
                                                        }
                                                        return m;
                                                    });
                                                    setCurrentMails(newMails as any);
                                                }}
                                            />
                                            <DeleteContactProfile
                                                profileId={mail.id as string}
                                                onDelete={(deletedProfile) => {
                                                    const newMails = currentMails.filter((m) => m.id !== deletedProfile.id);
                                                    setCurrentMails(newMails);
                                                }}
                                            />
                                        </>
                                    )}
                                </div>
                                <span className="text-sm text-gray-200/60">{mail.content as string}</span>
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
                        currentPhones.map((mail) => (
                            <div className="flex flex-col bg-[#141414] rounded-md w-1/2 px-4 py-2 pb-4 mt-2"
                                key={mail.id}
                            >
                                <div className="flex flex-row items-center ">
                                    <span className="text-sm font-semibold">{mail.title}</span>
                                    <EditContactProfile thisProfile={mail}
                                        onChangeProfile={(profile) => {
                                            const newPhones = currentPhones.map((m) => {
                                                if (m.id === mail.id) {
                                                    return profile;
                                                }
                                                return m;
                                            });
                                            setCurrentPhones(newPhones as any);
                                        }}
                                    />
                                    <DeleteContactProfile
                                        profileId={mail.id}
                                        onDelete={(deletedProfile) => {
                                            const newPhones = currentPhones.filter((m) => m.id !== deletedProfile.id);
                                            setCurrentPhones(newPhones);
                                        }}
                                    />
                                </div>
                                <span className="text-sm text-gray-200/60">{mail.content}</span>
                            </div>

                        ))
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