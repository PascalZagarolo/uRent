import db from "@/db/drizzle";
import { notification, userSubscription } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { notificationTypeEnum } from '../../../../db/schema';
import { sendSubscriptionAlmostExpired } from "@/lib/mail";

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

        const lessThanOneWeek = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);

        const usedMessage = `Dein Abonnement läuft in wenigen Tagen aus. Verlängere es nach Ablauf um weiterhin Zugriff auf alle Vorteile zu haben.`
        
        for (const giftSub of findAllGiftSubs as any) {
            console.log(1)
            if (new Date(giftSub.stripe_current_period_end) < lessThanOneWeek && new Date(giftSub.stripe_current_period_end) >= currentDate ) {
                //@ts-ignore
               


                const existingNotification = giftSub.user.notifications
                    .find((notification) => notification.notificationType === "SUBSCRIPTION_ALMOST_EXPIRED" &&
                    new Date(notification.createdAt) >= oneWeekAgo);
                
                
                    
                if (!existingNotification) {
                    //@ts-ignore
                    const createdNotification = await db.insert(notification).values({
                        userId : giftSub.userId as string,
                        notificationType : "SUBSCRIPTION_ALMOST_EXPIRED",
                        content : usedMessage,
                        
                    })
                    
                    const sendInfoMail = await sendSubscriptionAlmostExpired(giftSub.user.email as string);
                    
                    
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