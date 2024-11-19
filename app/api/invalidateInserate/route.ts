'use server'

import db from "@/db/drizzle";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { inserat } from "@/db/schema";
import { addHours, isAfter } from "date-fns";

export async function PATCH() {
    try {
        // Fetch matching Inserate that are published and join with related user and subscription data
        const findMatchingInserate = await db.query.inserat.findMany({
            where: eq(inserat.isPublished, true),
            with: {
                user: {
                    with: {
                        subscription: true
                    }
                }
            }
        });

        const currentDate = new Date();
        const privatizedInserate = [];

        // Privatize Inserate if the user has no subscription or the subscription is expired
        for (const pInserat of findMatchingInserate) {
            // Calculate the comparison date with a 1-hour cooldown period
            const subscriptionEnd = pInserat.user?.subscription?.stripe_current_period_end;
            const comparedDate = subscriptionEnd ? addHours(new Date(subscriptionEnd), 1) : null;

            // Check if the subscription is missing or expired
            if (!subscriptionEnd || isAfter(currentDate, comparedDate)) {
                privatizedInserate.push(pInserat);

                // Update Inserate to mark it as unpublished and not highlighted
                await db.update(inserat).set({
                    isPublished: false,
                    isHighlighted: false,
                }).where(eq(inserat.userId, pInserat.userId));
            }
        }

        console.log(`${privatizedInserate.length} Inserate wurden invalidiert, [/api/invalidateInserate]`);
        return NextResponse.json({ message: "Inserate erfolgreich invalidiert" });

    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
