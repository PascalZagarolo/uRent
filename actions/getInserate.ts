import { db } from "@/utils/db";
import { Images, Inserat, User } from "@prisma/client";
import type { Category } from "@prisma/client";



type InserateWithImages = Inserat & {
    images : Images[];
    user: User;
    
}

type GetInserate = {   
    title? : string;
    category? : Category;
    filter? : string;
    start? : number;
    end? : number;
}

export const getInserate = async ({
    title,
    category,
    filter,
    start,
    end
} : GetInserate ): Promise<InserateWithImages[]> => {
    try {
        const inserate = await db.inserat.findMany({
            where : {
                isPublished : true,
                title : {
                    contains : title
                },
                category : category,
                
            }, include : {
                images : true,
                user: true
            }, orderBy : {
                price : filter === "asc" ? "asc" : "desc"
            }
        })

        return inserate;
        
    } catch {
        console.log("Fehler beim erhalten der Inserate");
        return [];
    }
}