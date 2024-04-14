
import db from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { profileId : string }}
) {
    try {

        const values = await req.json();

        const updatedProfile : any = await db.update(users).set({
        ...values
        }).where(eq(users.id, params.profileId)).returning()
        console.log(updatedProfile)
        return NextResponse.json(updatedProfile[0])

    } catch (error) {
        console.log(error);
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}