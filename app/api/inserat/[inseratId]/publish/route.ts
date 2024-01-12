import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { inseratId : string}}
) {
    try {

        const { publish } = await req.json();

        const patchedInserat = await db.inserat.update({
            where : {
                id : params.inseratId
            }, data : {
                isPublished : publish
            }
        })

        return NextResponse.json(patchedInserat)

    } catch (error) {

        console.log("Fehler in /api/inserat/[inseratId]/publish/route.ts:");
        return new NextResponse("Interner Server Error" , { status : 500 })

    }
}