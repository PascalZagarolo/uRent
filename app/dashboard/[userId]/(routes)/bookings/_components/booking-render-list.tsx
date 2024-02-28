'use client';

import { Booking, Favourite, Images, Inserat, User } from "@prisma/client";
import InserateDashboardRender from "./favourite-render";
import { useState } from "react";
import FavouriteRender from "./favourite-render";
import BookingDashboardRender from "./booking-render";

interface BookingRenderListProps {
    bookings : Booking & { inserat : Inserat & { images : Images[], user: User}}[]
}

const BookingRenderList: React.FC<BookingRenderListProps> = ({
    bookings
}) => {

    //use RenderAmount to render only 5 Inserate, if pressed "Mehr Anzeigen" => increase amount by 5 and so on...
    const [renderAmount, setRenderAmount] = useState(5); 

    return ( 
        <div>
            {bookings.slice(0,renderAmount).map((booking : Booking & { inserat : Inserat & { images : Images[], user: User}}) => (
                bookings.length > 0 && (
                    <BookingDashboardRender
                    booking = {booking}
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