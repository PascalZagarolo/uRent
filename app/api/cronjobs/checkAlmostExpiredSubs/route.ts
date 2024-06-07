import db from "@/db/drizzle";
import { userSubscription } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
) {
    try {

        
        //Send reminder for giftsubs that end in less than a week
        const findAllGiftSubs = await db.query.userSubscription.findMany({
            where: eq(userSubscription.isGift, true),
            with: {
                user: {
                    with: {
                        notifications: true
                    }
                }
            }
        })

        const currentDate = new Date();

        const lessThanOneWeek = new Date(currentDate.setDate(currentDate.getDate() + 7));

        
        for (const giftSub of findAllGiftSubs) {
            if (new Date(giftSub.stripe_current_period_end) < lessThanOneWeek && new Date(giftSub.stripe_current_period_end) >= currentDate ) {
                //@ts-ignore
                const existingNotification = giftSub.user.notifications
                    .find((notification) => notification.type === "SUBSCRIPTION_ALMOST_EXPIRED" &&
                    new Date(notification.createdAt) >= lessThanOneWeek);
                if (!existingNotification) {
                    //Send notification
                    //Send Email
                }
            }
        }

        console.log(findAllGiftSubs)

        return new NextResponse("OK", { status: 200 })

    } catch (error: any) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}