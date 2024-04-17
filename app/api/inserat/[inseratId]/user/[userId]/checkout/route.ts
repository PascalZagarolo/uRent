
import db from "@/db/drizzle";
import { inserat, purchase, stripeCustomer, userTable } from "@/db/schema";
import { stripe } from "@/lib/stripe";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(
    req : Request,
    { params } :  { params : { inseratId : string , userId : string }}
) {
    try {


        const thisUser = await db.query.userTable.findFirst({
            where : (
                eq(userTable.id, params.userId)
            )
        })

        const thisInserat = await db.query.inserat.findFirst({
            where : (
                and(
                    eq(inserat.id, params.inseratId),
                    eq(inserat.isPublished, true)
                )
                
            )
        })

        const existingPurchase = await db.query.purchase.findFirst({
            where : (
                and(
                    eq(purchase.inseratId, thisInserat.id),
                    eq(purchase.userId, thisUser.id)
                )
            )
        })

        if(existingPurchase) {
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

        let thisCustomer: typeof stripeCustomer.$inferSelect = await db.query.stripeCustomer.findFirst({
            where : (
                eq(stripeCustomer.userId, thisUser.id)
            ), with : {
                stripeCustomer : true
            }
        })

        if(!thisCustomer) {
            
            const customer = await stripe.customers.create({
                email : thisUser.email
            
            })

            const createdCustomer = await db.insert(stripeCustomer).values({
                userId : params.userId,
                stripeCustomerId : customer.id,
                createdAt : new Date(),
                updatedAt : new Date(),
            }).returning();
        }

        const session = await stripe.checkout.sessions.create({
            customer : thisCustomer.stripeCustomerId,
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