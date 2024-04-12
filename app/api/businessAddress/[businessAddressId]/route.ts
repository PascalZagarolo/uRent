import getCurrentUser from "@/actions/getCurrentUser";
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

export async function DELETE(
    req : Request,
    { params } : { params : { businessAddressId : string}}
) {
    try {

        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return new NextResponse("Nicht authorisiert", { status : 401})
        }

        const findBusinessAddress = await db.query.businessAddress.findFirst({
            where : eq(businessAddress.id, params.businessAddressId )
        })

        if(!findBusinessAddress) {
            return new NextResponse("Standort nicht gefunden", { status : 404})
        }

        const [deletedAddress] = await db.delete(businessAddress).where(eq(businessAddress.id, params.businessAddressId)).returning();

        return NextResponse.json(deletedAddress);

    } catch (error) {
        console.log("Fehler beim löschen des Standortes", error);
        return new NextResponse("Fehler beim löschen des Standortes" , { status : 500})
    }
}