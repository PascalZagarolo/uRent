
import db from "@/db/drizzle";
import { booking } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/dist/server/web/spec-extension/response";


export async function PATCH(
    req : Request,
    { params } : { params : { bookingId : string } }
) {
    try {

        const {start, end, ...values} = await req.json();

        const usedStart = new Date(start);
        const usedEnd = new Date(end);
        
        console.log(values);
        
        const [editedBooking] = await db.update(booking).set({
            ...(start) && {
                startDate: usedStart
            
            },...(end) && {
                endDate: usedEnd
            },
            ...values,
           
        }).where(eq(booking.id, params.bookingId)).returning();

        return NextResponse.json(editedBooking);

    } catch(error : any) {
        console.log(error);
        return new NextResponse(error , { status : 500 })
        
    }
}