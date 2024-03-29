
import db from "@/db/drizzle";
import { booking } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { inseratId: string } }
) {
    try {



        const {start, end, ...values} = await req.json();

        const usedStart = new Date(start);
        const usedEnd = new Date(end);
        console.log(params.inseratId)
        console.log(typeof start)
        console.log(values);
        const [createdBooking] = await db.insert(booking).values({
            inseratId: params.inseratId,
            userId: values.userId,
            startDate : usedStart,
            vehicleId : values.vehicleId,
            endDate : usedEnd,
            content : values.content,
        }).returning();

        console.log(createdBooking);

        return NextResponse.json(createdBooking)


    } catch (error) {
        console.log("Fehler beim erstellen einer Buchung", error);
        return new NextResponse("Interner Server Error", { status: 500 })
    }
}