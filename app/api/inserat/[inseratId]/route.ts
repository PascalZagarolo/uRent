import { db } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { inseratId : string}}
) {
    try {

        const values = await req.json();

        const patchedInserat = await db.inserat.update({
            where : {
                id : params.inseratId
            }, data :   {
                ...values
            }
        })

        return NextResponse.json(patchedInserat)

    } catch (error) {
        console.log("Fehler in /api/inserat/[inseratId]/route.ts:", error);
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}