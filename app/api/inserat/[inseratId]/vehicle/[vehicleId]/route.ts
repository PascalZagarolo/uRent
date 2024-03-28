import db from "@/db/drizzle";
import { vehicle } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { inseratId: string, vehicleId: string } }
) {
    try {
        const values = await req.json();

        console.log(params.vehicleId)

        const patchedVehicle = await db.update(vehicle).set({
            ...values
        }).where(eq(vehicle.id, params.vehicleId)).returning();

        return NextResponse.json(patchedVehicle);
    } catch (error) {
        console.log("Fehler in /api/inserat/[inseratId]/vehicle/[vehicleId]/route.ts:", error);
        return new NextResponse("Interner Server Error", { status: 500 })
    }
}