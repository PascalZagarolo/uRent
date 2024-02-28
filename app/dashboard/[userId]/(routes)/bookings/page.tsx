import { CalendarSearchIcon, Car, FilePieChartIcon, ListOrdered, Package, Star } from "lucide-react";
import OrderColoumns from "./_components/order-coloumns";
import { db } from "@/utils/db";

import { Booking, Inserat, User } from "@prisma/client";
import { StarFilledIcon } from "@radix-ui/react-icons";
import FavouriteRenderList from "./_components/favourite-render-list";
import FavouriteDashboardRender from "./_components/favourite-render";
import BookingRenderList from "./_components/booking-render-list";

const Bookings = async ({
    params
}: { params: { userId: string } }) => {

    const favourites = await db.favourite.findMany({
        where: {
            userId: params.userId
        }, include: {
            inserat: {
                include: {
                    user: true,
                    images: true
                }
            },
        }
    })

    const bookings = await db.booking.findMany({
        where :{
            userId : params.userId
        }, include : { 
            inserat : {
                include : {
                    images : true,
                    user : true
                }
            }
        }
    })

    

    



    return (
        <div className=" ">

            <div className="flex justify-center p-8 bg-[#404040]/10">
                <div className="w-[1044px] dark:bg-[#1c1c1c] rounded-md bg-white">
                    <div className="  min-h-screen">


                        <div className="p-4 mt-4  rounded-lg ">
                        <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center">
                                <StarFilledIcon className="mr-4" /> Meine Favouriten <p className="ml-4 text-lg"> </p>
                            </h3>
                            <div className="p-4">
                                <FavouriteRenderList 
                                //@ts-ignore
                                favourites={favourites}
                                />
                            </div>
                        </div>

                        <div className="p-4 mt-4  rounded-lg ">
                        <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center">
                                <CalendarSearchIcon className="mr-4" /> Meine Buchungen <p className="ml-4 text-lg"> </p>
                            </h3>
                            <div className="p-4">
                                <BookingRenderList 
                                //@ts-ignore
                                bookings={bookings}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Bookings;