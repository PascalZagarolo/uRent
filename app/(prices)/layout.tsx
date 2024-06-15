import React from "react";
import HeaderLogo from "../(dashboard)/_components/header-logo";
import getCurrentUser from "@/actions/getCurrentUser";
import { eq } from "drizzle-orm";
import { notification } from "@/db/schema";
import db from "@/db/drizzle";
import Footer from "../(dashboard)/_components/footer";
import MobileHeader from "../(dashboard)/_components/mobile-header";
import getCurrentUserWithNotifications from "@/actions/getCurrentUserWithNotifications";

const PricingLayout = async (
    { children }: { children: React.ReactNode }
) => {

    const currentUser = await getCurrentUserWithNotifications();

    

    return (
        <div>
            <div>
                <div className="relative top-0 w-full z-50">
                    <HeaderLogo
                        currentUser={currentUser}
                        foundNotifications={currentUser.notifications}
                    />
                </div>
                <div className="sm:hidden">
                    <MobileHeader
                        currentUser={currentUser}
                        foundNotifications={currentUser.notifications}
                    />
                </div>
                <div className="sm:flex sm:justify-center sm:p-8 bg-[#404040]/10">
                    <div className="sm:w-[1044px] w-full dark:bg-[#1c1c1c] rounded-md bg-white">
                        <div className="  min-h-screen">


                            <div className="sm:p-4 p-4   rounded-lg ">
                                <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center justify-center">
                                    uRent Business
                                </h3>
                                <p className="text-sm dark:text-gray-200/70  flex justify-center">
                                    Fange noch heute an. Vermiete, erreiche und verwalte deine Fahrzeuge so einfach wie noch nie.
                                </p>
                            </div>
                            {children}
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

export default PricingLayout;