
import db from "@/db/drizzle";
import { booking, inserat, notification } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { inseratId: string } }
) {
    try {

        console.log(params.inseratId)

        const {start, end, ...values} = await req.json();

        const usedStart = new Date(start);
        const usedEnd = new Date(end);
        
        const [createdBooking] = await db.insert(booking).values({
            inseratId: params.inseratId,
            userId: values.userId,
            startDate : usedStart,
            vehicleId : values.vehicleId,
            buchungsnummer : values.buchungsnummer,
            //Days
            endDate : usedEnd,
            content : values.content,
            //Hours
            startPeriod : values.startPeriod,
            endPeriod : values.endPeriod,
            
            name : values.name,
            isAvailability : values.isAvailability,
        }).returning();

        const thisInserat = await db.query.inserat.findFirst({
            where : (
                eq(inserat.id, params.inseratId)
            )
        })

        const [sendNotification] = await db.insert(notification).values({
            userId : values.userId,
            content : thisInserat?.title,
            inseratId : params.inseratId,
            notificationType : "BOOKING",
        }).returning();

        console.log(createdBooking);

        return NextResponse.json(createdBooking)


    } catch (error) {
        console.log("Fehler beim erstellen einer Buchung", error);
        return new NextResponse("Interner Server Error", { status: 500 })
    }
}