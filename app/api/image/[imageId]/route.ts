
import db from "@/db/drizzle";
import { images } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(
    req : Request,
    { params } : { params : { imageId : string}}
) {
    try {

        const findImage = await db.query.images.findFirst({
            where : eq(images.id , params.imageId)
        })

        if(!findImage) {
            return new NextResponse("Bild nicht gefunden" , { status : 404 })
        }

        const deletedImage = await db.delete(images)
                                    .where(eq(images.id, params.imageId)).returning();



        return NextResponse.json(deletedImage)

    } catch (error) {
        console.log("Fehler in image/%5BimageId%5D/route.ts:");
        return new NextResponse("Interner Server Error" , { status : 500 } )
    }
}