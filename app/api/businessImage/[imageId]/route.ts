import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { businessImages } from "@/db/schema";
import { eq, ne } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(
    req : Request,
    { params } : { params : { imageId : string } }
) {
    try {

        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return new NextResponse("Nicht eingeloggt", { status: 401 });
        }

        const findImage = await db.query.businessImages.findFirst({
            where : (
                eq(businessImages.id, params.imageId)
            )
        })

        if(!findImage){
            return new NextResponse("Bild nicht gefunden", { status: 404 });
        }

        const [deletedImage] = await db.delete(businessImages).where(
            eq(businessImages.id, params.imageId)
        ).returning();

        return NextResponse.json(deletedImage);

    } catch(error) {
        console.log("Fehler beim Löschen", error);
        return new NextResponse("Fehler beim Löschen", { status: 500 });
    }
}