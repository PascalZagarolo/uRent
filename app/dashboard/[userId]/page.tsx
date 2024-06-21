

import { CalendarCheck2, EyeIcon, TrendingUp, Truck, UserPlus2 } from "lucide-react";
import EventCalendar from "./(routes)/_components/calendar";
import getCurrentUser from "@/actions/getCurrentUser";
import BookingRequestRender from "./(routes)/_components/booking-request";
import { forEach } from "lodash";
import SidebarDashboard from "./_components/sidebar-dashboard";
import db from "@/db/drizzle";
import { and, eq, sql } from "drizzle-orm";
import { booking, bookingRequest, inserat } from "@/db/schema";
import MenuBar from "./_components/menu-bar";
import BreadCrumpPage from "./_components/bread-crump-page";

interface MainPageProps {
    searchParams: {
        inseratId: string
    }
}

const DashboardPage = async ({
    searchParams
}: MainPageProps) => {

    const currentUser = await getCurrentUser();

    const everyInserat = await db.query.inserat.findMany({
        where : eq(inserat.userId , currentUser?.id)
    })

    const findInserate = db.query.inserat.findMany({
        where : (
            and(
                eq(inserat.userId, sql.placeholder("currentUserId")),
                eq(inserat.isPublished, "true")
            )
            
        )  
    }).prepare("findInserate")

    const foundInserate = await findInserate.execute({currentUserId: currentUser?.id})

   

    

   

    

    let views = 0;

    const viewAmount = forEach(everyInserat, (inserat) => {
        views = + inserat.views;

    })





    return (


        <div className="flex justify-center sm:py-8 sm:px-4">
            <div className="sm:w-[1044px] w-full dark:bg-[#1c1c1c] rounded-md bg-white">
                <div className="min-h-screen">
                <div>
                <MenuBar 
                isBusiness = {currentUser.isBusiness}
                />
                        <div>
                            <BreadCrumpPage />
                        </div>
                    </div>
                    <div className="sm:p-4 p-2 mt-4  rounded-lg ">
                        <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center">
                            <TrendingUp className="mr-4" /> Übersicht  <p className="ml-4 text-lg"> </p>
                        </h3>

                        <div className="w-full dark:bg-[#141414] p-4 sm:space-y-0 space-y-4  sm:flex justify-evenly mt-2 rounded-md">
                            <div className="text-xl font-semibold flex p-4 border dark:border-none dark:bg-[#1C1C1C] rounded-md">
                                <Truck className="h-6 w-6 mr-2" />
                                {everyInserat.length} <p className="font-medium ml-2"> {everyInserat.length === 1 ? "Inserat" : "Inserate"} </p>
                            </div>
                            <div className="text-xl font-semibold flex sm:mr-2 p-4 border dark:border-none dark:bg-[#1C1C1C] rounded-md">
                                <EyeIcon className="h-6 w-6 mr-2" />   {views} <p className="font-medium ml-2"> Ansichten </p>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;