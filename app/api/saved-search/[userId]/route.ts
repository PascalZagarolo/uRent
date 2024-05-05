import db from "@/db/drizzle";
import { savedSearch } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(
    req : Request,
    { params } : { params : { userId : string}}
) {
    try{

        const values = await req.json();

        const [createdSavedSearch] = await db.insert(savedSearch).values({
            userId : params.userId,
            title : values.title,
            link : values.link
        }).returning()

        return NextResponse.json(createdSavedSearch);

    } catch(error : any) {
        console.log("Fehler beim kreeiren der Suche", error);
        return new NextResponse("Fehler beim kreeiren der Suche", { status: 500})
    }
}