
import db from "@/db/drizzle";
import { inserat } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server"

export async function PATCH(
    req : Request,
    { params } : { params : { inseratId : string }}
) {
    try {

        const foundInserat = await db.query.inserat.findFirst({
            where : (
                eq(inserat.id, params.inseratId)
            )
        })

        const updateInserat = await db.update(inserat).set({
            views : (foundInserat.views + 1)
        }).where(eq(inserat.id, params.inseratId)).returning()

        return NextResponse.json(updateInserat[0])
    } catch(error) {
        console.log(error)
        return new NextResponse(error, { status: 500 });
    }
}