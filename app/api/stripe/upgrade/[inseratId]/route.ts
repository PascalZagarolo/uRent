import { stripe } from "@/lib/stripe";
import { NextResponse } from 'next/server';
import getCurrentUser from '@/actions/getCurrentUser';
export async function PATCH(
    req : Request,
    { params } : { params : { inseratId : string }}
) {
    try {

        const currentUser = await getCurrentUser();

        const values = await req.json();

        const stripeSesison = await stripe.checkout.sessions.create({
            success_url : `${process.env.NEXT_PUBLIC_BASE_URL}/inserat/${params.inseratId}`,
            cancel_url : `${process.env.NEXT_PUBLIC_BASE_URL}/pricing/${params.inseratId}`,
            payment_method_types : ['card', 'paypal', 'sofort'],
            customer : values.stripe_customer_id,
            mode : "payment",
            line_items : [
                {
                    price_data : {
                        currency : "eur",
                        product_data : {
                            name : values.inseratTitle + values.subscription,
                            description : values.subscription,
                        },
                        unit_amount : values.price,
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
    } catch (error) {
        console.log("Fehler beim Stripe Abonnement upgraden", error);
        return new NextResponse("Fehler beim Stripe Abonnement", { status : 500 })
    }
}