import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { userContactprofiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { contactProfileId : string } } 
) {
    try {
        const findContactProfile = await db.query.userContactprofiles.findFirst({
            where : eq(userContactprofiles.id, params.contactProfileId)
        })

        if (!findContactProfile) {
            return new NextResponse('Kontaktprofil nicht gefunden.', { status: 404 });
        }

        const currentUser = await getCurrentUser();

        if (findContactProfile.userId !== currentUser.id || !currentUser) {
            return new NextResponse('Du hast keine Berechtigung für diese Aktion.', { status: 403 });
        }

        const values = await req.json();

        const [patchInserat] = await db.update(userContactprofiles).set({
            ...values
        })
        .where(eq(userContactprofiles.id, params.contactProfileId))
        .returning()

        return NextResponse.json(patchInserat);

    } catch(e : any) {
        console.log(e);
        return new NextResponse('Ein Fehler ist aufgetreten. Bitte versuche es erneut.', { status: 500 });
    }
}