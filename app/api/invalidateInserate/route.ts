'use server'

import db from "@/db/drizzle";
import { NextResponse } from "next/server";

import { eq } from "drizzle-orm";
import { inserat } from "@/db/schema";


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

        //privatize all inserate that are published and the user has no subscription or the subscription is expired
        for (const pInserat of findMatchingInserate) {
            if(!pInserat.user?.subscription || pInserat.user?.subscription.length === 0 || 
                pInserat.user?.subscription?.stripe_current_period_end < currentDate) {
                    await db.update(inserat).set({
                        isPublished : false,
                        isHighlighted : false,
                        
                    }).where(eq(inserat.userId , pInserat.userId))
                }

                
        }


        //Todo : Add checks whether capabilities are available or not do it by person
    
               
            
                

        return NextResponse.json({ message: "Inserate erfolgreich invalidiert" });

    } catch(error : any) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}