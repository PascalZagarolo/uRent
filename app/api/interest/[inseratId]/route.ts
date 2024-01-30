import { db } from "@/utils/db";
import { NextResponse } from "next/server";
import getCurrentUser from '@/actions/getCurrentUser';

export async function POST(
    req : Request,
    { params } : { params : { inseratId : string }}
) {
    try {
        
        const  { text } = await req.json()

        const inserat = await db.inserat.findUnique({
            where : {
                id : params.inseratId
            }
        })

        const inseratOwner = await db.user.findUnique({
            where : {
                id : inserat.userId
            }
        })

        const currentUser = await getCurrentUser();

        if (inseratOwner.id === currentUser.id) {
            return new NextResponse("You can't interest your own inserat", { status: 403 })
        }

        const existingConversation  = await db.conversation.findFirst({
            where : {
                userIds : {
                    hasEvery : [inseratOwner.id , currentUser.id]
                }
            }
        })

        if(!existingConversation) {
            const createdConversation = await db.conversation.create({
                data : {
                    userIds : [inseratOwner.id , currentUser.id],
                
                }
            })

            const createMessage = await db.messages.create({
                data : {
                    conversationId : createdConversation.id,
                    senderId : currentUser.id,
                    content : text,
                    isInterest : true,
                    inseratId : inserat.id
                }
            })

            return NextResponse.json({createdConversation , createMessage})
        } else {
            const createMessage = await db.messages.create({
                data : {
                    conversationId : existingConversation.id,
                    senderId : currentUser.id,
                    content : text,
                    isInterest : true,
                    inseratId : inserat.id
                }
            })

            return NextResponse.json(createMessage)
        }

        

    } catch (error) {
        console.log(error);
        return new NextResponse("Interner Server Error", { status: 500 })
    }
}