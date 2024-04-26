import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { giftCode } from "@/db/schema";
import { eq } from "drizzle-orm";

import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { codeId : string }}
) {
    try {
        
        const findCode = await db.query.giftCode.findFirst({
            where : (
                eq(giftCode.id , params.codeId)
            )
        })
        
        if(!findCode) {
            return new NextResponse("Code nicht gefunden", { status : 404 })
        }

        const currentUser = await getCurrentUser();

        if(!currentUser || !currentUser.isAdmin) {
            return new NextResponse("Nicht autorisiert", { status : 401 })
        }

        const [deleteCode] = await db.delete(giftCode).where(
            eq(giftCode.id, params.codeId)
        ).returning()

        return NextResponse.json(deleteCode);
    } catch(error : any) {
        console.log("Fehler beim löschen des Codes", error);
        return new NextResponse("Fehler beim löschen des Codes", { status : 500 })
    }
}