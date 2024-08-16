import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { NextResponse } from "next/server";
import { conversation, conversationFolder, folderOnConversation } from '../../../../db/schema';
import { eq } from "drizzle-orm";

export async function PATCH(
    req : Request,
    { params } : { params : { conversationFolderId : string }}
) {
    try {

        const currentUser = await getCurrentUser();

        console.log(params.conversationFolderId)

        let returnedConversations = [];

        if(!currentUser) {
            return new NextResponse("Nicht autorisiert", { status : 401})
        }

        const receivedConversations = await req.json();

        const findFolder = await db.query.conversationFolder.findFirst({
            where : eq(
                conversationFolder.id, params.conversationFolderId
            )
        })

        const connectedConversations = await db.query.folderOnConversation.findMany({
            where : eq(
                folderOnConversation.folderId, findFolder.id
            )
        })
        

        for (const pConversation of receivedConversations) {
            
            if(connectedConversations.find((c : any) => c.conversationId === pConversation)) {
                console.log("already connected")
            } else {
                const [createdConnection] : any = await db.insert(folderOnConversation).values({
                    conversationId : pConversation,
                    userId : currentUser.id,
                    folderId : findFolder.id
                }).returning();
    
                console.log(createdConnection)
    
                returnedConversations.push(createdConnection)
            }
            
            
        }

        console.log(returnedConversations)

        return NextResponse.json(returnedConversations);
        

    } catch(e : any) {
        console.log(e);
        return new NextResponse("Internal Server Error", { status : 500 })
    }
}