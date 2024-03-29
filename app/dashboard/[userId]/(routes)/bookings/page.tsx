import { CalendarSearchIcon } from "lucide-react";
import { StarFilledIcon } from "@radix-ui/react-icons";
import FavouriteRenderList from "./_components/favourite-render-list";
import BookingRenderList from "./_components/booking-render-list";
import SidebarDashboard from "../../_components/sidebar-dashboard";
import db from "@/db/drizzle";
import { booking, favourite } from "@/db/schema";
import { eq } from "drizzle-orm";

const Bookings = async ({
    params
}: { params: { userId: string } }) => {

    
    const favourites = await db.query.favourite.findMany({
        where : (
            eq(favourite.userId, params.userId)
        ), with : {
            inserat : {
                with : {
                    images : true,
                    user : true
                }
            }
        }
    })

    const bookings = await db.query.booking.findMany({
        where : (
            eq(booking.userId, params.userId)
        ), with : {
            inserat : {
                with : {
                    images : true,
                    user : true
                }
            }
        }
    })
    
    return (
            <div className="flex justify-center py-8 px-4 ">
                <div className="px-4 hidden md:block">
                <SidebarDashboard />
            </div>
                <div className="w-[1044px] dark:bg-[#1c1c1c] rounded-md bg-white">
                    <div className=" min-h-screen">

                    <div className="md:p-4 mt-4  rounded-lg ">
                        <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center md:px-0 px-4">
                                <StarFilledIcon className="mr-4" /> Meine Favouriten <p className="ml-4 text-lg"> </p>
                            </h3>
                            <div className="md:p-4 p-2">
                                {favourites.length > 0 ? (
                                    <FavouriteRenderList 
                                    //@ts-ignore
                                    favourites={favourites}
                                    />
                                ) : (
                                    <div className="flex justify-center text-gray-100/70">
                                        Noch keine Anzeigen gespeichert...
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="md:p-4 mt-4  rounded-lg ">
                        <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center md:px-0 px-4">
                                <CalendarSearchIcon className="mr-4" /> Meine Buchungen <p className="ml-4 text-lg"> </p>
                            </h3>
                            <div className="md:p-4 p-2 md:pb-0 pb-4">
                                {bookings.length > 0 ? (
                                    <BookingRenderList 
                                    //@ts-ignore
                                    bookings={bookings}
                                    />
                                ) : (
                                    <div className="flex justify-center text-gray-100/70">
                                        Noch keine Fahrzeuge gebucht...
                                    </div>
                                )}
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
       
    );
}

export default Bookings;