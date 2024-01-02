import { db } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function PUT(
    req : Request,
    { params } : { params : { inseratId : string }}
) {
    try {

        const { list } = await req.json();

        for (let item of list) {
            await db.image.update({
                where :{
                    id : item.id
                }, data :{
                    position : item.position
                }
            })
        }

        return new NextResponse("Erfolg" , { status : 200})

    } catch(error) {
        console.log("Fehler in inserat/%5BinseratId%5D/image/reorder/route.ts:");
        return new NextResponse("Interner Server Error" , { status : 500 } )
    }
}