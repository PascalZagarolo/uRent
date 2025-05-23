
import db from "@/db/drizzle";
import { userTable } from "@/db/schema";
import { lucia } from "@/lib/lucia";

import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { profileId : string }}
) {
    try {

        const values = await req.json();

        const updatedProfile : any = await db.update(userTable).set({
        ...values
        }).where(eq(userTable.id, params.profileId)).returning()
        
        

        if(typeof values.enableSocialLogin !== 'undefined' && values.enableSocialLogin === false) {
            
           await lucia.invalidateUserSessions(params.profileId);
        }

        return NextResponse.json(updatedProfile[0])

        
    } catch (error) {
        console.log(error);
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}