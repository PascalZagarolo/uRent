

import { db } from "@/utils/db";
import { Images, Inserat, User } from "@/node_modules/@prisma/client";


type InserateWithImages = Inserat & {
    images : Images[];
    user: User;
    
}

type GetInserate = {   
    title? : string
}

export const getInserate = async ({
    title
} : GetInserate ): Promise<InserateWithImages[]> => {
    try {
        const inserate = await db.inserat.findMany({
            where : {
                isPublished : true,
                title : {
                    contains : title
                }
            }, include : {
                images : true,
                user: true
            }
        })

        return inserate;
        
    } catch {
        console.log("Fehler beim erhalten der Inserate");
        return [];
    }
}