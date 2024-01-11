import { db } from "@/app/utils/db";
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
                    unit_amount: Math.round(inserat.price * 100),
                }
            }
        ]

    } catch(error) {
        console.log("Fehler beim Checkout");
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}