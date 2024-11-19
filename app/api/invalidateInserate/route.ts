'use server'

import db from "@/db/drizzle";
import { NextResponse } from "next/server";

import { eq } from "drizzle-orm";
import { inserat } from "@/db/schema";
import { addHours, isAfter } from "date-fns";


export async function PATCH(
    
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
        
        const currentDate = new Date();
        const privatizedInserate : typeof inserat.$inferSelect = [];

        //privatize all inserate that are published and the user has no subscription or the subscription is expired
        for (const pInserat of findMatchingInserate) {
            //add 1 hour to the current date to make sure that the subscription is still valid and give it a cooldown of 1 hour
            const comparedDate = addHours(new Date(pInserat.user?.subscription?.stripe_current_period_end),1);
            if(!pInserat.user?.subscription || pInserat.user?.subscription.length === 0 || 
                
                isAfter(currentDate, comparedDate)) {
                    privatizedInserate.push(pInserat); 
                    await db.update(inserat).set({
                        isPublished : false,
                        isHighlighted : false,
                    }).where(eq(inserat.userId , pInserat.userId))
                }

                
        }
        console.log(privatizedInserate?.length + " Inserate wurden invalidiert, [/api/invalidateInserate]");
        return NextResponse.json({ message: "Inserate erfolgreich invalidiert" });

    } catch(error : any) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}