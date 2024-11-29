import { UserPlus2 } from "lucide-react";

import { MdManageSearch } from "react-icons/md";
import db from "@/db/drizzle";
import getCurrentUser from "@/actions/getCurrentUser";
import { address, booking, bookingRequest, inserat, userTable, vehicle } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
import CalendarAndDetails from "../(routes)/_components/calendar-and-details";
import AddBooking from "../(routes)/manage/_components/add-bookings";
import AddAvailability from "../(routes)/manage/_components/add-availability";
import BookingRequestRender from "../(routes)/_components/booking-request";
import RenderedInserat from "../(routes)/manage/_components/rendered-inserat";
import RenderedVehicle from "../(routes)/manage/_components/rendered-vehicle";
import SelectVehicle from "../(routes)/manage/_components/select-vehicle";
import SelectInserat from "../(routes)/manage/_components/select-inserat";
import { useRef, useState } from "react";

import TodayAgenda from "../(routes)/manage/_components/agenda-today";
import { isToday } from "date-fns";


interface ManageTabProps {
    searchParams: {
        inseratId: string,
        vehicleId: string
    },
    currentUser: typeof userTable.$inferSelect | any;
}

const ManageTab: React.FC<ManageTabProps> = ({
    searchParams,
    currentUser
}) => {


    const [thisInserat, setThisInserat] = useState<any | null>(null);


    const foundInserate = currentUser?.inserat?.sort((a, b) =>
        a?.title?.localeCompare(b.title)
    );

    let involvedBookings: any = [];

    if (foundInserate.length > 0) {
        for (let i = 0; i < foundInserate.length; i++) {

            const bookings = foundInserate[i].bookings;

            involvedBookings.push(...bookings);
        }
    }







    let bookingRequests: typeof bookingRequest.$inferSelect[] = [];

    if (searchParams?.inseratId) {


        bookingRequests = foundInserate.filter((inserat) => inserat.id === searchParams.inseratId)[0].bookingRequests;
    } else {
        if (foundInserate.length > 0) {
            for (let i = 0; i < foundInserate.length; i++) {



                const requests = foundInserate[i].bookingRequests;


                bookingRequests.push(...requests);
            }
        }
    }

    let thisVehicle: any;

    if (searchParams?.vehicleId) {


        thisVehicle = foundInserate.filter((inserat) => inserat.id === searchParams.inseratId)[0].vehicles.find((vehicle) => vehicle.id === searchParams.vehicleId);
    }

    const selectedInserat = foundInserate?.find((inserat) => inserat.id === searchParams?.inseratId);




    return (
        <div className="flex justify-center sm:py-8 sm:px-4  ">


            <div className="sm:p-4 p-2 mt-4 w-full rounded-lg ">
                <div>
                    <TodayAgenda
                        todaysBookings={
                            involvedBookings
                                ?.filter((booking) => isToday(booking.startDate))
                                ?.sort((a, b) => a.startPeriod - b.startPeriod)

                        }
                        todaysReturns={involvedBookings
                            ?.filter((booking) => isToday(booking.endDate))
                            ?.sort((a, b) => a.endPeriod - b.endPeriod)}
                    />
                </div>
                <div className=" sm:px-4">
                    <AddAvailability
                        foundInserate={foundInserate}
                    />
                </div>
                <div className="pb-4 pt-2 sm:px-4">
                    <AddBooking
                        foundInserate={foundInserate as any}
                    />
                </div>
                <div className="w-full sm:mb-16 mb-8">
                    <CalendarAndDetails
                        foundInserate={foundInserate as any}
                        involvedBookings={involvedBookings}
                    />
                </div>

                <h3 className="dark:text-gray-100 sm:text-2xl text-lg font-semibold sm:flex items-center w-full">
                    <div className="sm:w-2/3 flex w-full">
                        <MdManageSearch className="mr-4" /> Fahrzeuge verwalten
                    </div>
                    <div className="sm:w-1/3 w-full sm:mt-0 mt-2">
                        <SelectInserat
                            foundInserate={foundInserate}
                            selectChange={(inseratId) => { setThisInserat(foundInserate.find((inserat) => inserat.id === inseratId)) }}
                        />
                    </div>


                </h3>
                <p className="text-xs dark:text-gray-200/60 mt-2 sm:mt-0">
                    Verwalte deine Buchungen, trage Fahrzeuge, Mieter und Verfügbarkeiten ein, behalte
                    <br className="sm:block hidden" /> vollen Überblick über deine Inserate und Fahrzeuge.
                </p>

                {selectedInserat?.multi && (
                    <div className="sm:px-4 mt-8 sm:w-3/5">
                        <SelectVehicle
                            selectedInserat={selectedInserat}
                        />
                    </div>
                )}
                <div className="sm:px-4  sm:flex">
                    <div className="sm:w-3/5 sm:mr-4">
                        <div className="w-full  dark:bg-[#141414] rounded-md mt-2">
                            {searchParams?.vehicleId ? (
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
                    <div className="sm:w-2/5 mt-4 sm:mt-0">
                        <div>
                            <h3 className="flex text-lg font-semibold items-center">
                                <UserPlus2 className="w-4 h-4 mr-2" /> Offene Anfragen <p className="text-sm ml-4"> {bookingRequests.length} </p>
                            </h3>
                            <div className="max-h-[620px] overflow-y-scroll no-scrollbar mt-2">
                                {bookingRequests?.map((request: typeof bookingRequest.$inferSelect) => (
                                    <BookingRequestRender
                                        currentUserId={currentUser?.id}
                                        request={request}
                                        thisInserat={foundInserate.find((inserat) => inserat.id === request.inseratId)}
                                        key={request?.id || 1}
                                    />
                                ))}
                                {bookingRequests?.length === 0 && (
                                    <div className="sm:mt-8 mt-4 mb-8 flex justify-center text-sm  text-gray-100/60">
                                        Du hast keine offenen Anfragen...
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default ManageTab;