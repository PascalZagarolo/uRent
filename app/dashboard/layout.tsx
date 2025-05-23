import HeaderLogo from "../(dashboard)/_components/header-logo";
import getCurrentUser from "@/actions/getCurrentUser";
import MobileHeader from "../(dashboard)/_components/mobile-header";
import { eq, sql } from "drizzle-orm";
import db from "@/db/drizzle";
import { notification } from "@/db/schema";
import Footer from "../(dashboard)/_components/footer";
import { redirect } from "next/navigation";
import { getCurrentUserWithNotifications } from "@/actions/getCurrentUserWithNotifications";

const DashboardLayout = async (
    { children }: { children: React.ReactNode },
) => {
    
    const currentUser = await getCurrentUserWithNotifications();

    if(!currentUser) {
        redirect("/")
    }

    return (
        <div className="bg-[#f5f7fa] dark:bg-[#0F0F0F] h-full min-h-screen w-full flex flex-col">
            <div className="sticky top-0 w-full z-50 shadow-sm dark:shadow-gray-900/20">
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
            <div className="flex-1">       
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default DashboardLayout;