import { db } from "@/utils/db";
import { NextResponse } from "next/dist/server/web/spec-extension/response";


export async function PATCH(
    req : Request,
    { params } : { params : { bookingId : string } }
) {
    try {

        const values = await req.json();
        
        console.log(values);
        
        const editedBooking = await db.booking.update({
            where : {
                id : params.bookingId
            }, data : {
                ...values
            }
        })

        return NextResponse.json(editedBooking);

    } catch(error) {
        console.log(error);
        return new NextResponse(error , { status : 500 })
        
    }
}