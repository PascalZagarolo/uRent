import React from "react";
import HeaderLogo from "../(dashboard)/_components/header-logo";
import getCurrentUser from "@/actions/getCurrentUser";
import { eq } from "drizzle-orm";
import { notification } from "@/db/schema";
import db from "@/db/drizzle";
import Footer from "../(dashboard)/_components/footer";
import MobileHeader from "../(dashboard)/_components/mobile-header";

const PricingLayout = async (
    { children }: { children: React.ReactNode }
) => {

    const currentUser = await getCurrentUser();

    const foundNotifications = await db.query.notification.findMany({
        where: (
            eq(notification.userId, currentUser?.id)
        )
    })

    return (
        <div className="relative min-h-screen overflow-x-hidden">
            {/* Animated Background for consistency */}
            <div className="pricing-bg-animated">
                <div className="pricing-bg-shape" style={{ top: '5%', left: '10%', width: '220px', height: '220px', background: '#6366f1' }} />
                <div className="pricing-bg-shape" style={{ top: '70%', left: '80%', width: '320px', height: '320px', background: '#a5b4fc' }} />
                <div className="pricing-bg-shape" style={{ top: '35%', left: '45%', width: '180px', height: '180px', background: '#818cf8' }} />
            </div>
            <div>
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
                <div className="sm:flex sm:justify-center sm:p-8">
                    <div className="sm:w-[1044px] w-full bg-white/90 dark:bg-[#181a2a]/90 rounded-2xl shadow-2xl border border-indigo-900/20 backdrop-blur-md">
                        <div className="min-h-screen">
                            <div className="sm:p-8 p-4 rounded-2xl 
                             mb-8 flex flex-col items-center justify-center">
                                {/* Optional SaaS badge/icon */}
                               
                                <h3 className="text-4xl font-extrabold flex items-center justify-center tracking-tight drop-shadow-sm text-indigo-900 dark:text-indigo-100">
                                    uRent Business
                                </h3>
                                <p className="text-lg text-indigo-700 dark:text-indigo-200 flex justify-center mt-4 font-medium text-center max-w-2xl">
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