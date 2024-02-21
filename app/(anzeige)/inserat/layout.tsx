import HeaderLogo from "@/app/(dashboard)/_components/header-logo";
import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/utils/db";

const InseratLayout = async ({
    children
}: { children: React.ReactNode }) => {

    const currentUser = await getCurrentUser();

    const notifications = await db.notification.findMany({
        where : {
            userId: currentUser?.id
        }
    })

    return (
        <div className=" bg-[#404040]/10 dark:bg-[#0F0F0F] min-h-screen">
            <HeaderLogo 
            currentUser={currentUser} 
            notifications={notifications}
            />

            <div className="h-full">
                {children}
            </div>
        </div>
    );
}

export default InseratLayout;