'use client'

import { booking, inserat } from "@/db/schema";
import BookingDayDetails from "./booking-day-details";
import EventCalendar from "./calendar";
import { useState } from "react";


interface CalendarAndDetailsProps {
    foundInserate : typeof inserat.$inferSelect[];
    involvedBookings : typeof booking.$inferSelect[];
}

const CalendarAndDetails : React.FC<CalendarAndDetailsProps> = ({
    foundInserate,
    involvedBookings
}) => {

    const [selectedDate, setSelectedDate] = useState<Date>(null);
    const [relevantBookings, setRelevantBookings] = useState([]);


    return ( 
        <div>
            <div className="w-full">
                            <EventCalendar
                                everyInserat={foundInserate}
                                setSelectedDateParent = {setSelectedDate}
                                bookings={involvedBookings}
                            />
                        </div>
                        <div className="mt-4 w-full">
                                <BookingDayDetails
                                selectedDate={selectedDate}
                                relevantBookings={relevantBookings}
                                />
                        </div>
        </div>
     );
}
 
export default CalendarAndDetails;