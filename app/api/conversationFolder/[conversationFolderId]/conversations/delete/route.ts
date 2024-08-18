
import getCurrentUser from '@/actions/getCurrentUser';
import db from '@/db/drizzle';
import { conversationFolder, folderOnConversation } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
export async function PATCH(
    req : Request,
    { params } : { params : { conversationFolderId : string}}
) {
    try {

        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return new NextResponse("Unauthorized", { status : 401})
        }

        const receivedConversations = await req.json();

        const foundFolder = await db.query.conversationFolder.findFirst({
            where : and(
                eq(conversationFolder.id, params.conversationFolderId),
                eq(conversationFolder.userId, currentUser.id)
            )
        })

        if(!foundFolder) {
            return new NextResponse("Not Found", { status : 404})
        }

        console.log(receivedConversations);

        for(const pConversation of receivedConversations) {
            console.log(pConversation)
            const deleteConversation = await db.delete(folderOnConversation).where(
                and(
                    eq(folderOnConversation.conversationId, pConversation),
                    eq(folderOnConversation.folderId, params.conversationFolderId)
                ))
        }

        return new NextResponse("OK", { status : 200})

    } catch(e : any) {
        console.log(e);
        return new NextResponse("Internal Server Error" , { status : 500})
    }
}