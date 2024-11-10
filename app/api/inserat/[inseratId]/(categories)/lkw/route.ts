
import db from "@/db/drizzle";
import { inserat, lkwAttribute } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { inseratId : string }}
) {
    try {

        const {initial, ...values} = await req.json();

        const usedInitial = new Date(initial);

        

        const findAttributes = await db.query.lkwAttribute.findFirst({
            where : eq(lkwAttribute.inseratId, params.inseratId)
        })

        if(!findAttributes) {

            const [patchedInserat] = await db.insert(lkwAttribute).values({
                inseratId : params.inseratId,
                ...(initial) && {
                    initial : usedInitial
                },
                ...values,
            }).returning()

            const patchedOrigin = await db.update(inserat).set({
                lkwId : patchedInserat.id
            }).where(eq(inserat.id, params.inseratId)).returning();

            return NextResponse.json({patchedInserat, patchedOrigin});
            
        } else {
            const patchedInserat = await db.update(lkwAttribute).set({
                initial : initial ? usedInitial : null,
                ...values,

            }).where(eq(lkwAttribute.inseratId, params.inseratId)).returning();
            return NextResponse.json(patchedInserat[0]);
        }

        

    } catch (error : any) {
        console.log(error);
        return new NextResponse(error, { status: 500 });
        
    }
}