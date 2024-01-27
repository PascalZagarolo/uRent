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
    page? : number;
}

export const getInserate = async ({
    title,
    category,
    filter,
    start,
    end,
    page
} : GetInserate ): Promise<InserateWithImages[]> => {
    try {

        

        if(filter === "relevance") {
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
                    views : "desc"
                }
            })

            if(page) {
                return inserate.splice((page - 1) * 8, (page * 8) + 8)
            }

            return inserate.splice(0, 8);
        } else {
            const inserate = await db.inserat.findMany({
                where : {
                    isPublished : true,
                    title : {
                        contains : title,
                        mode: 'insensitive'
                    },
                    category : category,
                    
                }, include : {
                    images : true,
                    user: true
                }, orderBy : {
                    price : filter === "asc" ? "asc" : "desc"
                }
            })

            if(page) {
                return inserate.splice((page - 1) * 8, (page * 8) + 8)
            }

            return inserate.splice(0, 8);
        }

        
        
        
    } catch {
        console.log("Fehler beim erhalten der Inserate");
        return [];
    }
}