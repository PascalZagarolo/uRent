import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { userSubscription } from "@/db/schema";

import { stripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";

import { NextResponse } from "next/server";


export async function PATCH(
    req: Request,
    { params }: { params: { userId: string } }
) {
    try {

        const values = await req?.json();

        const currentUser = await getCurrentUser();




        if (!currentUser) {
            return new NextResponse("Nicht autorisiert : Kein Login", { status: 401 })
        }



        const existingSubscription = await db.query.userSubscription.findFirst({
            where: (
                eq(userSubscription.userId, params.userId)
            )
        })



        if (existingSubscription && existingSubscription.stripe_customer_id) {

            //change redirectUrl
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: existingSubscription.stripe_customer_id,
                return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/app/inserate/${params.userId}`
            })

            return new NextResponse(JSON.stringify({ url: stripeSession.url }))
        }

        //change success && cancel url
        const stripeSesison = await stripe.checkout.sessions.create({
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/inserat/${params.userId}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing/${params.userId}`,
            payment_method_types: ['card', 'paypal', 'sofort'],

            mode: "subscription",


            customer_email: currentUser.email,

            line_items: [
                {
                    price: values.subscriptionId,
                    quantity: 1
                }
            ],
            metadata: {
                userId: params.userId,
                amount: values.amount,
                subscriptionType: values.subscriptionType
            }
        })

        console.log(stripeSesison.url)

        return new NextResponse(JSON.stringify({ url: stripeSesison.url }))

    } catch (error) {
        console.log("Error in Stripe checkout", error);
        return new NextResponse(null, { status: 500 })
    }
}