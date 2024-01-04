import { db } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function POST(
    req : Request,
    { params } : { params : { inseratId : string }}
) {
    try {

        const values = await req.json()

        const inserat = await db.inserat.findUnique({
            where : {
                id : params.inseratId
            }, include : {
                images : true
            }
        })

        const position = inserat.images.length;

        const image = await db.images.create({
            data : {
                
                position : position,
                inseratId : params.inseratId,
                url : values.image
            }
        })

        return NextResponse.json({inserat, image})


    } catch(error) {
        console.log("Fehler in inserat/%5BinseratId%5D/image/route.ts:");
        return new NextResponse("Interner Server Error" , { status : 500 } )
    }
}