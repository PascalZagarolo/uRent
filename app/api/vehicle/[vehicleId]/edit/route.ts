import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { vehicle } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { vehicleId : string }}
) {
    try {
        
        const findVehicle = await db.query.vehicle.findFirst({
            where : (eq(vehicle.id, params.vehicleId)),
            with : {
                inserat : {
                    with : {
                        user : true
                    }
                }
            }
        })

        if (!findVehicle) {
            console.log("Fahrzeug nicht gefunden")
            return new NextResponse("Fahrzeug nicht gefunden", { status : 404 })
        }

        const currentUser = await getCurrentUser();
        //@ts-ignore
        if(!currentUser || currentUser.id !== findVehicle.inserat.userId) {
            return new NextResponse("Nicht autorisiert", { status : 403 })
        }

        const values = await req.json();

        const patchInserat = await db.update(vehicle).set({
            ...values
        }).where(eq(vehicle.id, params.vehicleId)).returning();

        return NextResponse.json(patchInserat)

    } catch(error : any) {
        console.log("Fehler beim bearbeiten" , error);
        return new NextResponse("Fehler beim bearbeiten", { status : 500 })
    }
}