import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { priceprofile } from "@/db/schema";
import getCurrentUser from "@/actions/getCurrentUser";

export async function PATCH(
    req : Request,
    { params } : { params :  { priceprofileId : string } }
) {
    try {

        const findPriceProfile : any = await db.query.priceprofile.findFirst({
            where : (
                eq(priceprofile.id, params.priceprofileId)
            ), with : {
                inserat : {
                    with : {
                        user : true
                    }
                }
            }
        })

        if(!findPriceProfile) {
            return new NextResponse("Preisprofil nicht gefunden", { status: 404 });
        }

        const currentUser  = await getCurrentUser();

        if (!currentUser || currentUser.id !== findPriceProfile.inserat.userId) {
            return new NextResponse("Nicht autorisiert", { status: 401 });
        }

        const values = await req.json();

        const patchedPriceProfile = await db.update(priceprofile).set({
            title : values.title,
            price : values.price,
            description : values?.description,
            freeMiles : values?.freeMiles,

        }).where(eq(priceprofile.id, params.priceprofileId));

        return new NextResponse(patchedPriceProfile);

    } catch(error : any) {
        console.log(error);
        return new NextResponse("Fehler beim Ändern des Preisprofils", { status: 500 });
    }
}