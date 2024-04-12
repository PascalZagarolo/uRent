import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { business, openingTimes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { find } from 'lodash';

export async function PATCH(
    req : Request,
    { params } : { params : { businessId : string } }
) {
    try {

        console.log(params.businessId)

        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return new NextResponse("Nicht angemeldet", { status : 401 })
        }

        const findBusiness = await db.query.business.findFirst({
            where : eq(business.id, params.businessId)
        })
        
        if(!findBusiness) {
            return new NextResponse("Business nicht gefunden", { status : 404 })
        }

        if(findBusiness.userId !== currentUser.id) {
            return new NextResponse("Nicht autorisiert", { status : 403 })
        }
        
        const values = await req.json();
        console.log(params.businessId)
        const findBusinessOpeningTimes = await db.query.openingTimes.findFirst({
            where : eq(openingTimes.businessId, params.businessId)
        })
        
        if(!findBusinessOpeningTimes) {
            const createdOpeningTimes = await db.insert(openingTimes).values({
                businessId : params.businessId,
                ...values,
            }).returning();

            return NextResponse.json(createdOpeningTimes)
        } else {
            const [patchedOpeningTimes] = await db.update(openingTimes).set({
                ...values
            }).where(eq(openingTimes.businessId, params.businessId)).returning()

            return NextResponse.json(patchedOpeningTimes)
        }

    } catch(error) {
        console.log("Fehler beim Speichern der Öffnungszeiten", error);
        return new NextResponse("Fehler beim Speichern der Öffnungszeiten" , { status : 500 })
    }
}