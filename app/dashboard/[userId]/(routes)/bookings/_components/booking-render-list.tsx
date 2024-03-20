'use client';



import { useState } from "react";

import BookingDashboardRender from "./booking-render";
import { booking } from "@/db/schema";

interface BookingRenderListProps {
    bookings : typeof booking.$inferSelect[]
}

const BookingRenderList: React.FC<BookingRenderListProps> = ({
    bookings
}) => {

    //use RenderAmount to render only 5 Inserate, if pressed "Mehr Anzeigen" => increase amount by 5 and so on...
    const [renderAmount, setRenderAmount] = useState(5); 

    return ( 
        <div>
            {bookings.slice(0,renderAmount).map((booking) => (
                bookings.length > 0 && (
                    <BookingDashboardRender
                    thisBooking = {booking}
                    key={booking.id}
                    />
            )
        ))}
        {bookings.length > 5 && (
            <p className="mt-2 text-xs  underline hover:cursor-pointer" onClick={() => {setRenderAmount(renderAmount + 5)}}>
                Mehr anzeigen...
            </p>
        )}
        </div>
     );
}
 
export default BookingRenderList;