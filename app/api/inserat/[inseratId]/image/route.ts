
import { NextResponse } from "next/server";
import { images, inserat } from '../../../../../db/schema';
import db from "@/db/drizzle";
import { eq } from "drizzle-orm";

export async function POST(
    req : Request,
    { params } : { params : { inseratId : string }}
) {
    try {

        const values = await req.json()

        const foundInserat = await db.query.inserat.findFirst({
            with : {
                images : true
            }, where : eq(inserat.id, params.inseratId)
        })

        const position = foundInserat.images.length;

        
        const [createdImage] = await db.insert(images).values({
            position : position,
            inseratId : params.inseratId,
            url : values.image
        }).returning();

        return NextResponse.json({foundInserat, createdImage})


    } catch(error) {
        console.log("Fehler in inserat/%5BinseratId%5D/image/route.ts:" + error);
        return new NextResponse("Interner Server Error" , { status : 500 } )
    }
}