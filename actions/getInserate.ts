

import { db } from "@/utils/db";
import { Images, Inserat, User } from "@prisma/client";
import type { Address, Category, LkwAttribute, PkwAttribute } from "@prisma/client";
import axios from "axios";




type InserateImagesAndAttributes = Inserat & {
    user : User;
    images : Images[];
    pkwAttribute : PkwAttribute;
    lkwAttribute : LkwAttribute;
    address : Address;

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
    location? : string
}

//returns km
function calculateDistance(lat1, lon1, lat2, lon2) {
    const r = 6371; 
    const p = Math.PI / 180;
  
    const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2
                  + Math.cos(lat1 * p) * Math.cos(lat2 * p) *
                    (1 - Math.cos((lon2 - lon1) * p)) / 2;
  
    return 2 * r * Math.asin(Math.sqrt(a));
  }



export const getInserate = async ({
    title,
    category,
    filter,
    start,
    end,
    page,
    periodBegin,
    periodEnd,
    location
} : GetInserate ): Promise<InserateImagesAndAttributes[]> => {
    

    
    try {
        //!implement switch statements later
        if(filter === "relevance") {
            const inserate = await db.inserat.findMany({
                where : {
                    isPublished : true,
                    title : {
                        contains : title
                    },
                    category : category,
                    ...(periodBegin || periodEnd) ? {
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
                    } : {}
                    
                }, include : {
                    images : true,
                    user: true,
                    pkwAttribute : true,
                    lkwAttribute : true,
                    address : true
                }, orderBy : {
                    views : "desc"
                }
            })
            let filteredArray = [];

            if(location) {
                const addressObject = await axios.get(`https://geocode.maps.co/search?q=${location}&api_key=${process.env.GEOCODING_API}`);
                

                for (const inserat of inserate) {
                    const distance = calculateDistance(addressObject.data[0].lat, addressObject.data[0].lon, 
                                                        Number(inserat.address?.latitude), Number(inserat.address?.longitude));
                                                        console.log(distance);
                                                        if(distance < 50) {
                                                            filteredArray.push(inserat);
                                                        }
                }
            } else {
                filteredArray = inserate;
            }
            
            return filteredArray;
            
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
                    }, ...(periodBegin || periodEnd) ? {
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
                    } : {}   
                }, include : {
                    images : true,
                    user: true,
                    pkwAttribute : true,
                    lkwAttribute : true,
                    address : true
                }, orderBy : {
                    price : filter === "asc" ? "asc" : "desc"
                }
            })
            
            

            let filteredArray = [];
            
            if(location) {
                const addressObject = await axios.get(`https://geocode.maps.co/search?q=${location}&api_key=${process.env.GEOCODING_API}`);
                
                for (const inserat of inserate) {
                    const distance = calculateDistance(addressObject.data[0].lat, addressObject.data[0].lon, 
                                                        Number(inserat.address?.latitude), Number(inserat.address?.longitude));
                                                        console.log(addressObject.data[0].lat)
                                                        console.log(addressObject.data[0].lon)
                                                        console.log(distance);
                                                        if(distance < 50) {
                                                            filteredArray.push(inserat);
                                                        }
                }
            } else {
                filteredArray = inserate;
            }
            
            return filteredArray;
        }
    } catch {
        console.log("Fehler beim erhalten der Inserate");
        return [];
    }
}