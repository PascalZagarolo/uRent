import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function DELETE(
    req : Request,
    { params } : { params : { requestId : string}}
) {
    try {

        const rejectedBooking = await db.bookingRequest.delete({
            where :{
                id : params.requestId
            }
        });

        return NextResponse.json(rejectedBooking);

    } catch (error) {
        console.log(error);
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}