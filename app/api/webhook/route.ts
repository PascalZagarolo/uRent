import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import stripe from "stripe";
import { db } from "@/app/utils/db";

export async function POST(
    req : Request,
) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch(error : any) {
        return new NextResponse(`Webhook Error ${error.message}` , { status : 400 })
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session?.metadata?.userId;
    const inseratId = session?.metadata?.inseratId;

    if(event.type === "checkout.session.completed") {
        if(!userId || !inseratId) {
            return new NextResponse("Invalid metadata: WEBHOOK_2" , { status : 400 })
        }

        await db.purchase.create({
            data : {
                inseratId : inseratId,
                userId : userId,
            }
        });
    } else {
        return new NextResponse("Invalid event type: WEBHOOK_1" , { status : 200 })
    }

    return new NextResponse(null, { status : 200 })
}