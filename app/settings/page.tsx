import { User2Icon } from "lucide-react";
import HeaderLogo from "../(dashboard)/_components/header-logo";
import getCurrentUser from '../../actions/getCurrentUser';
import MenuBar from "./_components/settings-tabs";
import BreadCrumpSettings from "./_components/bread-crump-settings";
import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { notification, userTable } from "@/db/schema";
import SaveChangesSettings from "./_components/save-changes";
import ProfilePicSettings from "./_components/profilepic-settings";

import MobileHeader from "../(dashboard)/_components/mobile-header";
import Vorname from "./_components/change-vorname";
import Nachname from "./_components/change-nachname";
import UsernameInput from "./_components/username-input";
import ChangeEmail from "./_components/change-email";
import { redirect } from "next/navigation";
import Footer from "../(dashboard)/_components/footer";

import getCurrentUserWithNotifications from "@/actions/getCurrentUserWithNotifications";
import { RiContactsBookFill } from "react-icons/ri";
import ContactProfiles from "./_components/contact-profiles";



const SettingsPage = async () => {

    const currentUser = await getCurrentUserWithNotifications();

    if (!currentUser) {
        redirect("/login")
    }



    return (
        <div className="bg-[#ECECEC] dark:bg-[#121212]">
            <div className="relative top-0 w-full z-50">
                <HeaderLogo
                    currentUser={currentUser}
                    foundNotifications={currentUser?.notifications}
                />
            </div>
            <div className="sm:hidden">
                <MobileHeader
                    currentUser={currentUser}
                    foundNotifications={currentUser?.notifications}
                />
            </div>
            <div className="flex justify-center sm:py-8 sm:px-4">
                <div className="sm:w-[1044px] w-full dark:bg-[#1c1c1c] rounded-md bg-white">
                    <div>
                        <MenuBar />
                    </div>
                    <div className="min-h-screen">
                        <div>
                            <BreadCrumpSettings />
                        </div>
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
                                    <ContactProfiles />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default SettingsPage;