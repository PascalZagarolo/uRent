import React, { cache } from "react";
import getCurrentUser from "../../actions/getCurrentUser";
import MobileHeader from "./_components/mobile-header";

import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { notification } from "@/db/schema";
import HeaderLogo from "./_components/header-logo";


const DashboardLayout = cache(async (
    { children }: { children: React.ReactNode }
) => {

    <meta
        name="Mieten auf uRent!"
        content="Kostenlos und schnell mieten auf uRent. Mieten Sie alles, was Sie brauchen."
    />



    const currentUser = await getCurrentUser();

    console.log(currentUser)

    const foundNotifications = await db.query.notification.findMany({
        where: (
            eq(notification.userId, currentUser?.id)
        )

    })



    return (
        <div className="bg-[#404040]/10 dark:bg-[#0F0F0F] min-h-screen no-scrollbar">
            <div className="sm:hidden">
                <MobileHeader
                    currentUser={currentUser}
                    foundNotifications={foundNotifications}
                />
            </div>
            <div className="relative top-0 w-full z-50">

                <HeaderLogo
                    currentUser={currentUser}
                    foundNotifications={foundNotifications}
                />
            </div>

            <section className="flex justify-center w-full">
                <div className="p-4 hidden sm:block">
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9497499351411762"
                        crossOrigin="anonymous"></script>
                   
                    <ins className="adsbygoogle"
                        style={{ display:"block" }}
                        data-ad-client="ca-pub-9497499351411762"
                        data-ad-slot="3797720061"
                        data-ad-format="auto"
                        data-full-width-responsive="true"></ins>
                    <script>
                        (adsbygoogle = window.adsbygoogle || []).push({ });
                    </script>
                </div>
                <div>
                    {children}
                </div>
                <div className="p-4 hidden sm:block">
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9497499351411762"
                        crossOrigin="anonymous"></script>
                   
                    <ins className="adsbygoogle"
                        style={{ display:"block" }}
                        data-ad-client="ca-pub-9497499351411762"
                        data-ad-slot="3797720061"
                        data-ad-format="auto"
                        data-full-width-responsive="true"></ins>
                    <script>
                        (adsbygoogle = window.adsbygoogle || []).push({ });
                    </script>
                </div>
            </section>

        </div>
    );
});

export default DashboardLayout;