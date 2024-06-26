
import db from "@/db/drizzle";
import { userTable } from "@/db/schema";

import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { profileId : string }}
) {
    try {
        const body = await req.json();

        const image = body.image

        const patchedProfile : any = await db.update(userTable).set({
            image : image
        }).where(eq(userTable.id, params.profileId)).returning();
        console.log(patchedProfile)
        return NextResponse.json(patchedProfile[0]);
    } catch (error) {
        console.log("Fehler beim Profilbild hochladen : ", error);
        return new NextResponse("Interner Server Error", { status : 500 })
    }
}