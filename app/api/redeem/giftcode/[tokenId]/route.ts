import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { giftCode, userGifts, userSubscription, userTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { addMonths } from "date-fns";

export async function PATCH(
    req: Request,
    { params }: { params: { tokenId: string } }
) {
    try {

        const currentUser = await getCurrentUser();

        const currentDate = new Date();

        if (!currentUser) {
            return new NextResponse("Nicht eingeloggt", { status: 401 });
        }


        const findGiftCode = await db.query.giftCode.findFirst({
            where: eq(giftCode.code, params.tokenId)
        })

        if (!findGiftCode) {
            return new NextResponse("Code konnte nicht eingelöst werden. Der eingelöste Code existiert nicht. (ERR_02: INVALID_TOKEN)", { status: 400 });
        }

        //Finde ob Code bereits eingelöst
        const findExistingGift = await db.query.userGifts.findFirst({
            where: and(
                eq(userGifts.userId, currentUser.id),
                eq(userGifts.giftCodeId, findGiftCode.id)
            )
        })

        if (findExistingGift) {
            return new NextResponse("Code konnte nicht eingelöst werden, du hast diesen Code bereits eingelöst. (ERR_04: ALREADY_REDEEMED)", { status: 400 });
        }

        const existingSubscription = await db.query.userSubscription.findFirst({
            where: eq(userSubscription.userId, currentUser.id)
        })
        
        if (existingSubscription) {
            console.log("...existingSubscription")
            return new NextResponse("Du hast bereits ein Abonnement, und kannst diesen Code nicht einlösen.", { status: 400 });
        }

        console.log("...existingSubscription")

        

        if (findGiftCode.expirationDate < currentDate) {
            return new NextResponse("Code konnte nicht eingelöst werden (ERR_03: EXPIRATED)", { status: 400 });
        }

        if (findGiftCode.availableAmount <= 0) {
            return new NextResponse("Code konnte nicht eingelöst werden (ERR_03: LIMIT_EXCEEDED)", { status: 400 });
        }

        
        ///////////////////////////////////////////////////////////////////////////


        const usedExpiration = addMonths(new Date(currentDate), findGiftCode.months)

        const [createSubscription] = await db.insert(userSubscription).values({
            userId: currentUser.id,
            subscriptionType: findGiftCode.plan,
            amount: findGiftCode.inseratAmount,
            stripe_current_period_end: usedExpiration,
            isGift: true
        }).returning();

        await db.insert(userGifts).values({
            userId: currentUser.id,
            giftCodeId: findGiftCode.id,
        })

        await db.update(userTable).set({
            subscriptionId: createSubscription.id
        }).where(eq(userTable.id, currentUser.id))



        if (findGiftCode.availableAmount !== 0) {
            await db.update(giftCode).set({
                availableAmount: findGiftCode.availableAmount - 1
            }).where(eq(giftCode.code, params.tokenId))
        }

        return NextResponse.json(createSubscription)

    } catch (error: any) {
        console.log("Fehler beim Code einlösen", error);
        return new NextResponse("Fehler beim Code einlösen", { status: 500 });
    }
}