import { CalendarSearchIcon } from "lucide-react";
import { StarFilledIcon } from "@radix-ui/react-icons";

import SidebarDashboard from "../../_components/sidebar-dashboard";
import db from "@/db/drizzle";
import { booking, favourite } from "@/db/schema";
import { eq } from "drizzle-orm";
import MenuBar from "../../_components/menu-bar";
import BreadCrumpPage from "../../_components/bread-crump-page";
import FavouriteRenderList from "../bookings/_components/favourite-render-list";
import getCurrentUser from "@/actions/getCurrentUser";

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
    
    const currentUser = await getCurrentUser();

    return (
            <div className="flex justify-center sm:py-8  sm:px-4 ">
                
                <div className="sm:w-[1044px] w-full dark:bg-[#1c1c1c] rounded-md bg-white">
                    <div className=" min-h-screen">
                    <div>
                        <MenuBar 
                        isBusiness = {currentUser.isBusiness}
                        />
                        <div>
                            <BreadCrumpPage />
                        </div>
                    </div>
                    <div className="md:p-4 mt-4 p-2 rounded-lg ">
                        <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center md:px-0 sm:px-4">
                                <StarFilledIcon className="mr-4" /> Meine Favouriten <p className="ml-4 text-lg"> </p>
                            </h3>
                            <p className="text-xs dark:text-gray-200/60 ">
                            Deine favorisierten und gespeicherten Fahrzeuge, damit du sie später einfacher wieder finden kannst.
                            
                            </p>
                            <div className="md:p-4 p-2">
                                {favourites.length > 0 ? (
                                    <FavouriteRenderList 
                                    //@ts-ignore
                                    favourites={favourites}
                                    />
                                ) : (
                                    <div className="flex justify-center  text-sm text-gray-200/60">
                                        Noch keine Anzeigen gespeichert...
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