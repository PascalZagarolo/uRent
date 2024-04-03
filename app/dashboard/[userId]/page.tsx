

import { CalendarCheck2, EyeIcon, TrendingUp, Truck, UserPlus2 } from "lucide-react";
import EventCalendar from "./(routes)/_components/calendar";
import getCurrentUser from "@/actions/getCurrentUser";
import BookingRequestRender from "./(routes)/_components/booking-request";
import { forEach } from "lodash";
import SidebarDashboard from "./_components/sidebar-dashboard";
import db from "@/db/drizzle";
import { and, eq } from "drizzle-orm";
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

    const foundInserate = await db.query.inserat.findMany({
        where : (
            and(
                eq(inserat.userId, currentUser?.id),
                eq(inserat.isPublished, "true")
            )
            
        )  
    })

    let involvedBookings : typeof booking[] = [];

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
        //@ts-ignore
            involvedBookings.push(...bookings);
        }
    }

    

    let bookingRequests: typeof bookingRequest.$inferSelect[] = [];

    if(searchParams.inseratId) {
        const requests = await db.query.bookingRequest.findMany({
            where : (
                eq(bookingRequest.inseratId, searchParams.inseratId)
            ), with : {
                user : true,
                inserat : {
                    with : {
                        images : true
                    }
                }
            }
        })

        bookingRequests = requests
    } else {
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
    }

    let views = 0;

    const viewAmount = forEach(everyInserat, (inserat) => {
        views = + inserat.views;

    })





    return (


        <div className="flex justify-center py-8 px-4">
            <div className="w-[1044px] dark:bg-[#1c1c1c] rounded-md bg-white">
                <div className="min-h-screen">
                <div>
                        <MenuBar />
                        <div>
                            <BreadCrumpPage />
                        </div>
                    </div>
                    <div className="p-4 mt-4  rounded-lg ">
                        <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center">
                            <TrendingUp className="mr-4" /> Übersicht  <p className="ml-4 text-lg"> </p>
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
                                        //@ts-ignore
                                        bookings={involvedBookings}
                                    />
                                   
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