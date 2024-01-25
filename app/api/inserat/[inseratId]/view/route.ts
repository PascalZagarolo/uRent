import { db } from "@/utils/db";
import { NextResponse } from "next/server"

export async function PATCH(
    req : Request,
    { params } : { params : { inseratId : string }}
) {
    try {

        const updateInserat = await db.inserat.update({
            where : {
                id : params.inseratId
            }, data : {
                views : {
                    increment : 1
                }
            }
        })

        return NextResponse.json(updateInserat)
    } catch(error) {
        console.log(error)
        return new NextResponse(error, { status: 500 });
    }
}