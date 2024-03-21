

import { NextResponse } from "next/server";
import { inserat } from '../../../../db/schema';
import db from "@/db/drizzle";
import { eq } from "drizzle-orm";

export async function PATCH(
    req : Request,
    { params } : { params : { inseratId : string}}
) {
    try {

        const { begin, end, initial, ...values } = await req.json();
        
        const usedBegin = new Date(begin);
        const usedEnd = new Date(end);
        const usedInitial = new Date(initial);

        console.log(usedBegin)

        const patchedInserat = await db.update(inserat).set({
            ...(begin) && {
                begin : usedBegin
            },
            ...(end) && {
                end : usedEnd
            },
            ...(initial) && {
                inital : usedInitial
            },
            ...values,
        }).where(eq(inserat.id, params.inseratId)).returning();

        return NextResponse.json(patchedInserat)

    } catch (error) {
        console.log("Fehler in /api/inserat/[inseratId]/route.ts:", error);
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}

