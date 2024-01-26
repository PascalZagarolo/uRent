import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { profileId : string }}
) {
    try {

        const values = await req.json();

        const updatedProfile = await db.user.update({
            where : {
                id : params.profileId
            }, data : {
                ...values
            }
        })

        return NextResponse.json(updatedProfile)

    } catch (error) {
        console.log(error);
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}