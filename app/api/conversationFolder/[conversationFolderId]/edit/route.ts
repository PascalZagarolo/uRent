import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { conversationFolder } from '../../../../../db/schema';
import db from "@/db/drizzle";
import { and, eq } from "drizzle-orm";

export async function PATCH(
    req : Request,
    { params } : { params : { conversationFolderId : string }}
) {
    try {

        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return new NextResponse("Nicht autorisiert", { status : 401})
        }

        const findFolder = await db.query.conversationFolder.findFirst({
            where : 
                and(
                    eq(conversationFolder.id, params.conversationFolderId),
                    eq(conversationFolder.userId, currentUser.id)
                )
        })

        if(!findFolder) {
            return new NextResponse("Conversation Folder nicht gefunden", { status : 404})
        }

        const values = await req.json();


        const patchFolder = await db.update(conversationFolder).set({
            ...values
        })
        .where(eq(conversationFolder.id, params.conversationFolderId))
        .returning();

        return NextResponse.json(patchFolder);

    } catch(e : any) {
        console.log(e);
        return new NextResponse("Internal Server Error", { status : 500})
    }
}