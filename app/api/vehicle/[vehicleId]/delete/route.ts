import db from "@/db/drizzle";
import { NextResponse } from "next/server";
import { vehicle } from '../../../../../db/schema';
import { eq } from 'drizzle-orm';
import getCurrentUser from "@/actions/getCurrentUser";

export async function DELETE(
    req : Request,
    { params } : { params : { vehicleId : string }}
) {
    try {

        

        const findVehicle = await db.query.vehicle.findFirst({
            where : 
                eq(vehicle.id, params.vehicleId),
                with : {
                    inserat : {
                        with : {
                            user : true
                        }
                    }
                }
            
        })

        if(!findVehicle) {
            return new NextResponse("Fahrzeug nicht gefunden", { status : 404 })
        }

        const currentUser = await getCurrentUser();
        //@ts-ignore
        if(!currentUser || currentUser.id !== findVehicle.inserat.userId) {
            return new NextResponse("Nicht autorisiert", { status : 403 })
        }

        const deleteVehicle = await db.delete(vehicle).where(eq(vehicle.id, params.vehicleId)).returning();

        return NextResponse.json(deleteVehicle);

    } catch(error : any) {
        console.log(error);
        return new NextResponse("Fehler beim Löschen des Fahrzeugs", { status : 500 })
    }
}