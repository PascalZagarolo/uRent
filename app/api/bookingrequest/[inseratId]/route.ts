import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { bookingRequest } from "@/db/schema";

import { NextResponse } from "next/server";

export async function POST(
    req : Request,
    { params } : { params : { inseratId : string}}
) {
    try {
        
        const currentUser = await getCurrentUser();

        const {startDate, endDate, ...values} = await req.json();

        const usedStart = new Date(startDate);
        const usedEnd = new Date(endDate);

        const request = await db.insert(bookingRequest).values({
            ...(startDate) && {
                startDate : usedStart
            }, ...(endDate) && {
                endDate : usedEnd
            },
            userId : currentUser.id,
            inseratId : params.inseratId,
            ...values,
        })

        return NextResponse.json(request);

    } catch(error) {
        console.log(error);
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}