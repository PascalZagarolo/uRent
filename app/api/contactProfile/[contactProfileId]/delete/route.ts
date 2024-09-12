import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { userContactprofiles } from "@/db/schema";
import { user } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

import { NextResponse } from "next/server";

export async function DELETE(
    req : Request,
    { params } : { params : { contactProfileId : string } }
) {
    try {

        const findProfile = await db.query.userContactprofiles.findFirst({
            where : eq(userContactprofiles.id, params.contactProfileId)
        })

        if(!findProfile) {
            return new NextResponse("Kontaktprofil nicht gefunden.", { status : 404 })
        }

        const currentUser = await getCurrentUser();

        if(!currentUser || findProfile.userId !== currentUser.id) {
            return new NextResponse("Du hast keine Berechtigung für diese Aktion.", { status : 403 })
        }

        const [deletedProfile] = await db.delete(userContactprofiles).where(eq(userContactprofiles.id, params.contactProfileId)).returning();

        return NextResponse.json(deletedProfile);

    } catch(e : any) {
        console.log(e);
        return new NextResponse("Internal Server Error", { status : 500 })
    }
}