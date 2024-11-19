'use server'

import { NextResponse } from "next/server";
import getCurrentUser from "../getCurrentUser";
import { stripe } from "@/lib/stripe";
import { userSubscription } from "@/db/schema";
import db from "@/db/drizzle";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { find } from "lodash";


export async function connectSubscription(findEmail: string, subscriptionId: string) {
    try {



        if (!findEmail || !subscriptionId) {
            return { error: "Keine Email/SubscriptionID gefunden" };
        }

        const currentUser = await getCurrentUser();

        if (!currentUser || currentUser.email !== findEmail) {

            return { error: "Emails stimmen nicht überein / Kein Nutzer gefunden.." };
        }

        const findSubscription = await stripe?.subscriptions?.retrieve(subscriptionId);
        console.log(findSubscription)
        const findCustomer = await stripe?.customers?.retrieve(findSubscription?.customer as string);
        const findProduct = await stripe?.products?.retrieve(findSubscription?.items?.data[0].price.product as string);
        console.log(findProduct)
        if (!findSubscription || !findCustomer) {
            return { error: "Keine Subscription/Kunde gefunden" };
        }

        //@ts-ignore
        if (findCustomer?.email !== findEmail) {
            return { error: "Emails stimmen nicht überein" };
        }
        
        const formattedDate = convertUnixTimestamp(findSubscription?.current_period_end as number);
        const usedAmount = Number(findProduct?.metadata?.amount);
        const usedType = String(findProduct?.metadata?.type);
        const priceId = findSubscription?.items?.data[0]?.price?.id

        const createSubscription = await db.insert(userSubscription).values({
            userId: currentUser.id,
            stripe_customer_id: findCustomer.id,
            stripe_subscription_id: findSubscription.id,
            stripe_current_period_end: formattedDate,
            stripe_product_id: findProduct.id,
            stripe_current_price_id : priceId,
            amount: usedAmount,
            subscriptionType : usedType as any
            
        })


    } catch (e: any) {
        console.log(e);
    }
}


function convertUnixTimestamp(timestamp: number) {
    // Convert the timestamp to milliseconds (as Date expects milliseconds)
    const date = new Date(timestamp * 1000);
    // Format it as a readable string
    return date;
}