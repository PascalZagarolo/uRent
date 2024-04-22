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





const SettingsPage = async () => {

    const currentUser = await getCurrentUser();

    if(!currentUser) {
        redirect("/login")
    }

    const foundNotifications = await db.query.notification.findMany({
        where: (
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
                            <MdOutlinePrivacyTip className="w-6 h-6 mr-2" /> Privatsphäre  <p className="ml-4 text-lg"> </p>
                                <div className="ml-auto">

                                </div>
                            </h3>
                            <div className="w-full p-4 mt-2 rounded-md">
                                <div className="pb-4 px-4">
                                    <AccountPrivacy 
                                    thisUser={currentUser}
                                    />
                                </div>

                                <div className="p-4">
                                    <DataUsage />
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