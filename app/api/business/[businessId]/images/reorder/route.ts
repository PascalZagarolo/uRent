import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { businessImages } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { businessId : string}}
) {
    try {

        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return new NextResponse("Nicht eingeloggt", { status: 401 });
        }

        const values = await req.json();

        

        if(values.action === "down") {
            const switchedImage = await db.update(businessImages).set({
                position: values.position
            }).where(
                and(
                    eq(businessImages.businessId, params.businessId),
                    eq(businessImages.position, values.position + 1)
                )
            ).returning();

            const touchedImage = await db.update(businessImages).set({
                position: values.position + 1
            }).where(eq(businessImages.id, values.imageId)).returning()

            return NextResponse.json({ switchedImage, touchedImage });
        } else {
            const [switchedImage] = await db.update(businessImages).set({
                position: values.position
            }).where(
                and(
                    eq(businessImages.businessId, params.businessId),
                    eq(businessImages.position, values.position - 1)
                )
            ).returning();

            const [touchedImage] = await db.update(businessImages).set({
                position: values.position - 1
            }).where(eq(businessImages.id, values.imageId)).returning()

            return NextResponse.json({ switchedImage, touchedImage });
        }

        
    } catch(error) {
        return new NextResponse("Fehler beim Verschieben", { status: 500 });
        console.log("Fehler beim Verschieben", error);
    }
}