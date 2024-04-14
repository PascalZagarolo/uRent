
import db from "@/db/drizzle";
import { booking } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/dist/server/web/spec-extension/response";


export async function PATCH(
    req : Request,
    { params } : { params : { bookingId : string } }
) {
    try {

        const {startDate, endDate, ...values} = await req.json();

        const usedStart = new Date(startDate);
        const usedEnd = new Date(endDate);
        
        console.log(values);
        
        const [editedBooking] = await db.update(booking).set({
            ...(startDate) && {
                startDate: usedStart
            
            },...(endDate) && {
                endDate: usedEnd
            },
            content : values.content,
            userId : values.userId
           
        }).where(eq(booking.id, params.bookingId)).returning();

        return NextResponse.json(editedBooking);

    } catch(error : any) {
        console.log(error);
        return new NextResponse(error , { status : 500 })
        
    }
}