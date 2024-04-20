import { Settings2Icon, TrendingUp, User2Icon } from "lucide-react";


import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { accounts, notification, userTable } from "@/db/schema";
import getCurrentUser from "@/actions/getCurrentUser";
import HeaderLogo from "@/app/(dashboard)/_components/header-logo";
import BreadCrumpSettings from "../../_components/bread-crump-settings";
import MenuBar from "../../_components/settings-tabs";
import ChangePassword from "./_components/change-password";
import { LockClosedIcon } from "@radix-ui/react-icons";
import Select2Fa from "./_components/select-2fa";
import { FaSignOutAlt } from "react-icons/fa";

import { PiSignOutThin } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { logoutAllUsers } from "@/actions/logout-all";
import { redirect } from "next/navigation";





const SettingsPage = async () => {

    const currentUser = await getCurrentUser();

    if(!currentUser) {
        redirect("/login")
    }

    const findSocials = await db.query.accounts.findFirst({
        where: (
            eq(accounts.userId, currentUser?.id)
        )
    })

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
                                <User2Icon className="mr-4" /> Sicherheit  <p className="ml-4 text-lg"> </p>
                                <div className="ml-auto">

                                </div>
                            </h3>
                            <div className="w-full p-4 mt-2 rounded-md">
                                <div className="pb-4 px-4">
                                    <ChangePassword
                                        userEmail={currentUser?.email}
                                    />
                                </div>
                            </div>
                            {!findSocials && (
                                <>
                                    <h3 className="dark:text-gray-100 text-2xl font-semibold">
                                        <div className="flex items-center">
                                            <LockClosedIcon className="mr-4 h-6 w-6" /> Zwei-Faktor Authentifizierung
                                        </div>
                                        <p className="ml-4 text-xs dark:text-gray-200/60 font-medium">
                                            Erhalte bei jedem Anmeldungsversuch eine Bestätigungs-Email.
                                        </p>

                                    </h3>
                                    <div className="w-full p-4 mt-2 rounded-md">
                                        <div className="pb-4 px-4">
                                            <Select2Fa

                                                thisUser={currentUser}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                            <div>
                                {!findSocials && (
                                    <>
                                        <h3 className="dark:text-gray-100 text-2xl font-semibold">
                                            <div className="flex items-center">
                                                <FaSignOutAlt className="mr-4 h-6 w-6" /> Alle Nutzer ausloggen
                                            </div>
                                            <p className="ml-4 text-xs dark:text-gray-200/60 font-medium">
                                                Logge alle Nutzer aus deinem Account aus, die sich noch eingeloggt haben.
                                            </p>

                                        </h3>
                                        <div className="w-full p-4 mt-2 rounded-md">
                                            <div className="pb-4 px-4">
                                                <form action={logoutAllUsers}>
                                                    <Button className="dark:bg-[#141414] text-sm" variant="ghost">
                                                        <PiSignOutThin className='w-4 h-4 mr-2' />  Ausloggen
                                                    </Button>
                                                </form>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SettingsPage;