

import { CalendarCheck2, TrendingUp, User2Icon, UserPlus2 } from "lucide-react";
import Logo from "../../profile/[profileId]/_components/u-rent-logo";
import DashboardLayout from '../../(dashboard)/layout';
import { Booking, BookingRequest, Images, Inserat, User } from "@prisma/client";
import { db } from "@/utils/db";
import Drafts from "./_components/drafts-user";
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";
import { Calendar } from "@/components/ui/calendar";
import OwnCalendar from "./(routes)/_components/calendar";
import EventCalendar from "./(routes)/_components/calendar";
import { addDays, subDays } from "date-fns";
import getCurrentUser from "@/actions/getCurrentUser";

import BookingRequestRender from "./(routes)/_components/booking-request";

interface MainPageProps {
    searchParams : {
        inseratId : string
    }
}

const DashboardPage = async ({
    searchParams
}:  MainPageProps ) => {

    const currentUser = await getCurrentUser();
    
    const everyInserat = await db.inserat.findMany({
        where : {
            userId : currentUser?.id
        }
    })

    const inserate = await db.inserat.findMany({
        where : {
            userId : currentUser?.id,
            id : searchParams?.inseratId
        }, select : {
            id : true,
            
        }
    })

    let involvedBookings: Booking[] = [];

    for (let i = 0; i < inserate.length; i++) {
        const bookings = await db.booking.findMany({
            where : {
                inseratId : inserate[i].id
            }
        })

        involvedBookings.push(...bookings);
    }

    let bookingRequests: BookingRequest & {inserat : Inserat & {images : Images[]}, user : User}[] = [] as any;

    for (let i = 0; i < everyInserat.length; i++) {
        const requests = await db.bookingRequest.findMany({
            where : {
                inseratId : everyInserat[i].id
            }, include : {
                inserat : {
                    include : {
                        images : true,
                       
                     },
                     
                },
                user : true
            }
        })

        bookingRequests.push(...requests);
    }

    



    return (
        <div className=" ">

            <div className="flex justify-center p-8 bg-[#404040]/10">
                <div className="w-[1044px] dark:bg-[#1c1c1c] rounded-md bg-white">
                    <div className="  min-h-screen">


                        <div className="p-4 mt-4  rounded-lg ">
                            <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center">
                                <TrendingUp className="mr-4" /> Dashboard <p className="ml-4 text-lg"> </p>
                            </h3>
                            <div className="p-4 mt-16 flex">
                                <div className="sm:w-3/5 mr-4">
                                <h3 className="flex text-lg font-semibold items-center">
                                    <CalendarCheck2 className="w-4 h-4 mr-2" /> Mein Kalender
                                </h3>
                                <div className="w-full  dark:bg-[#141414] rounded-md mt-2">
                                    <EventCalendar
                                    
                                        inserate={everyInserat}
                                        bookings = {involvedBookings}
                                    />
                                </div>
                                </div>
                                <div className="sm:w-2/5">
                                <div>
                                <h3 className="flex text-lg font-semibold items-center">
                                    <UserPlus2 className="w-4 h-4 mr-2" /> Offene Anfragen <p className="text-sm ml-4"> {bookingRequests.length} </p>
                                </h3>
                                    {bookingRequests.map((request : BookingRequest & {inserat : Inserat & {images : Images[]}, user : User}) => (
                                        <BookingRequestRender
                                        //@ts-ignore
                                        request={request}
                                        />
                                    
                                    ))}
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