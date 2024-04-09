import db from "@/db/drizzle";
import { inserat, inseratSubscription } from "@/db/schema";
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
        console.log("try fertig")
    } catch(error : any) {
        console.log(error)
        return new NextResponse(`Webhook Error : ${error.message}` , { status : 400 })
    }
    
    const session = event.data.object as Stripe.Checkout.Session

    if(session?.metadata?.upgrade === "true" && event.type === "checkout.session.completed") {
        console.log("upgrade")
        
        
        if(!session?.metadata?.inseratId) {
            return new NextResponse("InseratId nicht gefunden", {status : 400})
        }
        console.log("1")
        if(!session?.metadata?.userId) {
            return new NextResponse("UserId nicht gefunden", {status : 400})
        }
        console.log("2")
        const newPrice = session?.metadata?.subscriptionType === "PREMIUM" ? "price_1P3eHLGRyqashQ2w8G7MmOmc" : "price_1P3eHXGRyqashQ2wzUh5fehI";
        console.log("3")
        const [patchSubscription] = await db.update(inseratSubscription).set({
            //@ts-ignore
            subscriptionType : session?.metadata?.subscriptionType,
        }).where(eq(inseratSubscription.inseratId, session?.metadata?.inseratId)).returning();
        console.log("4")
        const subscriptions = await stripe.subscriptions.list({
            customer: patchSubscription.stripe_customer_id,
          });
          console.log("5")
        const stripeSubscription = await stripe.subscriptions.update(
            patchSubscription.stripe_subscription_id,
            {
                items : [
                    {
                        id : subscriptions.data[0].items.data[0].id,
                        price : newPrice
                    }
                ],proration_behavior: 'none'
            }
        )
        console.log("6")
        return new NextResponse(null, {status : 200})
    }
    
    if(event.type === "checkout.session.completed") {
        
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

        if(!session?.metadata?.inseratId) {
            return new NextResponse("InseratId nicht gefunden", {status : 400})
        }

        if(!session?.metadata?.userId) {
            return new NextResponse("UserId nicht gefunden", {status : 400})
        }

        if(!session?.metadata?.subscriptionType) {
            return new NextResponse("Subscription nicht gefunden", {status : 400})
        }

        //@ts-ignore
        const [createdSubscription] = await db.insert(inseratSubscription).values({
            inseratId : session?.metadata?.inseratId,
            userId : session?.metadata?.userId,
            subscriptionType : session?.metadata?.subscriptionType,
            stripe_subscription_id : subscription.id,
            stripe_customer_id : subscription.customer as string,
            stripe_price_id : subscription.items.data[0].price.id,
            stripe_current_period_end : new Date(
                subscription.current_period_end * 1000
            
            )
        }).returning();

        await db.update(inserat).set({
            subscriptionId : createdSubscription.id,
            isPublished : true
        }).where(eq(inserat.id, session?.metadata?.inseratId))

        const values = {
            isPublished : true
        }

        axios.patch(`/api/inserat/${session?.metadata?.inseratId}/publish`, values)
        
    }
    
    if(event.type === "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

        await db.update(inseratSubscription).set({
            stripe_price_id : subscription.items.data[0].price.id,
            stripe_current_period_end : new Date(
                subscription.current_period_end * 1000
            )

        }).where(
            eq(inseratSubscription.stripe_subscription_id, subscription.id)
        )
    }

    return new NextResponse(null, {status : 200})

}