import db from "@/db/drizzle";
import { savedSearch } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
    
) {
    try {
       
        const foundSavedSearches = await db.query.savedSearch.findMany({
           where: (
            eq(savedSearch.receivesUpdates, true)
           )
        })

    } catch(error : any) {
        console.log("Fehler beim Löschen der Suche" , error);
        return new NextResponse("Fehler beim Löschen der Suche", { status: 500 })
    }
}