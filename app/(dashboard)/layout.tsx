import React, { cache } from "react";

import MobileHeader from "./_components/mobile-header";


import HeaderLogo from "./_components/header-logo";

import getCurrentUserWithNotifications from "@/actions/getCurrentUserWithNotifications";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: 'Mieten und Vermieten auf uRent',
    description: `PKW, Transporter, LKW, Anhänger und vieles mehr. Mieten oder Vermieten Sie Ihre Nutzfahrzeuge mit uRent. 
    Mieten Sie Ihr gewünschtes Fahrzeug oder Vermieten Sie schnell und bequem, ob privat oder gewerblich, auf uRent.`,
    keywords: "mieten, vermieten, Nutzfahrzeuge, Pkw, Lkw, Transporter, Anhaenger",
}

const DashboardLayout = cache(async (
    { children }: { children: React.ReactNode }
) => {

    



    const currentUser = await getCurrentUserWithNotifications();

    

    



    return (
        <div className="bg-[#404040]/10 dark:bg-[#0F0F0F] min-h-screen no-scrollbar">
            <div className="sm:hidden">
                <MobileHeader
                    currentUser={currentUser}
                    foundNotifications={currentUser?.notifications}
                />
            </div>
            <div className="relative top-0 w-full z-50">
                <HeaderLogo
                    currentUser={currentUser}
                    foundNotifications={currentUser?.notifications}
                />
            </div>
               <div className="w-full">
                    {children}
                </div>
        </div>
    );
});

export default DashboardLayout;