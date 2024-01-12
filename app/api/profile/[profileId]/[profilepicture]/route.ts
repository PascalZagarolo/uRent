import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { profileId : string }}
) {
    try {
        const body = await req.json();

        const image = body.image

        const patchedProfile = await db.user.update({
            where : {
                id : params.profileId
            }, data : {
                image : image
            }
        })

        return NextResponse.json(patchedProfile);
    } catch (error) {
        console.log("Fehler beim Profilbild hochladen : ", error);
        return new NextResponse("Interner Server Error", { status : 500 })
    }
}