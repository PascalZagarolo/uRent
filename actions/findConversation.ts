import { db } from "@/utils/db"

const findConversation = async (user1: string, user2: string) => { 
    const existingConversation  = await db.conversation.findFirst({
        where : {
            userIds : {
                hasEvery : [user1 , user2]
              
            }
        } 
    })
    console.log(existingConversation.id)
    return existingConversation.id;
}

export default findConversation;