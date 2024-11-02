import db from "@/db/drizzle";
import { inserat, priceprofile } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";




export async function PATCH(
    req : Request,
    { params } : { params : { inseratId : string } }
) {
    try {

        const findInserat = await db.query.inserat.findFirst({
            where : (
                eq(inserat.id, params.inseratId)
            )
        })

        if(!findInserat) {
            return new NextResponse("Inserat nicht gefunden", { status: 404 });
        }

        const { newProfiles } = await req.json();

        for (const profile of newProfiles) {
            await db.update(priceprofile).set({
                position : profile?.position
            }).where(
                eq(priceprofile.id, profile?.id)
            )
        }
        
        return new NextResponse("Preisprofile erfolgreich verschoben", { status: 200 });

    } catch(error : any) {
        console.log("Fehler beim verschieben der Preisprofile", error);
        return new NextResponse("Fehler beim verschieben der Preisprofile", { status: 500 });
    }
}