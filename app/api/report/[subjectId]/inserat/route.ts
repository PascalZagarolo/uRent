import db from "@/db/drizzle";
import { report } from "@/db/schema";

import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(
    req : Request,
    { params } : { params : { subjectId : string }}
) {
    try {
        const values = await req.json();

        const currentUser = await getCurrentUser();
       

        const createReport = await db.insert(report).values({
            ...values,
            inseratId : params.subjectId,
            ...(currentUser) && {
                userId : currentUser.id
            }
        }).returning();

        return NextResponse.json(createReport);
    } catch (error) {
        console.log(error);
        return new NextResponse("Fehler beim melden der Anzeige" , { status : 500 })
    }
}