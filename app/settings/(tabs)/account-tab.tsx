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

interface AccountTabProps {
    currentUser : typeof userTable.$inferSelect | any;
}

const AccountTab = ({ currentUser } : AccountTabProps) => {
    return ( 
        <div>
            <div className="p-4 mt-4  rounded-lg ">
                            <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center">
                                <User2Icon className="mr-4" /> Account verwalten  <p className="ml-4 text-lg"> </p>
                                <div className="ml-auto">
                                    <SaveChangesSettings
                                        thisUser={currentUser}
                                    />
                                </div>
                            </h3>
                            <div className="w-full p-4 mt-2 rounded-md">
                                <div className="pb-4 px-4">
                                    <ProfilePicSettings
                                        imageUrl={currentUser?.image}
                                        thisUserId={currentUser?.id}

                                    />
                                </div>
                                <div>
                                    <UsernameInput
                                        thisUser={currentUser}
                                    />
                                    <Vorname
                                        thisUser={currentUser}
                                    />
                                    <Nachname
                                        thisUser={currentUser}
                                    />
                                </div>
                                <div>
                                    <ChangeEmail
                                        thisUser={currentUser}
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center">
                                    <RiContactsBookFill  className="mr-4" /> Kontaktprofile verwalten  <p className="ml-4 text-lg"> </p>
                                </h3>
                                <div className="w-full p-4 mt-2 rounded-md">
                                    <ContactProfiles 
                                    foundProfiles = {currentUser?.userContactprofiles}
                                    foundEmail = {currentUser?.email}
                                    />
                                </div>
                            </div>
                        </div>
                        
        </div>
     );
}
 
export default AccountTab;