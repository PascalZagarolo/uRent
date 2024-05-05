import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { savedSearch } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { savedSearchId : string}}
) {
    try {

        

        const findSavedSearch = await db.query.savedSearch.findFirst({
            where : (
                eq(savedSearch.id, params.savedSearchId)
            )
        })

        const currentUser = await getCurrentUser();

        if(!currentUser || currentUser.id !== findSavedSearch.userId) return new NextResponse("Nicht autorisiert", { status: 401});

        const values = await req.json()

        

        const patchSavedSearch = await db.update(savedSearch).set({
            receivesUpdates : values.checkAvailability,
            receiveAvailability : values.checkAvailability
        }).where(eq(savedSearch.id, params.savedSearchId)).returning();

        return NextResponse.json(patchSavedSearch);

    } catch(error : any) {
        console.log("Fehler beim Ändern der Suche", error);
        return new NextResponse("Fehler beim Ändern der Suche", { status: 500})
    }
}