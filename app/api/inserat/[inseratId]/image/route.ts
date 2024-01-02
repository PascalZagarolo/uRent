import { db } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function POST(
    req : Request,
    { params } : { params : { inseratId : string }}
) {
    try {

        const data = await req.json()

        const inserat = await db.inserat.findUnique({
            where : {
                id : params.inseratId
            }, include : {
                image : true
            }
        })

        const position = inserat.image.length + 1;

        const image = await db.image.create({
            data : {
                url : data.url,
                position : position,
                inseratId : params.inseratId
            }
        })

        return NextResponse.json({inserat, image})


    } catch(error) {
        console.log("Fehler in inserat/%5BinseratId%5D/image/route.ts:");
        return new NextResponse("Interner Server Error" , { status : 500 } )
    }
}