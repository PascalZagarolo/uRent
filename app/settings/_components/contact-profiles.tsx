'use client';

import { useState } from "react";
import AddContactProfile from "./add-contact-profile";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon, Mail, Phone, Plus } from "lucide-react";
import EditContactProfile from "./edit-contact-profile";
import DeleteContactProfile from "./delete-contact-profile";
import { userContactprofiles } from "@/db/schema";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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
        <div className="space-y-8">
            {/* Email Addresses Section */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-gray-600 dark:text-gray-400" />
                        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">Email-Addressen</h3>
                    </div>
                    
                    <AddContactProfile
                        onAddContact={(addedContact) => setCurrentMails([...currentMails, addedContact])}
                        contactType="EMAIL"
                    />
                </div>
                
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    Füge Kontaktprofile hinzu, um schneller Inserate auszufüllen. 
                    Deine Kontaktprofile sind nicht öffentlich sichtbar.
                </p>
                
                <div className="space-y-3">
                    {currentMails.length > 0 ? (
                        currentMails.map((mail) => (
                            <div 
                                key={mail.id}
                                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md border border-gray-100 dark:border-gray-700"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center">
                                        <span className={cn("text-sm font-medium text-gray-700 dark:text-gray-300", 
                                            mail.id === 1 && "text-primary")}
                                        >
                                            {mail.title}
                                        </span>
                                        
                                        {mail.id === 1 && (
                                            <Badge variant="outline" className="ml-2 text-xs">Default</Badge>
                                        )}
                                    </div>
                                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                        {mail.content as string}
                                    </div>
                                </div>
                                
                                {mail.id !== 1 && (
                                    <div className="flex items-center space-x-1">
                                        <EditContactProfile 
                                            thisProfile={mail as any}
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
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-4 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-md">
                            Noch keine Email-Adressen hinterlegt.
                        </div>
                    )}
                </div>
            </div>

            {/* Phone Numbers Section */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-gray-600 dark:text-gray-400" />
                        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">Telefonnummern</h3>
                    </div>
                    
                    <AddContactProfile
                        onAddContact={(addedContact) => setCurrentPhones([...currentPhones, addedContact])}
                        contactType="PHONE"
                    />
                </div>
                
                <div className="space-y-3">
                    {currentPhones.length > 0 ? (
                        currentPhones.map((phone) => (
                            <div 
                                key={phone.id}
                                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md border border-gray-100 dark:border-gray-700"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {phone.title}
                                        </span>
                                    </div>
                                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                        {phone.content}
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-1">
                                    <EditContactProfile 
                                        thisProfile={phone}
                                        onChangeProfile={(profile) => {
                                            const newPhones = currentPhones.map((p) => {
                                                if (p.id === phone.id) {
                                                    return profile;
                                                }
                                                return p;
                                            });
                                            setCurrentPhones(newPhones as any);
                                        }}
                                    />
                                    <DeleteContactProfile
                                        profileId={phone.id}
                                        onDelete={(deletedProfile) => {
                                            const newPhones = currentPhones.filter((p) => p.id !== deletedProfile.id);
                                            setCurrentPhones(newPhones);
                                        }}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-4 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-md">
                            Noch keine Telefonnnummer hinterlegt.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ContactProfiles;