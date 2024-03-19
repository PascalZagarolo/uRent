

import { NextResponse } from "next/server";
import { inserat } from '../../../../db/schema';
import db from "@/db/drizzle";
import { eq } from "drizzle-orm";

export async function PATCH(
    req : Request,
    { params } : { params : { inseratId : string}}
) {
    try {

        const values = await req.json();
        

        const patchedInserat = await db.update(inserat).set({
            ...values
        }).where(eq(inserat.id, params.inseratId)).returning();

        return NextResponse.json(patchedInserat)

    } catch (error) {
        console.log("Fehler in /api/inserat/[inseratId]/route.ts:", error);
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}

