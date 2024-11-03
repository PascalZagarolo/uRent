import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { inserat } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { inseratId : string }}
) {
    try {

        const findInserat = await db.query.inserat.findFirst({
            where : eq(inserat.id, params.inseratId)
        })

        const currentUser = await getCurrentUser();
        
        if(!findInserat || findInserat.userId !== currentUser.id) {
            
            return new NextResponse("Nicht autorisiert" , { status : 401 })
        }

        const existingHighlights = await db.query.inserat.findMany({
            where : and(
                eq(inserat.isHighlighted, true),
                eq(inserat.userId, currentUser.id)
            )
        })

        if(existingHighlights.length > 1) {
            return new NextResponse("Du hast bereits zuviele Inserate hervorgehoben" , { status : 400 })
        }

        const highlightInserat = await db.update(inserat).set({
            isHighlighted : true,
            color : "PURPLE"
        }).where(eq(inserat.id, params.inseratId)).returning();

        return NextResponse.json(highlightInserat)
    } catch(error : any) {
        console.log("Fehler in /api/inserat/%5BinseratId%5D/highlight/route.ts:", error);
        return new NextResponse("Interner Server Error" , { status : 500 })
        
    }
}