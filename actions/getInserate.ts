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
                    price : {
                        gte : start? start : 0,
                        lte : end? end : 1000000,
                    }, OR : [
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