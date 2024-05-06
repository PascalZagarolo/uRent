import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { savedSearch } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(
    req : Request,
    { params } : { params : { userId : string}}
) {
    try{

        const values = await req.json();

        const currentUser = await getCurrentUser();

        if(!currentUser || currentUser.id !== params.userId) {
            return new NextResponse("Nicht authorisiert", { status: 401})
        }

        const [createdSavedSearch] = await db.insert(savedSearch).values({
            userId : params.userId,
            title : values.title,
            link : values.link,
            receiveAvailability : values.checkAvailability,
            receivesUpdates : values.getUpdates,
        }).returning()

        return NextResponse.json(createdSavedSearch);

    } catch(error : any) {
        console.log("Fehler beim kreeiren der Suche", error);
        return new NextResponse("Fehler beim kreeiren der Suche", { status: 500})
    }
}