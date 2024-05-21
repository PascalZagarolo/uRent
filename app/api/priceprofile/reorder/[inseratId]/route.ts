
import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { inserat, priceprofile } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { find } from 'lodash';

export async function PATCH(
    req : Request,
    { params } : { params : { inseratId : string } }
) {
    try {

        const findInserat = await db.query.inserat.findFirst({
            where : (
                eq(inserat.id, params.inseratId)
            ),
            with : {
                priceprofiles : true
            }
        })

        if(!findInserat) {
            return new NextResponse("Inserat nicht gefunden", { status: 404 })
        }

        const currentUser = await getCurrentUser();

        if(!currentUser ||  findInserat.userId !== currentUser?.id) {
            return new NextResponse("Nicht autorisiert", { status: 401 })
        }

        const values = await req.json();

        if (values?.action === "Up") {
            const previousId = findInserat?.priceprofiles.find((priceprofile : any) => priceprofile.id === values.priceprofileId)?.id;

            if(!previousId) {
                return new NextResponse("Preisprofil nicht gefunden", { status: 404 })
            }

            const patchPrevious = await db.update(priceprofile).set({
                position : values?.position
            }).where(eq(priceprofile.id, previousId)).returning();

            const patchCurrent = await db.update(priceprofile).set({
                position : values?.position - 1
            }).where(eq(priceprofile.id, values.priceprofileId)).returning();

            return NextResponse.json({ patchPrevious, patchCurrent})
        } else if(values?.action === "Down") {
            return NextResponse.json({})
        } else {
            return new NextResponse("Ungültige Aktion", { status: 405 })
        }

    } catch(error : any) {
        console.log("Fehler beim verschieben der Preisprofile", error);
        return new NextResponse("Fehler beim verschieben der Preisprofile", { status: 500 });
    }
}