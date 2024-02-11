import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function DELETE(
    req : Request,
    { params } : { params : { bookingId : string }}
) {
    try {
        
        const deletedBooking = await db.booking.delete({
            where : {
                id : params.bookingId
            }
        })

        return NextResponse.json(deletedBooking)

    } catch(error) {
        return new NextResponse("Interner Server Error", { status : 500})
        console.log(error);
    }
}