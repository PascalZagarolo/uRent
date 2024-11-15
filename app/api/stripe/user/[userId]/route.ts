import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { userSubscription } from "@/db/schema";

import { stripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";

import { NextResponse } from "next/server";
import { metadata } from '../../../../(dashboard)/page';


export async function PATCH(
    req: Request,
    { params }: { params: { userId: string } }
) {
    try {

        const stripe = 
        require('stripe')('sk_test_51OXL4bGRyqashQ2wAaNYkzVV68vGMgReR45Ct3q8BfZO6KCXnZ2BNhiotRuYCwAAOwQxy4iZy2B8WEgRQa2PIG2I00tApjW5eR');

        const values = await req?.json();

        const currentUser = await getCurrentUser();

        const existingSubscription = await db.query.userSubscription.findFirst({
            where: (
                eq(userSubscription.userId, params.userId)
            )
        })

        const today = new Date();
        const endDate = new Date(existingSubscription?.stripe_current_period_end)

        

        if (existingSubscription && existingSubscription.stripe_customer_id && endDate > today) {

            //change redirectUrl
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: existingSubscription.stripe_customer_id,
                return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/${params.userId}?tab=payments`,
                
            })

            return new NextResponse(JSON.stringify({ url: stripeSession.url }))
        }

        

        const product = await stripe.products.retrieve(values.productId);
        
        const receivedPrice = await stripe.prices.retrieve(product.default_price);

        

        


        if (!currentUser) {
            return new NextResponse("Nicht autorisiert : Kein Login", { status: 401 })
        }


        console.log("durchlaufen")

       

        //change success && cancel url
        const stripeSesison = await stripe.checkout.sessions.create({
            success_url: 
            values.usedId ?
            `${process.env.NEXT_PUBLIC_BASE_URL}/inserat/${values.usedId}` :
            `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/${params.userId}?tab=payments`
            ,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing/${params.userId}`,
            payment_method_types: ['card', 'paypal', 'sofort'],

            mode: "subscription",


            customer_email: currentUser.email,

            line_items: [
                {
                    price: receivedPrice.id,
                    quantity: 1
                }
            ],
            metadata: {
                userId: params.userId,
                amount: product.metadata.amount,
                subscriptionType: product.metadata.type,
                productId : values.productId,
                usedId : values.usedId,
            }
        })

        

        return new NextResponse(JSON.stringify({ url: stripeSesison.url }))

    } catch (error) {
        console.log("Error in Stripe checkout", error);
        return new NextResponse(null, { status: 500 })
    }
}