import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function DELETE(
    req : Request,
    { params} : { params : { inseratId : string }}
) {
    try {

        const deletedInserat = await db.inserat.delete({
            where : {
                id : params.inseratId
            }
        })

        return NextResponse.json(deletedInserat)

    } catch(error) {
        console.log(error);
        return new NextResponse("Interner Server Error", { status : 500 })
    }
}