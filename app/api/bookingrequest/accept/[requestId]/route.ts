import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { requestId : string}}
) {
    try {
        const findRequest = await db.bookingRequest.findUnique({
            where : {
                id : params.requestId
            }
        })

        const adaptedBooking = await db.booking.create({
            data : {
                userId : findRequest?.userId,
                startDate : findRequest?.startDate,
                endDate : findRequest?.endDate,
                content : findRequest?.content,
                inseratId : findRequest?.inseratId
            }
        })

        const deletedRequest = await db.bookingRequest.delete({
            where : {
                id : params.requestId
            }
        })

        return NextResponse.json(adaptedBooking);

    } catch (error) {
        console.log(error);
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}