import { Car, ListOrdered, Package, Star } from "lucide-react";
import OrderColoumns from "./_components/order-coloumns";
import { db } from "@/utils/db";
import Favourites from "./_components/favourites";
import { Booking, Inserat, User } from "@prisma/client";

const Bookings = async ({
    params
}: { params: { userId: string } }) => {

    const favourites = await db.favourite.findMany({
        where : {
            userId : params.userId
        }, include : {
            
            inserat : {
                include : {
                    user : true,
                    images : true
                }
            },
        }
    })

    const bookings = await db.booking.findMany({
        where : {
            userId : params.userId
        }, include : {
            inserat : {
                include : {
                    images : true
                }
            },
            user : true
        }
    })

    const today = new Date();

    
    

    return (
        <div>
            <h3 className="rounded-md p-4 flex justify-center border-2 border-black bg-[#212634] text-gray-100 text-lg font-semibold">
                <Package className="h-6 w-6 mr-2 text-gray-200" /> Meine Favouriten und Bestellungen  <Package className="h-6 w-6 ml-2 text-gray-200" />
            </h3>
            <div className="2xl:flex justify-between mt-8 ">
                <div className="2xl:w-1/2">
                    <h3 className="flex justify-start text-lg font-bold  text-gray-100 md:mr-16 bg-[#191d27] border-2 border-black rounded-md p-2
                    drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                        <Star className="mr-4" /> Favourisierte Anzeigen
                    </h3>
                      <div className="gap-y-2">
                      {favourites.map((favourite) => (
                        <Favourites
                        key={favourite.id}
                        favourite={favourite}
                        />
                      ))}
                      </div>
                      <div>
                            {favourites.length === 0 && (
                                <p className="flex justify-center mt-8 text-gray-400 text-xl font-semibold">
                                    Du hast noch keine Favouriten
                                </p>
                            )}
                      </div>
                </div>
                <div className="2xl:w-1/2 2xl:mt-0 mt-8">
                    <h3 className="flex justify-start text-lg font-bold text-gray-100 md:mr-16 bg-[#191d27] border-2 border-black rounded-md p-2">
                        <ListOrdered className="mr-4" /> Buchungshistorie
                    </h3>
                    <div className="">
                        {bookings.map((booking) => (
                            <OrderColoumns
                                key={booking.id}
                                booking={booking}
                            />
                        ))}
                    </div>
                    <div>
                            {bookings.length === 0 && (
                                <p className="flex justify-center mt-8 text-gray-400 text-xl font-semibold">
                                    Du hast noch keine Buchungen getätigt
                                </p>
                            )}
                      </div>
                </div>
            </div>
        </div>
    );
}

export default Bookings;