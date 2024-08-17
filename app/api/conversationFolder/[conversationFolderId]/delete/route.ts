import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { find } from 'lodash';
import db from "@/db/drizzle";
import { and, eq } from "drizzle-orm";
import { conversation, conversationFolder } from "@/db/schema";

export async function DELETE(
    req : Request,
    { params } : { params : { conversationFolderId : string}}
) {
    try {

        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const findConversationFolder = await db.query.conversationFolder.findFirst({
            where : and(
                eq(conversationFolder.id, params.conversationFolderId),
                eq(conversationFolder.userId, currentUser.id)
            )
        })

        if(!findConversationFolder) {
            return new NextResponse("Not Found", { status: 404 });
        }
        
        const deleteConversationFolder = await db.delete(conversationFolder)
            .where(eq(conversationFolder.id, findConversationFolder.id))

        
        return new NextResponse("Konversationsordner gelöscht" , { status: 200 });
            

    } catch(e : any) {
        console.log(e);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}