import { NextResponse } from "next/server";
import { businessImages } from '../../../../../db/schema';
import db from "@/db/drizzle";
import { eq } from "drizzle-orm";

export async function POST(
    req : Request,
     { params } : { params : { businessId : string}}
) {
    try{

        const values = await req.json();

        if(!values.image){
            return new NextResponse("Kein Bild gefunden", { status : 400})
        }

        const existingImages = await db.query.businessImages.findMany({
            where : (
                eq(businessImages.businessId, params.businessId)
            )
        })

        //delete existing images
        await db.delete(businessImages).where(
            eq(businessImages.businessId, params.businessId)
        )

        const newImage = await db.insert(businessImages).values({
            businessId : params.businessId,
            url : values.image,
            position : 0
        }).returning();

        return NextResponse.json(newImage[0])

    } catch (error) {
        console.log("Fehler beim ImageUpload", error);
        return new NextResponse("Fehler beim ImageUpload", { status : 500})
    }
}