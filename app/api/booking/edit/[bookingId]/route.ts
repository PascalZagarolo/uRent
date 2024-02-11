import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { bookingId : string }}
) {
    try {

        const values = await req.json();
        console.log(values);
        const editedBooking = await db.booking.update({
            where : {
                id : params.bookingId
            }, data : {
                userId : values.userId,
                startDate : values.startDate,
                endDate : values.endDate,
                content : values.content
            }
        })

        return NextResponse.json(editedBooking);

    } catch(error) {
        return new NextResponse(error , { status : 500 })
        console.log(error);
    }
}