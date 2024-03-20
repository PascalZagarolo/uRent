
import db from "@/db/drizzle";
import { inserat, trailerAttribute } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { inseratId : string }}
) {
    try {

        const values = await req.json();

        

        const findAttributes = await db.query.trailerAttribute.findFirst({
            where : eq(trailerAttribute.inseratId, params.inseratId)
        })

        if(!findAttributes) {

            const [patchedInserat] = await db.insert(trailerAttribute).values({
                inseratId : params.inseratId,
                ...values,
            }).returning()

            const [patchedOrigin] = await db.update(inserat).set({
                trailerId : patchedInserat.id
            }).where(eq(inserat.id, params.inseratId)).returning();

            return NextResponse.json({patchedInserat, patchedOrigin});
            
        } else {
            const patchedInserat = await db.update(trailerAttribute).set({
                ...values
            }).where(eq(trailerAttribute.inseratId, params.inseratId)).returning();
            return NextResponse.json(patchedInserat[0]);
        }

        

    } catch (error) {
        console.log(error);
        return new NextResponse(error, { status: 500 });
        
    }
}