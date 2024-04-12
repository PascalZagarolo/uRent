import db from "@/db/drizzle";
import { businessAddress } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { businessAddressId : string}}
) {
    try {

        const findBusinessAddress = await db.query.businessAddress.findFirst({
            where : eq(businessAddress.id, params.businessAddressId)
        })

        const values = await req.json();

        const [patchBusinessAddress] = await db.update(businessAddress).set({
            ...values
        }).where(eq(businessAddress.id, params.businessAddressId)).returning();

        return NextResponse.json(patchBusinessAddress);

    } catch(error) {
        console.log("Fehler beim ändern des Standortes", error);
        return new NextResponse("Fehler beim ändern des Standortes", { status : 500})
    }
}