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
    periodBegin? : string;
    periodEnd? : string;
}

export const getInserate = async ({
    title,
    category,
    filter,
    start,
    end,
    page,
    periodBegin,
    periodEnd
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
                    OR : [
                        {
                            begin : {
                                lte : periodBegin,
                                gte : periodEnd
                            
                            }, end : {
                                lte : periodBegin,
                                gte : periodEnd
                            }
                        }, {
                            annual : true
                        }
                    ]
                    
                }, include : {
                    images : true,
                    user: true
                }, orderBy : {
                    views : "desc"
                }
            })

            

            return inserate.splice(0, 16);
        } else {
            const inserate = await db.inserat.findMany({
                where : {
                    isPublished : true,
                    title : {
                        contains : title,
                        mode: 'insensitive'
                    },
                    category : category,
                    price : {
                        gte : start? start : 0,
                        lte : end? end : 1000000,
                    },  OR : [
                        {
                            begin : {
                                lte : periodBegin,
                                gte : periodEnd
                            
                            }, end : {
                                lte : periodBegin,
                                gte : periodEnd
                            }
                        }, {
                            annual : true
                        }
                    ]
                    
                }, include : {
                    images : true,
                    user: true
                }, orderBy : {
                    price : filter === "asc" ? "asc" : "desc"
                }
            })

            

            return inserate.splice(0, 16);
        }

        
        
        
    } catch {
        console.log("Fehler beim erhalten der Inserate");
        return [];
    }
}