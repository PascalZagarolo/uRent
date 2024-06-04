'use client'

import { booking, inserat } from "@/db/schema";
import BookingDayDetails from "./booking-day-details";
import EventCalendar from "./calendar";
import { use, useEffect, useState } from "react";
import { IoCalendar } from "react-icons/io5";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";


interface CalendarAndDetailsProps {
    foundInserate: typeof inserat.$inferSelect[];
    involvedBookings: typeof booking.$inferSelect[];
}

const CalendarAndDetails: React.FC<CalendarAndDetailsProps> = ({
    foundInserate,
    involvedBookings
}) => {

    const [selectedDate, setSelectedDate] = useState<Date>(null);
    const [relevantBookings, setRelevantBookings] = useState([]);
    const [selectedInserat, setSelectedInserat] = useState(null);
    const [selectedInseratData, setSelectedInseratData] = useState<null | typeof inserat.$inferSelect>(null);
    const [renderedInserate, setRenderedInserate] = useState(foundInserate);

    

    return (
        <div>
            <div>
                <h3 className="text-md font-semibold flex items-center">
                    <div className="text-xl flex items-center">
                    <IoCalendar className="w-4 h-4 mr-2" /> Termine und Details
                    </div>
                    <div className="ml-auto w-1/3 mt-2">
                        <Label>
                        
                        </Label>
                        <Select value={selectedInserat} onValueChange={(e) => {
                            setSelectedInserat(e);
                            setSelectedInseratData(foundInserate.find(inserat => inserat.id === e) || null);
                            if (e === null) {
                                setRenderedInserate(foundInserate);
                            } else {
                                setRenderedInserate(foundInserate.filter(inserat => inserat.id === e));
                            }

                        }}>
                            <SelectTrigger className="dark:bg-[#191919] w-full dark:border-none">
                                <SelectValue placeholder="Inserat auswählen" />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-[#191919] dark:border-none ">
                                <SelectItem value={null}>
                                    Alle Inserate
                                </SelectItem>
                                {foundInserate.map((pInserat) => (
                                    <SelectItem value={pInserat.id} key={pInserat.id}>
                                        {pInserat.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </h3>
                <p className="text-xs text-gray-200/60">
                    Lasse dir alle Buchungen und Termine in deinem persönlichen Kalender anzeigen. <br/>
                    Filtere nach Fahrzeugen oder gebe dir generellen Überblick über alle Inserate.
                </p>


            </div>
            <div className="w-full">
                <EventCalendar
                    everyInserat={foundInserate}
                    setSelectedDateParent={setSelectedDate}
                    setRelevantBookingsParent={setRelevantBookings}
                    bookings={involvedBookings}
                    selectedInserat={selectedInserat}
                />
            </div>
            <div className="mt-4 w-full">
            <BookingDayDetails
                    foundInserate={foundInserate}
                    selectedDate={selectedDate}
                    relevantBookings={relevantBookings}
                    selectedInserat={selectedInserat}
                    selectedInseratData={selectedInseratData}
                    renderedInserate={renderedInserate}
                />
            </div>
        </div>
    );
}

export default CalendarAndDetails;