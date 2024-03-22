
import db from "@/db/drizzle";
import { booking } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(
    req : Request,
    { params } : { params : { bookingId : string }}
) {
    try {
        
       const deletedBooking = await db.delete(booking).where(eq(booking.id, params.bookingId)).returning();

        return NextResponse.json(deletedBooking)

    } catch(error) {
        return new NextResponse("Interner Server Error", { status : 500})
        console.log(error);
    }
}