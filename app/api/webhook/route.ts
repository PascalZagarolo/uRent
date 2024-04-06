import db from "@/db/drizzle";
import { inseratSubscription } from "@/db/schema";
import { stripe } from "@/lib/stripe";
import { eq } from "drizzle-orm/sql";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(
    req : Request
) {

    const body = await req.json();
    const signature = headers().get("Stripe-Signature") as string

    let event: Stripe.Event;

    
    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch(error : any) {
        return new NextResponse(`Webhook Error : ${error.message}` , { status : 400 })
    }

    const session = event.data.object as Stripe.Checkout.Session

    if(event.type === "checkout.session.completed") {

        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

        if(!session?.metadata?.inseratId) {
            return new NextResponse("InseratId nicht gefunden", {status : 400})
        }

        if(!session?.metadata?.userId) {
            return new NextResponse("UserId nicht gefunden", {status : 400})
        }

        if(!session?.metadata?.subscription) {
            return new NextResponse("Subscription nicht gefunden", {status : 400})
        }

        await db.insert(inseratSubscription).values({
            inseratId : session?.metadata?.inseratId,
            stripe_subscription_id : subscription.id,
            stripe_customer_id : subscription.customer as string,
            stripe_price_id : subscription.items.data[0].price.id,
            stripe_current_period_end : new Date(
                subscription.current_period_end * 1000
            
            )
        })
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