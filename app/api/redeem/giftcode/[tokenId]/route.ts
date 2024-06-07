import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { giftCode, userSubscription, userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { addMonths } from "date-fns";

export async function PATCH(
    req  : Request,
    { params } : { params : { tokenId : string}}
) {
    try {
        
        const currentUser = await getCurrentUser();

        const currentDate = new Date();

        if(!currentUser) {
            return new NextResponse("Nicht eingeloggt", { status: 401 });
        }

        const existingSubscription = await db.query.userSubscription.findFirst({
            where : eq(userSubscription.userId, currentUser.id)
        })

        if(existingSubscription) {
            return new NextResponse("Code konnte nicht eingelöst werden (ERR_01: EXISTING_SUBSCRIPTION)", { status: 400 });
        }

        const findGiftCode = await db.query.giftCode.findFirst({
            where : eq(giftCode.code, params.tokenId)
        })

        if(!findGiftCode) {
            return new NextResponse("Code konnte nicht eingelöst werden (ERR_02: INVALID_TOKEN)", { status: 400 });
        }

        if(findGiftCode.expirationDate < currentDate) {
            return new NextResponse("Code konnte nicht eingelöst werden (ERR_03: EXPIRATED)", { status: 400 });
        }

        if(findGiftCode.availableAmount <= 0) {
            return new NextResponse("Code konnte nicht eingelöst werden (ERR_03: LIMIT_EXCEEDED)", { status: 400 });
        }
        

        const usedExpiration = addMonths(new Date(currentDate), findGiftCode.months)

        const [createSubscription] = await db.insert(userSubscription).values({
            userId : currentUser.id,
            subscriptionType : findGiftCode.plan,
            amount : findGiftCode.inseratAmount,
            stripe_current_period_end : usedExpiration,
            isGift : true
        }).returning();

        const patchUser = await db.update(userTable).set({
            subscriptionId : createSubscription.id
        })
        
        if(findGiftCode.availableAmount <= 1) {
            const deleteGiftCode = await db.delete(giftCode).where(eq(giftCode.code, params.tokenId))
        } else {
            const updateGiftCard = await db.update(giftCode).set({
                availableAmount : findGiftCode.availableAmount - 1
            }).where(eq(giftCode.code, params.tokenId))
        }

        return NextResponse.json(createSubscription)

    } catch(error : any) {
        console.log("Fehler beim Code einlösen",error);
        return new NextResponse("Fehler beim Code einlösen", { status: 500 });
    }
}