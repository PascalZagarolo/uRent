

import { CalendarCheck2, EyeIcon, TrendingUp, Truck, UserPlus2 } from "lucide-react";
import EventCalendar from "./(routes)/_components/calendar";
import getCurrentUser from "@/actions/getCurrentUser";
import BookingRequestRender from "./(routes)/_components/booking-request";
import { forEach } from "lodash";
import SidebarDashboard from "./_components/sidebar-dashboard";
import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { booking, bookingRequest, inserat } from "@/db/schema";

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

    const foundInserate = await db.query.inserat.findMany({
        where : (
            eq(inserat.userId, currentUser?.id)
            
        )  
    })

    let involvedBookings;

    if(foundInserate.length > 0) {
        for (let i = 0; i < foundInserate.length; i++) {
        
            const bookings = await db.query.booking.findMany({
                where : (
                    eq(booking.inseratId, foundInserate[i].id)
                ), with : {
                    user : true,
                    inserat : true,
                }
            })
    
            involvedBookings?.push(...bookings);
        }
    }

    let bookingRequests: typeof bookingRequest.$inferSelect[] = [];

    if(everyInserat.length > 0) {
        for (let i = 0; i < everyInserat.length; i++) {
        
            const requests = await db.query.bookingRequest.findMany({
                where : (
                    eq(bookingRequest.inseratId, everyInserat[i].id)
                ), with : {
                    user : true,
                    inserat : {
                        with : {
                            images : true
                        }
                    }
                }
            })
    
            bookingRequests.push(...requests);
        }
    }

    let views = 0;

    const viewAmount = forEach(everyInserat, (inserat) => {
        views = + inserat.views;

    })





    return (


        <div className="flex justify-center py-8 px-4  ">
            <div className="px-4 hidden md:block">
                <SidebarDashboard />
            </div>
            <div className="w-[1044px] dark:bg-[#1c1c1c] rounded-md bg-white">
                <div className="min-h-screen">
                    <div className="p-4 mt-4  rounded-lg ">
                        <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center">
                            <TrendingUp className="mr-4" /> Übersicht <p className="ml-4 text-lg"> </p>
                        </h3>

                        <div className="w-full dark:bg-[#141414] p-4  flex justify-evenly mt-2 rounded-md">
                            <div className="text-xl font-semibold flex p-4 border dark:border-none dark:bg-[#1C1C1C] rounded-md">
                                <Truck className="h-6 w-6 mr-2" />
                                {everyInserat.length} <p className="font-medium ml-2"> {everyInserat.length === 1 ? "Inserat" : "Inserate"} </p>
                            </div>
                            <div className="text-xl font-semibold flex mr-2 p-4 border dark:border-none dark:bg-[#1C1C1C] rounded-md">
                                <EyeIcon className="h-6 w-6 mr-2" />   {views} <p className="font-medium ml-2"> Ansichten </p>
                            </div>

                        </div>
                        <div className="p-4  sm:flex">

                            <div className="sm:w-3/5 mr-4">
                                <h3 className="flex text-lg font-semibold items-center">
                                    <CalendarCheck2 className="w-4 h-4 mr-2" /> Mein Kalender
                                </h3>
                                <div className="w-full  dark:bg-[#141414] rounded-md mt-2">
                                    
                                    <EventCalendar
                                        everyInserat={everyInserat}
                                        bookings={involvedBookings}
                                    />
                                   
                                </div>
                            </div>
                            <div className="sm:w-2/5">
                                <div>
                                    <h3 className="flex text-lg font-semibold items-center">
                                        <UserPlus2 className="w-4 h-4 mr-2" /> Offene Anfragen <p className="text-sm ml-4"> {bookingRequests.length} </p>
                                    </h3>
                                    <div className="max-h-[620px] overflow-y-scroll no-scrollbar mt-2">
                                     
                                    {bookingRequests.map((request : typeof bookingRequest.$inferSelect) => (
                                        <BookingRequestRender
                                            request={request}
                                            key={request?.id || 1}
                                        />
                                    ))}
                                    {bookingRequests.length === 0 && (
                                        <div className="mt-8 flex justify-center text-sm  text-gray-100/60">
                                            Du hast keine offenen Anfragen...
                                        </div>
                                    )}
                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>


    );
}

export default DashboardPage;