import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { savedSearch } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(
    req : Request,
    { params } : { params : { savedSearchId : string}}
) {
    try {

        

        const findSearch = await db.query.savedSearch.findFirst({
            where : (
                eq(savedSearch.id, params.savedSearchId)
            )
        })

        if(!findSearch) return new NextResponse("Suche nicht gefunden", { status: 404 })

        const currentUser = await getCurrentUser();

        if(!currentUser || currentUser.id !== findSearch.userId) {
            return new NextResponse("Nicht autorisiert",  { status: 401 })
        }

        const [deletedSearch] = await db.delete(savedSearch).where(
            eq(savedSearch.id, params.savedSearchId)
        ).returning()


        return NextResponse.json(deletedSearch);
        

    } catch(error : any) {
        console.log("Fehler beim Löschen der Suche" , error);
        return new NextResponse("Fehler beim Löschen der Suche", { status: 500 })
    }
}