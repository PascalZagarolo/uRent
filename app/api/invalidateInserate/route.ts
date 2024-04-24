import db from "@/db/drizzle";
import { NextResponse } from "next/server";
import { inserat } from '../../../db/schema';
import { eq } from "drizzle-orm";

export async function GET(
    req : Request,
) {
    try {

        const findMatchingInserate = await db.query.inserat.findMany({
            where : (
                eq(inserat.isPublished, true)
            ),
            with : {
                user :  {
                    with : {
                        subscription : true
                    }
                }
            }
        })

        console.log("sadas")

        const currentDate = new Date();

        //privatize every inserat where user has no subscriptions
        for (const pInserat of findMatchingInserate) {
            if(!inserat.user?.subscription || inserat.user?.subscription?.stripe_current_period_end < currentDate) {
                
                const updateInserate = await db.update(inserat).set({
                    isPublished : false,
                }).where(eq(inserat.userId, pInserat.userId))
            }
        }

        return new NextResponse("Inserate successfully invalidated", { status: 200 });

    } catch(error : any) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}