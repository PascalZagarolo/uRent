import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { giftCode } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { giftcodeId : string }}
) {
    try {
        
        const currentUser = await getCurrentUser();

        if(!currentUser || !currentUser.isAdmin) {
            return new NextResponse("Nicht autorisiert", { status : 401 })
        }

        const {expirationDate,...values} = await req.json();

        const usedToken = values?.customCode

        const usedExpirationDate = new Date(expirationDate);
        

        const updatedGiftCode = await db.update(giftCode).set({
            code : usedToken,
            expirationDate : usedExpirationDate,
            ...values
        }).where(eq(giftCode.id, params.giftcodeId)).returning()

        return NextResponse.json(updatedGiftCode);

    } catch(error : any) {
        console.log("Fehler beim bearbeiten des Codes" , error );
        return new NextResponse("Fehler beim bearbeiten des Codes", { status : 500 })
    }
}