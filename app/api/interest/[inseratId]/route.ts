
import { NextResponse } from "next/server";
import getCurrentUser from '@/actions/getCurrentUser';
import { pusherServer } from "@/lib/pusher";
import db from "@/db/drizzle";
import { and, eq, or } from "drizzle-orm";
import { conversation, inserat, message } from "@/db/schema";

export async function POST(
    req: Request,
    { params }: { params: { inseratId: string } }
) {
    try {

        const values = await req.json();

        console.log(values);

        const thisInserat = await db.query.inserat.findFirst({
            where: (
                eq(inserat.id, params.inseratId)
            ), with: {
                user: true
            }
        })

        console.log(1)

        const currentUser = await getCurrentUser();

        if (thisInserat.user.id === currentUser.id) {
            return new NextResponse("You can't interest your own inserat", { status: 403 })
        }

        console.log(1)

        const createdConversation = await db.query.conversation.findFirst({
            where: (
                or(
                    and(
                        eq(conversation.user1Id, thisInserat.user.id),
                        eq(conversation.user2Id, currentUser.id),
                        values?.inseratId ? eq(conversation.inseratId, values?.inseratId) : undefined
                    ), and(
                        eq(conversation.user2Id, thisInserat.user.id),
                        eq(conversation.user1Id, currentUser.id),
                        values?.inseratId ? eq(conversation.inseratId, values?.inseratId) : undefined
                    )
                )
            ), with : {
                lastMessage : true
            }
        })
        
        if(createdConversation && 
            createdConversation?.lastMessage?.isInterest && createdConversation?.lastMessage?.senderId === currentUser.id && 
            createdConversation?.lastMessage?.inseratId === thisInserat.id) {
                console.log("...")
            return NextResponse.json(createdConversation?.id)
        }


        if (!createdConversation) {
            console.log(1)
            const createdConversation = await db.insert(conversation).values({
                user1Id: currentUser.id,
                user2Id: thisInserat.user.id,
                inseratId: values?.inseratId ? values?.inseratId : null
            }).returning()

            const [createMessage] : any = await db.insert(message).values({
                conversationId: createdConversation[0].id,
                senderId: currentUser.id,
                content: values?.text,
                isInterest: true,
                inseratId: thisInserat.id
            }).returning();

            await db.update(conversation).set({
                message : createMessage,
                lastMessageId : createMessage.id
            }).where(eq(conversation.id, createdConversation[0].id))

            const messageObject = {
                ...createMessage,
                sender : {
                    id : currentUser.id,
                    name : currentUser.name,
                    image : currentUser.image
                }, inserat : {
                    id : thisInserat?.id,
                    title : thisInserat?.title
                }
            }

            await pusherServer.trigger(createdConversation[0].id, 'messages:new', messageObject);

            return NextResponse.json(createdConversation[0].id)
        } else {
            
            const [createMessage] : any = await db.insert(message).values({
                conversationId: createdConversation.id,
                senderId: currentUser.id,
                content: values?.text,
                isInterest: true,
                inseratId: thisInserat.id
            }).returning();
            
            

            await db.update(conversation).set({
                message : createMessage,
                lastMessageId : createMessage.id
            }).where(eq(conversation.id, createdConversation.id))

            const messageObject = {
                ...createMessage,
                sender : {
                    id : currentUser.id,
                    name : currentUser.name,
                    image : currentUser.image
                },
                inserat : {
                    id : thisInserat?.id,
                    title : thisInserat?.title
                }
            }

            await pusherServer.trigger(createdConversation.id, 'messages:new', messageObject);

            return NextResponse.json(createdConversation?.id)
        }



    } catch (error) {
        console.log(error);
        return new NextResponse("Interner Server Error", { status: 500 })
    }
}