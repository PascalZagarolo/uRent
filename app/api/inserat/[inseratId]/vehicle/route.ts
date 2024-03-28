import db from "@/db/drizzle";
import { vehicle } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(
    req : Request,
    { params } : { params : { inseratId : string }}
) {
    try {

        const values = await req.json();

        const [createdVehicle] = await db.insert(vehicle).values({
            ...values,
            inseratId : params.inseratId
        }).returning();

        return NextResponse.json(createdVehicle);

    } catch (error) {
        console.log("Fehler in /api/inserat/[inseratId]/vehicle/route.ts:", error);
        return new NextResponse("Interner Server Error", { status : 500 })
    }
}