
import db from "@/db/drizzle";
import { inserat } from "@/db/schema";
import axios from "axios";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

function calculateDistance(lat1, lon1, lat2, lon2) {
    const r = 6371;
    const p = Math.PI / 180;

    const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2
        + Math.cos(lat1 * p) * Math.cos(lat2 * p) *
        (1 - Math.cos((lon2 - lon1) * p)) / 2;

    return 2 * r * Math.asin(Math.sqrt(a));
}

export async function PATCH(
    req : Request
) {
    try {

        
       
        const values = await req.json();
       
        const { location, amount, category, reqAge, freeMiles,
            //LKW
            lkwBrand, application, loading, drive, weightClass, seats,
            //PKW
            brand, power, fuel, transmission, type, miles, initial, doors, extraCost,
            //TRAILER
            coupling, extraType, axis, brake,
            ...filteredValues} = values;
            
        /*    
        const results = await db.inserat.findMany({
            where : {
                category : category,
                ...filteredValues,
                isPublished : true,

                ...(amount) && {
                    amount : {
                        gte : Number(amount)
                    }
                },
                ...(reqAge) && {
                    reqAge: {
                        lte: Number(reqAge)
                    }
                },
                //PKW-Attribute
                ...(category === "PKW") && {
                    pkwAttribute: {
                        brand: brand,
                        ...(doors) && {
                            doors : Number(doors)
                        },
                        ...(seats) && {
                            seats: {
                                gte: Number(seats)
                            },
                        },
                        fuel: fuel,
                        transmission: transmission,
                        type: type,
                        ...(freeMiles) && {
                            freeMiles: {
                                gte: Number(freeMiles)
                            }
                        
                        },
                        ...(extraCost) && {
                            extraCost: {
                                gte: Number(extraCost)
                            }
                        },
                        ...(power) && {
                            power: {
                                gte: Number(power)
                            }
                        },
                    }
                },
                //LKW-Attribute
                ...(category === "LKW") && {
                    lkwAttribute: {
                        lkwBrand: lkwBrand,
                        ...(weightClass) && {
                            weightClass : Number(weightClass)
                        },
                        ...(seats) && {
                            seats: {
                                gte: Number(seats)
                            },
                        },
                        drive : drive,
                        loading: loading,
                        application : application,
                        
                    }
                    //TRANSPORT-Attribute
                }, ...(category === "TRANSPORT") && {
                    transportAttribute : {
                        ...(seats) && {
                            seats: {
                                gte: Number(seats)
                            },
                        },
                        ...(doors) && {
                            doors : Number(doors)
                        },
                        fuel : fuel,
                        transmission : transmission,
                        loading : loading
                    }
                }, ...(category === "TRAILOR") && {
                    trailerAttribute : {
                        
                        type : type,
                        coupling : coupling,
                        loading : loading,
                        extraType : extraType,
                        ...(brake === undefined) ? {
                            
                        } : {
                            brake : brake === "true" ? true : false
                        },
                        ...(weightClass) && {
                            weightClass : Number(weightClass)
                        },
                        ...(axis) && {
                            axis : Number(axis)
                        }
                    }
                }
            },
            
             include : {
                address : true
            }, 
        })
        */

        const results = await db.query.inserat.findMany({
            where : eq(
                inserat.isPublished, true
            ), with : {
                address : true
            }
        })
        console.log(brake)
        let filteredResult = [];
            
        if(location) {
                const addressObject = await axios.get(`https://geocode.maps.co/search?q=${location}&api_key=${process.env.GEOCODING_API}`);
           
            
            for (const pInserat of results) {
                const distance = calculateDistance(addressObject.data[0].lat, addressObject.data[0].lon, 
                                                    Number(pInserat.address?.latitude), Number(pInserat.address?.longitude));
                                                    console.log(addressObject.data[0].lat)
                                                    console.log(addressObject.data[0].lon)
                                                    console.log(Number(inserat.address?.latitude))
                                                    console.log(Number(inserat.address?.longitude))
                                                    if(distance < 50) {
                                                        filteredResult.push(pInserat);
                                                        console.log(distance)
                                                    }
            }
        } else {
            filteredResult = results;
        }
            
        return NextResponse.json(filteredResult.length);

    } catch(error) {
        console.log(error);
        return new NextResponse(error , { status : 500 })
    }
}