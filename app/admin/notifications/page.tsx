import db from "@/db/drizzle";
import BreadCrumpPage from "../_components/bread-crump-page";
import MenuBar from "../_components/menu-bar";
import TabSwitchNotifications from "./_compontents/create-and-created-tab";
import CreateNotificationUnauthorized from "./_compontents/create-notification-unauthorized";
import { notificationUnauthorized } from "@/db/schema";

const NotificationsAdminPage = async () => {

    const foundNotifications : any = await db.query.notificationUnauthorized.findMany();

    return ( 
        <div className="flex justify-center sm:py-8  sm:px-4">
            <div className="sm:w-[1044px] w-full dark:bg-[#1c1c1c] rounded-md bg-white">
                <div className="min-h-screen">
                    <div>
                    <MenuBar />
                        <div>
                        <BreadCrumpPage />
                        </div>
                    </div>
                    <div className="p-8">
                        <TabSwitchNotifications 
                        foundNotifications = {foundNotifications}
                        />
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NotificationsAdminPage;