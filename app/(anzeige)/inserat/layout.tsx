import HeaderLogo from "@/app/(dashboard)/_components/header-logo";
import getCurrentUser from "@/actions/getCurrentUser";
import MobileHeader from "@/app/(dashboard)/_components/mobile-header";
import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { notification } from "@/db/schema";
import Footer from "@/app/(dashboard)/_components/footer";


const InseratLayout = async ({
    children
}: { children: React.ReactNode }) => {

    const currentUser = await getCurrentUser();

    const foundNotifications = await db.query.notification.findMany({
        where : (
            eq(notification.userId, currentUser?.id)
        )
    
    })

    return (
        <div className=" bg-[#404040]/10 dark:bg-[#0F0F0F] min-h-screen">
            <HeaderLogo 
            currentUser={currentUser} 
            foundNotifications={foundNotifications}
            />
            <div className="sm:hidden">
                <MobileHeader
                currentUser={currentUser}
                foundNotifications={foundNotifications}
                />  
             </div>

            <div className="h-full">
                {children}
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default InseratLayout;