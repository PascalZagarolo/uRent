import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { inserat } from "@/db/schema";
import { eq } from "drizzle-orm";

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

        if(!findInserat || findInserat.userId !== currentUser.id || !currentUser) {
            return new NextResponse("Nicht autorisiert" , { status : 401 })
        }

        const dehighlightInserat = await db.update(inserat).set({
            isHighlighted : false
        }).where(eq(inserat.id, params.inseratId)).returning();

        return NextResponse.json(dehighlightInserat)

    } catch(error : any) {
        console.log(error);
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}