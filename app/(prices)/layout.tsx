import React from "react";
import HeaderLogo from "../(dashboard)/_components/header-logo";
import getCurrentUser from "@/actions/getCurrentUser";
import { eq } from "drizzle-orm";
import { notification } from "@/db/schema";
import db from "@/db/drizzle";

const PricingLayout = async ({ children }: { children: React.ReactNode }) => {

    const currentUser = await getCurrentUser();

    const foundNotifications = await db.query.notification.findMany({
        where: (
            eq(notification.userId, currentUser?.id)
        )
    })

    return (
        <div>
            <div>
                <div className="relative top-0 w-full z-50">
                    <HeaderLogo
                        currentUser={currentUser}
                        foundNotifications={foundNotifications}
                    />
                </div>
                <div className="flex justify-center p-8 bg-[#404040]/10">
                    <div className="w-[1044px] dark:bg-[#1c1c1c] rounded-md bg-white">
                        <div className="  min-h-screen">


                            <div className="p-4 mt-4  rounded-lg ">
                                <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center justify-center">
                                    uRent Business
                                </h3>
                                <p className="text-sm dark:text-gray-200/70  flex justify-center">
                                    Fange noch heute an. Vermiete, erreiche und verwalte deine Fahrzeuge so einfach wie noch nie.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PricingLayout;