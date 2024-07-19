import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { paymentMethods, userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { profileId : string }}
) {
    try {
        const currentUser = await getCurrentUser();

        if(!currentUser || currentUser.id !== params.profileId) {
            return new NextResponse("Nicht autorisiert", { status : 401 });
        }

        const existingPaymentObject = await db.query.paymentMethods.findFirst({
            where : eq(paymentMethods.userId, currentUser.id)
        })

        const values = await req.json()

        console.log(paymentMethods)

        if(!existingPaymentObject) {
            const [createdPaymentObject] = await db.insert(paymentMethods).values({
                userId : currentUser.id,
                ...values,
            }).returning()

            const patchedUser = await db.update(userTable).set({
                paymentMethodsId : createdPaymentObject.id
            }).where(eq(currentUser.id, currentUser.id)).returning();

            return NextResponse.json(createdPaymentObject)
        } else {
            console.log("ja")
            const patchedPaymentObject = await db.update(paymentMethods).set({
                ...values
            }).where(eq(paymentMethods.userId, currentUser.id))

            return NextResponse.json(patchedPaymentObject)
        }

    } catch(error : any) {
        console.log("Fehler beim speichern der Zahlungsmethoden", error);
        return new NextResponse("Fehler beim speichern der Zahlungsmethoden", { status : 500 });
    }
}