import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { inseratSubscription } from "@/db/schema";
import { stripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";

import { NextResponse } from "next/server";


export async function PATCH(
    req : Request,
    { params } : { params: { inseratId : string }}
) {
    try {

        const values = await req?.json();
        
        const currentUser = await getCurrentUser();
        

        if(!currentUser) {
            return new NextResponse("Nicht autorisiert : Kein Login", {status: 401})
        }

        

        const existingSubscription = await db.query.inseratSubscription.findFirst({
            where : (
                eq(inseratSubscription.inseratId, params.inseratId)
            )
        })
        
        

        if(existingSubscription && existingSubscription.stripe_customer_id) {
            console.log("yolo")
            //change redirectUrl
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer : existingSubscription.stripe_customer_id,
                return_url : `${process.env.NEXT_PUBLIC_BASE_URL}/app/inserate/${params.inseratId}`
            })

            return new NextResponse(JSON.stringify({url : stripeSession.url}))
        }
        
        //change success && cancel url
        const stripeSesison = await stripe.checkout.sessions.create({
            success_url : `${process.env.NEXT_PUBLIC_BASE_URL}/inserat/${params.inseratId}`,
            cancel_url : `${process.env.NEXT_PUBLIC_BASE_URL}/pricing/${params.inseratId}`,
            payment_method_types : ['card', 'paypal', 'sofort'],
            
            mode : "subscription",
            
           
            customer_email : currentUser.email,
           
            line_items : [
                {
                    price_data : {
                        currency : "eur",
                        product_data : {
                            name : values.inseratTitle + values.subscription,
                            description : values.subscription,
                        },
                        unit_amount : values.price,
                        recurring : {
                            interval : "month"
                        }
                    },
                    quantity : 1
                }
            ],
            metadata : {
                inseratId : params.inseratId,
                userId : currentUser.id,
                subscriptionType : values.subscription
            }
        })

        console.log(stripeSesison.url)

        return new NextResponse(JSON.stringify({ url : stripeSesison.url }))

    } catch(error) {
        console.log("Error in Stripe checkout", error);
        return new NextResponse(null, {status: 500})
    }
}