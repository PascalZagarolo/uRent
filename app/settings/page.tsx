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




const SettingsPage = async () => {

    const currentUser = await getCurrentUser();

    if(!currentUser) {
        redirect("/login")
    }

    const foundNotifications = await db.query.notification.findMany({
        where : (
            eq(notification.userId, currentUser?.id)
        )
    })

    return (
        <div className="bg-[#ECECEC] dark:bg-[#121212]">
            <div className="relative top-0 w-full z-50">
                <HeaderLogo
                    currentUser={currentUser} 
                    foundNotifications={foundNotifications}
                    />
            </div>
            <div className="sm:hidden">
                <MobileHeader
                    currentUser={currentUser}
                    foundNotifications={foundNotifications}
                />
            </div>
            <div className="flex justify-center py-8 px-4">
                <div className="w-[1044px] dark:bg-[#1c1c1c] rounded-md bg-white">
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
                                    imageUrl = {currentUser?.image}
                                    thisUserId = {currentUser?.id}
                                    />
                                </div>
                                <div>
                                <UsernameInput 
                                thisUser = {currentUser}
                                />
                                <Vorname 
                                thisUser = {currentUser}
                                />
                                <Nachname 
                                thisUser = {currentUser}
                                />
                                </div>
                                <div>
                                    <ChangeEmail 
                                    thisUser = {currentUser}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                    <Footer/>
                </div>
        </div>
    );
}

export default SettingsPage;