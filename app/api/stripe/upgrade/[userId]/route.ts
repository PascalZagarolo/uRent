
import { NextResponse } from 'next/server';
import getCurrentUser from '@/actions/getCurrentUser';
import db from "@/db/drizzle";
import { eq, is } from "drizzle-orm";
import { userSubscription } from "@/db/schema";
import { stripe } from '@/lib/stripe';
import { title } from 'process';
import { redirect } from 'next/navigation';

export async function PATCH(
    req : Request,
    { params } : { params : { userId : string }}
) {
    try {
        console.log("...")
        const currentUser = await getCurrentUser();
        
        if(!currentUser) {
            return  redirect("/login")
        }
        
        

        const values = await req.json();

        const product = await stripe.products.retrieve(values.productId);
        
        if(!product) {
            return new NextResponse("Kein zugehöriges Produkt gefunden", { status : 404 })
        }
       
        const price = await stripe.prices.retrieve(product.default_price as string);

        const findExistingSubscription = await db.query.userSubscription.findFirst({
            where : (
                eq(userSubscription.userId, params.userId)
            )
        })
        
        if(!findExistingSubscription) {
            return new NextResponse("Kein Abonnement gefunden", { status : 404 })
        }
        
        //pay one time fee to upgrade => database update is performed in the webhook
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: values.usedId ? 
            `${process.env.NEXT_PUBLIC_BASE_URL}/inserat/${values.usedId}` :
            `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/${params.userId}?tab=payments`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
            payment_method_types: ['card', 'paypal', 'sofort'],

            mode: "payment",
             customer : findExistingSubscription.stripe_customer_id,
           
            line_items: [
                {   
                    
                    price_data : {
                        currency : 'eur',
                        product : product.id,
                        unit_amount : values.diffrence,
                        
                    },
                    quantity: 1,
                    
                }
            ],
            invoice_creation : {
                enabled : true,
                invoice_data : {
                    description : `Upgrade von ${findExistingSubscription.subscriptionType} auf ${product.metadata.type}`,
                    metadata : {
                        userId : params.userId,
                        amount : values.diffrence,
                        subscriptionType : product.metadata.type,
                        productId : values.productId,
                        usedId : values.usedId,
                        priceId : price.id,
                        upgrade : "true",
                        total : Number(values.diffrence)
                    },
                    rendering_options : {
                        amount_tax_display : "include_inclusive_tax",
                    },
                    footer : "uRent UG (haftungsbeschränkt)"
                }
            },
            metadata: {
                userId: params.userId,
                amount: product.metadata.amount,
                subscriptionType: product.metadata.type,
                productId : values.productId,
                usedId : values.usedId,
                priceId : price.id,
                upgrade : "true",
                total : Number(values.diffrence),
                usedDescription : `Upgrade von ${findExistingSubscription.subscriptionType}(${findExistingSubscription?.amount}) auf ${product.metadata.type}(product.metadata.amount)`
            }
        })


        
            
        return new NextResponse(JSON.stringify({ url : stripeSession.url }))
    } catch (error) {
        console.log("Fehler beim Stripe Abonnement upgraden", error);
        return new NextResponse("Fehler beim Stripe Abonnement", { status : 500 })
    }
}