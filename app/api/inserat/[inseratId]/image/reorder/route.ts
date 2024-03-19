
import db from "@/db/drizzle";
import { images } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(
    req : Request,
    { params } : { params : { inseratId : string }}
) {
    try {

        const { list } = await req.json();

        for (let item of list) {
            await db.update(images).set({
                position : item.position
            }).where(eq(images.id, item.id))
        }

        return new NextResponse("Erfolg" , { status : 200})

    } catch(error) {
        console.log("Fehler in inserat/%5BinseratId%5D/image/reorder/route.ts:");
        return new NextResponse("Interner Server Error" , { status : 500 } )
    }
}