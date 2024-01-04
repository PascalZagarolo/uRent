import { db } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function DELETE(
    req : Request,
    { params } : { params : { imageId : string}}
) {
    try {

        const findImage = await db.images.findUnique({
            where : {
                id : params.imageId
            }
        })

        if(!findImage) {
            return new NextResponse("Bild nicht gefunden" , { status : 404 })
        }

        const deletedImage = await db.images.delete({
            where : {
                id : params.imageId
            }
        })



        return NextResponse.json(deletedImage)

    } catch (error) {
        console.log("Fehler in image/%5BimageId%5D/route.ts:");
        return new NextResponse("Interner Server Error" , { status : 500 } )
    }
}