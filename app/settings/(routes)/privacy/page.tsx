import { Settings2Icon, TrendingUp, User2Icon } from "lucide-react";


import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { notification, userTable } from "@/db/schema";
import getCurrentUser from "@/actions/getCurrentUser";
import HeaderLogo from "@/app/(dashboard)/_components/header-logo";

import MenuBar from "../../_components/settings-tabs";
import AccountPrivacy from "./_components/account-privacy";
import DataUsage from "./_components/data-usage";
import { MdOutlinePrivacyTip } from "react-icons/md";
import BreadCrumpSettings from "../../_components/bread-crump-settings";
import { redirect } from "next/navigation";
import Footer from "@/app/(dashboard)/_components/footer";
import MobileHeader from "@/app/(dashboard)/_components/mobile-header";
import { getCurrentUserWithNotifications } from "@/actions/getCurrentUserWithNotifications";






const SettingsPage = async () => {

    const currentUser = await getCurrentUserWithNotifications();

    if(!currentUser) {
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
                            <MdOutlinePrivacyTip className="w-6 h-6 mr-2" /> Privatsphäre  <p className="ml-4 text-lg"> </p>
                                <div className="ml-auto">

                                </div>
                            </h3>
                            <div className="w-full sm:p-4 mt-2 rounded-md">
                                <div className="pb-4 px-4">
                                    <AccountPrivacy 
                                    thisUser={currentUser}
                                    />
                                </div>

                                <div className="p-4">
                                    <DataUsage 
                                    usesNewsletter={currentUser?.newsletter}
                                    currentUserId={currentUser?.id}
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