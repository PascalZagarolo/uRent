import db from "@/db/drizzle";
import { business } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { businessId : string } }
) {
    try {

        const values = await req.json();

        const updatedBusiness = await db.update(business).set({
            ...values
        }).where(eq(business.id, params.businessId)).returning();

        return NextResponse.json(updatedBusiness);

    } catch(error) {
        console.log("Fehler beim Aktualisieren..", error); 
        return new NextResponse("Fehler beim Aktualisieren..", { status: 500 });
    }
} 