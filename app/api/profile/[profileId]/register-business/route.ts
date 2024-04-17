import db from "@/db/drizzle";
import { business, userTable  } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { profileId : string }}
) {
    try {
        
        const updatedProfile = await db.update(userTable).set({
            isBusiness : true
        }).where(eq(userTable.id, params.profileId)).returning();

        const findBusiness = await db.query.business.findFirst({
            where : eq(business.userId, params.profileId)
        });

        if(!findBusiness) {
            const createdBusiness : any = await db.insert(business).values({
                userId : params.profileId
            }).returning();

            const patchedUser = await db.update(userTable).set({
                businessId : createdBusiness[0].id
            }).where(eq(userTable.id, params.profileId)).returning();

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