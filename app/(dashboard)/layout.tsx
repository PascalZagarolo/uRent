import React, { cache } from "react";

import MobileHeader from "./_components/mobile-header";


import HeaderLogo from "./_components/header-logo";

import { Metadata } from "next";
import { getCurrentUserWithNotifications } from "@/actions/getCurrentUserWithNotifications";


export const metadata: Metadata = {
    title: 'Mieten und Vermieten auf uRent',
    description: `PKW, Transporter, LKW, Anhänger und vieles mehr. Miete oder Vermiete deine Nutzfahrzeuge mit uRent. 
    Miete dein gewünschtes Fahrzeug oder Vermiete es schnell und bequem, ob privat oder gewerblich, auf uRent.`,
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
                    currentUser={currentUser as any}
                    foundNotifications={currentUser?.notifications}
                />
            </div>
            <div className="relative top-0 w-full z-50">
                <HeaderLogo
                    currentUser={currentUser as any}
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