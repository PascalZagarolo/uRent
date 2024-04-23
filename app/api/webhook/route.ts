import db from "@/db/drizzle";
import { userTable, userSubscription, inserat } from "@/db/schema";

import { stripe } from "@/lib/stripe";
import axios from "axios";
import { eq } from "drizzle-orm/sql";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(
    req : Request
) {

    const body = await req.text();
    console.log(body)
    const signature = headers().get("Stripe-Signature") as string

    const sig = signature.toString();

    let event: Stripe.Event;

    
    try {
        
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
        
    } catch(error : any) {
        console.log(error)
        return new NextResponse(`Webhook Error : ${error.message}` , { status : 400 })
    }
    
    const session = event.data.object as Stripe.Checkout.Session

    if(session?.metadata?.upgrade === "true" && event.type === "checkout.session.completed") {
        console.log("upgrade")
        
        
        
        
        if(!session?.metadata?.userId) {
            return new NextResponse("UserId nicht gefunden", {status : 400})
        }
        
        if(!session?.metadata?.amount) {
            return new NextResponse("Keine Anzahl gefunden", {status : 400})
        }
       
        if(!session?.metadata?.subscriptionType) {
            return new NextResponse("Keinen Typ gefunden", {status : 400})
        }

        const [patchSubscription] = await db.update(userSubscription).set({
            //@ts-ignore
            subscriptionType : session?.metadata?.subscriptionType,
            //@ts-ignore
            amount : session?.metadata?.amount,
        }).where(eq(userSubscription.userId, session?.metadata?.userId)).returning();
       
        const subscriptions = await stripe.subscriptions.list({
            customer: patchSubscription.stripe_customer_id,
          });
          
        const stripeSubscription = await stripe.subscriptions.update(
            patchSubscription.stripe_subscription_id,
            {
                items : [
                    {
                        id : subscriptions.data[0].items.data[0].id,
                        price : session?.metadata?.priceId
                    }
                ],proration_behavior: 'none'
            }
        )
        console.log("6")
        return new NextResponse(null, {status : 200})
    }
    
    if(event.type === "checkout.session.completed") {
        
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

        
        
        if(!session?.metadata?.userId) {
            return new NextResponse("UserId nicht gefunden", {status : 400})
        }
        
        if(!session?.metadata?.subscriptionType) {
            return new NextResponse("Subscription nicht gefunden", {status : 400})
        }
        
        if(!session?.metadata?.amount) {
            return new NextResponse("Keine Anzahl angegeben", {status : 400})
        }

        if(!session?.metadata?.productId) {
            return new NextResponse("Keine ProduktId hinterlegt", {status : 400})
        }
        
        const [createdSubscription] = await db.insert(userSubscription).values({
            //@ts-ignore
            userId : session?.metadata?.userId,
            subscriptionType : session?.metadata?.subscriptionType,
            stripe_subscription_id : subscription.id,
            stripe_customer_id : subscription.customer as string,
            stripe_price_id : subscription.items.data[0].price.id,
            amount : session?.metadata?.amount,
            stripe_product_id : session?.metadata?.productId,
            stripe_current_period_end : new Date(
                subscription.current_period_end * 1000
            
            )
        }).returning();

        await db.update(userTable).set({
            subscriptionId : createdSubscription.id,
        }).where(eq(userTable.id, session?.metadata?.userId))

        //publish inserat if id was in the given querystring
        if(session?.metadata?.usedId) {
            const patchedInserat = await db.update(inserat).set({
                isPublished : true
            }).where(eq(inserat.id, session?.metadata?.usedId)).returning();
        }
        
        return new NextResponse(null, {status : 200})
       
        
    }
    
    //renew subscription
    if(event.type === "invoice.payment_succeeded") {
        //get priceId of subscription
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

        //get new amount and subscriptionType in case user downgraded
        require('stripe')('sk_test_51OXL4bGRyqashQ2wAaNYkzVV68vGMgReR45Ct3q8BfZO6KCXnZ2BNhiotRuYCwAAOwQxy4iZy2B8WEgRQa2PIG2I00tApjW5eR');

        //query for price to get matching productId
        const connectedPrice = await stripe.prices.retrieve(subscription.items.data[0].price.id);

        //get product id, to change amount and subscriptionType if changed
        const product = await stripe.products.retrieve(connectedPrice.product as string);

        await db.update(userSubscription).set({
            stripe_price_id : subscription.items.data[0].price.id,
            stripe_current_period_end : new Date(
                subscription.current_period_end * 1000
            ),
            //@ts-ignore
            amount : product?.metadata?.amount,
            //@ts-ignore
            subscriptionType : product?.metadata?.type as string,

        }).where(
            eq(userSubscription.stripe_subscription_id, subscription.id)
        )
    }

    return new NextResponse(null, {status : 200})

}