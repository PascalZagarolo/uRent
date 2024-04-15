import { stripe } from "@/lib/stripe";
import { NextResponse } from 'next/server';
import getCurrentUser from '@/actions/getCurrentUser';
export async function PATCH(
    req : Request,
    { params } : { params : { userId : string }}
) {
    try {

      const values = await req.json();

      const price = await stripe.subscriptions.retrieve('price_1MoBy5LkdIwHu7ixZhnattbh');


        console.log()
            
        //return new NextResponse(JSON.stringify({ url : stripeSession.url }))
    } catch (error) {
        console.log("Fehler beim Stripe Abonnement upgraden", error);
        return new NextResponse("Fehler beim Stripe Abonnement", { status : 500 })
    }
}