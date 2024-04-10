import db from "@/db/drizzle";
import { business, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { profileId : string }}
) {
    try {
        
        const updatedProfile = await db.update(users).set({
            isBusiness : true
        }).where(eq(users.id, params.profileId)).returning();

        const findBusiness = await db.query.business.findFirst({
            where : eq(business.userId, params.profileId)
        });

        if(!findBusiness) {
            const createdBusiness = await db.insert(business).values({
                userId : params.profileId
            }).returning();

            const patchedUser = await db.update(users).set({
                businessId : createdBusiness[0].id
            }).where(eq(users.id, params.profileId)).returning();

            return NextResponse.json({
                patchedUser, createdBusiness
            });
        }
        
        return NextResponse.json(updatedProfile)
    } catch (error) {
        console.log(error);
        return new NextResponse ("Interner Server Error" , { status : 500 })
    }
}