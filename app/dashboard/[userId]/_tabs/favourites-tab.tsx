import { StarFilledIcon } from "@radix-ui/react-icons";
import FavouriteRenderList from "../(routes)/bookings/_components/favourite-render-list";
import { userTable } from "@/db/schema";

interface FavouritesTabProps {
    currentUser : typeof userTable.$inferSelect | any;
}

const FavouritesTab = ({ currentUser } : FavouritesTabProps) => {
    
    return (
            
                    <div className="md:p-4 mt-4 p-2 rounded-lg ">
                        <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center md:px-0 sm:px-4">
                                <StarFilledIcon className="mr-4" /> Meine Favouriten <p className="ml-4 text-lg"> </p>
                            </h3>
                            <p className="text-xs dark:text-gray-200/60 ">
                            Deine favorisierten und gespeicherten Fahrzeuge, damit du sie später einfacher wieder finden kannst.
                            
                            </p>
                            <div className="md:p-4 p-2">
                                {currentUser?.favourites.length > 0 ? (
                                    <FavouriteRenderList 
                                    //@ts-ignore
                                    favourites={currentUser?.favourites}
                                    />
                                ) : (
                                    <div className="flex justify-center  text-sm text-gray-200/60">
                                        Noch keine Anzeigen gespeichert...
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        
                        
    )
}
 
export default FavouritesTab;