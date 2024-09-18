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


import { RiContactsBookFill } from "react-icons/ri";
import ContactProfiles from "./_components/contact-profiles";
import { getCurrentUserWithNotificationsContactProfiles } from "@/actions/getCurrentUserWithNotifications";
import TabSwitcher from "./(tabs)/tab-switcher";



const SettingsPage = async () => {

    const currentUser = await getCurrentUserWithNotificationsContactProfiles();

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
                <TabSwitcher 
                currentUser={currentUser}
                />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default SettingsPage;