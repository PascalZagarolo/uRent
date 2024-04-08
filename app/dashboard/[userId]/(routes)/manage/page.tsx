import { TrendingUp, UserPlus2 } from "lucide-react";
import SidebarDashboard from "../../_components/sidebar-dashboard";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { MdManageSearch } from "react-icons/md";
import db from "@/db/drizzle";
import getCurrentUser from "@/actions/getCurrentUser";
import { address, booking, bookingRequest, inserat, vehicle } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import SelectInserat from "./_components/select-inserat";
import AddBooking from "./_components/add-bookings";
import RenderedInserat from "./_components/rendered-inserat";
import BookingRequestRender from "../_components/booking-request";
import EventCalendar from "../_components/calendar";
import RenderedVehicle from "./_components/rendered-vehicle";
import MenuBar from "../../_components/menu-bar";
import BreadCrumpPage from "../../_components/bread-crump-page";
import AddAvailability from "./_components/add-availability";

interface ManagePageProps {
    searchParams: {
        inseratId: string,
        vehicleId: string
    }
}

const ManagePage: React.FC<ManagePageProps> = async ({
    searchParams
}) => {

    const currentUser = await getCurrentUser();

    const foundInserate = await db.query.inserat.findMany({
        where: (
            and(
                eq(inserat.userId, currentUser.id),
                eq(inserat.isPublished, "true")

            )
        ), with: {
            images: true,
            vehicles : true,
        }
    })

    let involvedBookings : typeof booking.$inferSelect[] = [];

    if(foundInserate.length > 0) {
        for (let i = 0; i < foundInserate.length; i++) {
        
            const bookings = await db.query.booking.findMany({
                where : (
                    eq(booking.inseratId, foundInserate[i].id)
                ), with : {
                    user : true,
                    inserat : true,
                    vehicle : true
                }
            })
        //@ts-ignore
            involvedBookings.push(...bookings);
        }
    }


    let thisInserat;

    if (searchParams.inseratId) {
        thisInserat = await db.query.inserat.findFirst({
            where: (
                and(
                    eq(inserat.id, searchParams.inseratId),
                )
            ), with: {
                images: true,
                address: true
            }
        })
    }

    let bookingRequests: typeof bookingRequest.$inferSelect[] = [];

    if (searchParams.inseratId) {
        const requests = await db.query.bookingRequest.findMany({
            where: (
                eq(bookingRequest.inseratId, searchParams.inseratId)
            ), with: {
                user: true,
                inserat: {
                    with: {
                        images: true
                    }
                }
            }
        })

        bookingRequests = requests;
    } else {
        if (foundInserate.length > 0) {
            for (let i = 0; i < foundInserate.length; i++) {

                const requests = await db.query.bookingRequest.findMany({
                    where: (
                        eq(bookingRequest.inseratId, foundInserate[i].id)
                    ), with: {
                        user: true,
                        inserat: {
                            with: {
                                images: true
                            }
                        }
                    }
                })

                bookingRequests.push(...requests);
            }
        }
    }

    let thisVehicle : typeof inserat.$inferSelect | null = null;

    if(searchParams.vehicleId) {
        thisVehicle = await db.query.vehicle.findFirst({
            where : (
                and(
                    eq(vehicle.id, searchParams.vehicleId)
                )
            ), with : {
                inserat :  {
                    with : {
                        address : true
                    }
                }
            }
        })
    }

    console.log(thisVehicle?.inserat)

    return (
        <div className="flex justify-center py-8 px-4  ">
            
            <div className="w-[1044px] dark:bg-[#1c1c1c] rounded-md bg-white">
                <div className="min-h-screen w-full">
                    <div>
                        <MenuBar />
                        <div>
                            <BreadCrumpPage />
                        </div>
                    </div>
                    <div className="p-4 mt-4 w-full rounded-lg ">
                        <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center w-full">
                            <div className="w-2/3 flex">
                                <MdManageSearch className="mr-4" /> Fahrzeuge verwalten
                            </div>
                            <div className="w-1/3">
                                <SelectInserat
                                    foundInserate={foundInserate}
                                />
                            </div>
                        </h3>
                        <div className="pt-4">
                            <AddAvailability 
                            foundInserate={foundInserate}
                            />
                        </div>
                        <div className="pb-4 pt-2">
                            <AddBooking 
                            foundInserate={foundInserate}
                            />
                        </div>

                        <div className="p-4  sm:flex">
                            <div className="sm:w-3/5 mr-4">
                                <div className="w-full  dark:bg-[#141414] rounded-md mt-2">
                                {searchParams.vehicleId ? (
                                    <>
                                    <RenderedVehicle
                                    thisVehicle={thisVehicle}
                                    />
                                    </>
                                ) : (
                                    thisInserat ? (
                                        <RenderedInserat
                                            thisInserat={thisInserat}
                                        />
                                    ) : (
                                        <div className="flex justify-center py-40 text-sm border dark:border-none">
                                            <p className="py-1">
                                            Wähle ein Inserat aus...
                                            </p>
                                        </div>
                                    )
                                )}
                                </div>
                            </div>
                            <div className="sm:w-2/5">
                                <div>
                                    <h3 className="flex text-lg font-semibold items-center">
                                        <UserPlus2 className="w-4 h-4 mr-2" /> Offene Anfragen <p className="text-sm ml-4"> {bookingRequests.length} </p>
                                    </h3>
                                    <div className="max-h-[620px] overflow-y-scroll no-scrollbar mt-2">

                                        {bookingRequests.map((request: typeof bookingRequest.$inferSelect) => (
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

                        <div className="w-full">
                            <EventCalendar
                                everyInserat={foundInserate}
                                
                                bookings={involvedBookings}
                            />
                        </div>

                    </div>
                </div>

            </div>
        </div>

    );
}

export default ManagePage;