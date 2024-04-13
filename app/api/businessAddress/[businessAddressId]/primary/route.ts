import db from "@/db/drizzle";
import { businessAddress } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { businessAddressId : string}}
) {
    try {

        const relatedBusiness = await db.query.businessAddress.findFirst({
            where : (
                eq(businessAddress.id, params.businessAddressId)
            )
        })

        if(!relatedBusiness) {
            return new NextResponse("Standort nicht gefunden", { status : 404})
        }

        const previousPrimary = await db.update(businessAddress).set({
            isPrimary : false
        }).where(
            and(
                eq(businessAddress.businessId, relatedBusiness.businessId),
                eq(businessAddress.isPrimary, true)
            )
        )
        
        const [newPrimary] = await db.update(businessAddress).set({
            isPrimary : true
        }).where(eq(businessAddress.id, params.businessAddressId)).returning();


        return NextResponse.json(newPrimary);
        
        

    } catch(error) {
        console.log("Fehler beim ändern des Standortes", error);
        return new NextResponse("Fehler beim ändern des Standortes", { status : 500})
    }
}