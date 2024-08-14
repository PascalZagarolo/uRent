

import db from "@/db/drizzle"
import { conversation } from "@/db/schema"
import { eq, or } from "drizzle-orm"
import { cache } from "react"

export const findStartedConversationsGlobal = (async(currentUserId) => {
    const findStartedConversations = db.query.conversation.findMany({
        where: (
            or(
                eq(conversation.user1Id, currentUserId),
                eq(conversation.user2Id, currentUserId)

            )
        ), with: {
            messages: {
                with : {
                    sender : true,
                    inserat : {
                        with : {
                            images : true
                        }
                    }
                }
            },
            lastMessage : true,
            user1: true,
            user2: true,
            blocks: true


        }
    }).prepare("findStartedConversations")

    return await findStartedConversations.execute();
})