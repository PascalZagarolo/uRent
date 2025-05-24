'use client'

import { User2Icon } from "lucide-react";
import SaveChangesSettings from "../_components/save-changes";
import ProfilePicSettings from "../_components/profilepic-settings";
import UsernameInput from "../_components/username-input";
import Vorname from "../_components/change-vorname";
import Nachname from "../_components/change-nachname";
import ChangeEmail from "../_components/change-email";
import { RiContactsBookFill } from "react-icons/ri";
import ContactProfiles from "../_components/contact-profiles";
import { userTable } from "@/db/schema";
import { useState } from "react";

interface AccountTabProps {
    currentUser: typeof userTable.$inferSelect | any;
}

const AccountTab = ({ currentUser }: AccountTabProps) => {
    const [nameIsTaken, setNameIsTaken] = useState(false);

    return (
        <div>
            {/* Account Management Section */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                        <User2Icon className="w-5 h-5 mr-2" />
                        Account verwalten
                    </h2>
                    <SaveChangesSettings
                        thisUser={currentUser}
                        disabled={nameIsTaken}
                    />
                </div>
                
                <div className="bg-white dark:bg-[#252525] rounded-lg shadow-sm overflow-hidden">
                    <div className="border-b border-gray-100 dark:border-gray-700 p-5">
                        <h3 className="text-base font-medium text-gray-800 dark:text-gray-200">Profilinformationen</h3>
                    </div>
                    
                    <div className="p-5">
                        <div className="flex flex-col sm:flex-row gap-8 items-start">
                            {/* Profile Image */}
                            <div className="flex-shrink-0 sm:border-r sm:dark:border-gray-700 sm:pr-8">
                                <ProfilePicSettings
                                    imageUrl={currentUser?.image}
                                    thisUserId={currentUser?.id}
                                />
                            </div>

                            {/* User Information */}
                            <div className="flex-1 w-full space-y-6">
                                <div className="space-y-5 w-full">
                                    <div className="w-full">
                                        <UsernameInput
                                            thisUser={currentUser}
                                            setNameIsTaken={setNameIsTaken}
                                        />
                                    </div>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                                        <div className="w-full">
                                            <Vorname
                                                thisUser={currentUser}
                                            />
                                        </div>
                                        <div className="w-full">
                                            <Nachname
                                                thisUser={currentUser}
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="pt-5 border-t border-gray-100 dark:border-gray-700 w-full">
                                    <div className="w-full">
                                        <ChangeEmail
                                            thisUser={currentUser}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Profiles Section */}
            <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center mb-4">
                    <RiContactsBookFill className="w-5 h-5 mr-2" />
                    Kontaktprofile verwalten
                </h2>
                
                <div className="bg-white dark:bg-[#252525] rounded-lg shadow-sm overflow-hidden">
                    <div className="border-b border-gray-100 dark:border-gray-700 p-5">
                        <h3 className="text-base font-medium text-gray-800 dark:text-gray-200">Kontaktprofile</h3>
                    </div>
                    <div className="p-5">
                        <ContactProfiles
                            foundProfiles={currentUser?.userContactprofiles}
                            foundEmail={currentUser?.email}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountTab;