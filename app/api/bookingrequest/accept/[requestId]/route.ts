
import db from "@/db/drizzle";
import { booking, bookingRequest, inserat } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { requestId : string}}
) {
    try {
        const findRequest = await db.query.bookingRequest.findFirst({
            where : (
                eq(bookingRequest.id, params.requestId)
            )
        })


        const [adaptedBooking] = await db.insert(booking).values({
            userId : findRequest.userId,
            inseratId : findRequest.inseratId,
            startDate : findRequest.startDate,
            endDate : findRequest.endDate,
            content : findRequest.content
        }).returning()

        const deletedRequest = await db.delete(bookingRequest).where(eq(bookingRequest.id, params.requestId))

        return NextResponse.json(adaptedBooking);

    } catch (error) {
        console.log(error);
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}