import React, { cache } from "react";
import { Metadata } from "next";
import { getCurrentUserWithNotifications } from "@/actions/getCurrentUserWithNotifications";
import MobileHeader from "../(dashboard)/_components/mobile-header";
import HeaderLogo from "../(dashboard)/_components/header-logo";
import Footer from "../(dashboard)/_components/footer";

export const metadata: Metadata = {
    title: 'Vermieten auf uRent - Deine Fahrzeuge vermieten',
    description: `PKW, Transporter, LKW, Anhänger und vieles mehr. Vermiete deine Nutzfahrzeuge schnell und bequem auf uRent. 
    Ob privat oder gewerblich - erreiche mehr Kunden und generiere zusätzliches Einkommen.`,
    keywords: "vermieten, Nutzfahrzeuge, Pkw, Lkw, Transporter, Anhaenger, Vermietung",
}

const VermietenGeneralPageLayout = cache(async (
    { children }: { children: React.ReactNode }
) => {

    const currentUser = await getCurrentUserWithNotifications();

    return (
        <div className="dark:bg-[#101114] min-h-screen no-scrollbar">
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
            <div>
                <Footer />
            </div>
        </div>
    );
});

export default VermietenGeneralPageLayout;
