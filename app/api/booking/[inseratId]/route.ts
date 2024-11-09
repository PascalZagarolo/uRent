
import db from "@/db/drizzle";
import { booking, bookingRequest, inserat, notification } from "@/db/schema";
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

        if(values?.requestId) {
            
            await db.delete(bookingRequest)
            .where(eq(bookingRequest?.id, values.requestId))
        }

        

        console.log(createdBooking);

        return NextResponse.json(createdBooking)


    } catch (error) {
        console.log("Fehler beim erstellen einer Buchung", error);
        return new NextResponse("Interner Server Error", { status: 500 })
    }
}