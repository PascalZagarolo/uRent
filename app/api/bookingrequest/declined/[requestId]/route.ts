
import db from "@/db/drizzle";
import { bookingRequest } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(
    req : Request,
    { params } : { params : { requestId : string}}
) {
    try {

        const rejectedBooking = await db.delete(bookingRequest).where(eq(bookingRequest.id, params.requestId))

        return NextResponse.json(rejectedBooking);

    } catch (error) {
        console.log(error);
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}