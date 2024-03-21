
import db from "@/db/drizzle";
import { booking } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { inseratId: string } }
) {
    try {



        const values = await req.json();


        console.log(values);
        const [createdBooking] = await db.insert(booking).values({
            inseratId: params.inseratId,
            userId: values.userId,
            startDate: values.startDate,
            endDate: values.endDate,
        }).returning();


        return NextResponse.json(createdBooking)


    } catch (error) {
        console.log("Fehler beim erstellen einer Buchung", error);
        return new NextResponse("Interner Server Error", { status: 500 })
    }
}