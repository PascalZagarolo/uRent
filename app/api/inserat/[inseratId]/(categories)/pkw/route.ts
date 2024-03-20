
import db from "@/db/drizzle";
import { inserat, pkwAttribute } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { inseratId : string }}
) {
    try {

        const values = await req.json();

        

        const findAttributes = await db.query.pkwAttribute.findFirst({
            where : eq(pkwAttribute.inseratId, params.inseratId)
        })

        if(!findAttributes) {

            const [patchedInserat] = await db.insert(pkwAttribute).values({
                inseratId : params.inseratId,
                ...values,
            }).returning()

            const [patchedOrigin] = await db.update(inserat).set({
                pkwId : patchedInserat.id
            }).where(eq(inserat.id, params.inseratId)).returning();

            return NextResponse.json({patchedInserat, patchedOrigin});
            
        } else {
            const patchedInserat = await db.update(pkwAttribute).set({
                ...values
            }).where(eq(pkwAttribute.inseratId, params.inseratId)).returning();
            return NextResponse.json(patchedInserat[0]);
        }

        

    } catch (error) {
        console.log(error);
        return new NextResponse(error, { status: 500 });
        
    }
}