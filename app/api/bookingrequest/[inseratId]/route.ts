import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { bookingRequest, inserat, notification, userTable } from "@/db/schema";
import { eq } from "drizzle-orm";

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

        const findUser = await db.query.userTable.findFirst({
            where : (
                eq(userTable.id, currentUser?.id)
            )
        })

        const findInserat = await db.query.inserat.findFirst({
            where : (
                eq(inserat.id, params.inseratId)
            )
        })

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

        const [createNotification] = await db.insert(notification).values({
            userId : findInserat.userId,
            inseratId : params.inseratId,
            content : findInserat?.title,
            notificationType : "BOOKING_REQUEST",
        }).returning();

        return NextResponse.json({request, createNotification});

    } catch(error) {
        console.log(error);
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}