'use client'

import { Label } from "@/components/ui/label";
import { booking } from "@/db/schema";
import { format } from "date-fns";
import { de } from "date-fns/locale";

import React from "react";

interface BookingDayDetailsProps {
    selectedDate : Date;
    relevantBookings : typeof booking.$inferSelect[];
}

const BookingDayDetails : React.FC<BookingDayDetailsProps> = ({
    selectedDate,
    relevantBookings   
}) => {
    return ( 
        <div className="w-full">
            <div>
                <Label className="text-md font-semibold">
                    Tagesansicht {selectedDate && (
                        <>
                        - {format(selectedDate, "dd MMMM yyyy", {locale: de})}
                        </>
                    )}

                </Label>
                <p className="text-xs dark:text-gray-200/60">
                    Detaillierte Tagesansicht für den {selectedDate && (
                        <>
                        {format(selectedDate, "dd MMMM yyyy", {locale: de})}
                        </>
                    )}
                </p>
            </div>
            <div className="mt-4 w-full">
                {!selectedDate && (
                    <div className="text-sm font-normal dark:text-gray-200/60 w-full flex justify-center">
                        Klicke auf ein Datum um die Details einzusehen
                    </div>
                )}
            </div>
        </div>
     );
}
 
export default BookingDayDetails;