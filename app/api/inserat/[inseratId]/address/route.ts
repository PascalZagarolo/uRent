
import db from "@/db/drizzle";
import { address, inserat } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { inseratId : string }}
) {
    try {

        const values = await req.json();

        console.log(values);

        const existingAddressObject = await db.query.address.findFirst({
            where : eq(address.inseratId, params.inseratId)
        })

        if(!existingAddressObject) {

            const patchedAddress = await db.insert(address).values({
                inseratId : params.inseratId,
                ...values,
            }).returning()

            const patchedOrigin = await db.update(inserat).set({
                addressId : patchedAddress[0].id
            }).where(eq(inserat.id, params.inseratId)).returning();

            return NextResponse.json({patchedAddress, patchedOrigin});
            
        } else {
            const patchedAddress = await db.update(address).set({
                ...values
            }).where(eq(address.inseratId, params.inseratId)).returning();
            return NextResponse.json(patchedAddress[0]);
        }

        

    } catch (error) {
        console.log(error);
        return new NextResponse(error, { status: 500 });
        
    }
}