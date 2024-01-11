import { db } from "@/app/utils/db";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(
    req : Request,
    { params } :  { params : { inseratId : string , userId : string }}
) {
    try {


        const user = await db.user.findUnique({
            where : {
                id : params.userId
            }
        })

        const inserat = await db.inserat.findUnique({
            where : {
                id : params.inseratId,
                isPublished : true
            }, 
        })

        const purchase = await db.purchase.findUnique({
            where : {
                inseratId_userId : {
                    inseratId : params.inseratId,
                    userId : params.userId
                 }
            }
        })

        if(purchase) {
            return new NextResponse("Inserat bereits gekauft" , { status : 400 })
        }

        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
            {
                quantity : 1,
                price_data : {
                    currency : "eur",
                    product_data : {
                        name : inserat.title,
                        description : inserat.description!,
                    },
                    unit_amount: Math.round(inserat.price! * 100),
                }
            }
        ];

        let stripeCustomer = await db.stripeCustomer.findUnique({
            where : {
                userId : params.userId
            }, select : {
                stripeCustomerId : true  
            }
        })

        if(!stripeCustomer) {
            const customer = await stripe.customers.create({
                email : user.email,
            });

            stripeCustomer = await db.stripeCustomer.create({
                data : {
                    userId : params.userId,
                    stripeCustomerId : customer.id  
                }
            })
        }

        const session = await stripe.checkout.sessions.create({
            customer : stripeCustomer.stripeCustomerId,
            line_items,
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/inserat/${params.inseratId}?success=1`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/inserat/${params.inseratId}?canceled=1`,
            metadata : {
                inseratId : params.inseratId,
                userId : params.userId
            }
        });

        return NextResponse.json({ url : session.url})

    } catch(error) {
        console.log("Fehler beim Checkout");
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}