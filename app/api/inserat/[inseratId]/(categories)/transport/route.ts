
import db from "@/db/drizzle";
import { inserat, transportAttribute,  } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { inseratId : string }}
) {
    try {

        const {initial, ...values} = await req.json();

        const usedInitial = new Date(initial);

        const findAttributes = await db.query.transportAttribute.findFirst({
            where : eq(transportAttribute.inseratId, params.inseratId)
        })

        if(!findAttributes) {

            const [patchedInserat] = await db.insert(transportAttribute).values({
                inseratId : params.inseratId,
                ...(initial) && {
                    initial : usedInitial
                },
                ...values,
            }).returning()

            const patchedOrigin = await db.update(inserat).set({
                transportId : patchedInserat.id
            }).where(eq(inserat.id, params.inseratId)).returning();

            return NextResponse.json({patchedInserat, patchedOrigin});
            
        } else {
            const patchedInserat = await db.update(transportAttribute).set({
                initial : initial ? usedInitial : null,
                ...values
            }).where(eq(transportAttribute.inseratId, params.inseratId)).returning();
            return NextResponse.json(patchedInserat[0]);
        }

        

    } catch (error : any) {
        console.log(error);
        return new NextResponse(error, { status: 500 });
        
    }
}