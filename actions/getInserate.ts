

import { db } from "@/utils/db";
import { Images, Inserat, LkwBrand, User } from "@prisma/client";
import type { Address, ApplicationType, CarBrands, CarType, Category, DriveType, 
FuelType, LkwAttribute, LoadingType, PkwAttribute, TrailerAttribute, Transmission, TransportAttribute } from "@prisma/client";
import axios from "axios";





type InserateImagesAndAttributes = Inserat & {
    user: User;
    images: Images[];
    address: Address;
    pkwAttribute: PkwAttribute;
    lkwAttribute: LkwAttribute;
    trailerAttribute : TrailerAttribute;
    transportAttribute : TransportAttribute;
}

type GetInserate = {
    title?: string;
    category?: Category;
    filter?: string;
    start?: number;
    end?: number;
    page?: number;
    periodBegin?: string;
    periodEnd?: string;
    location?: string;
    amount? : number;
    //conditions

    reqAge?: number;
    reqLicense?: string;

    //PKW
    brand?: CarBrands;
    doors?: number;
    initial?: Date;
    power?: number;
    seats?: number;
    fuel?: FuelType;
    transmission?: Transmission;
    type?: CarType;
    freeMiles?: number;
    extraCost?: number;

    //LKW
    weightClass? : number;
    drive? : DriveType;
    loading? : LoadingType;
    application? : ApplicationType;
    lkwBrand? : LkwBrand;
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
    location,
    amount,

    reqAge,
    reqLicense,

    brand,
    doors,
    initial,
    power,
    seats,
    fuel,
    transmission,
    type,
    freeMiles,
    extraCost,

    weightClass,
    drive,
    loading,
    application,
    lkwBrand
}: GetInserate): Promise<InserateImagesAndAttributes[]> => {



    try {

        if (filter === "relevance") {
            const inserate = await db.inserat.findMany({
                where: {
                    isPublished: true,
                    title: {
                        contains: title
                    },
                    category: category,
                    ...(periodBegin || periodEnd) && {
                        OR: [
                            {
                                begin: {

                                    gte: periodBegin

                                }, end: {
                                    lte: periodEnd

                                }
                            }, {
                                annual: true
                            }
                        ]
                    },
                    ...(amount) && {
                        amount : {
                            lte : amount
                        }
                    },
                    ...(reqAge) && {
                        reqAge: {
                            lte: reqAge
                        }
                    },
                    //PKW-Attribute
                    ...(category === "PKW") && {
                        pkwAttribute: {
                            brand: brand,
                            ...(doors) && {
                                doors : doors
                            },
                            ...(seats) && {
                                seats: {
                                    gte: seats
                                },
                            },
                            fuel: fuel,
                            transmission: transmission,
                            type: type,
                            ...(freeMiles) && {
                                freeMiles: {
                                    gte: freeMiles
                                }
                            
                            },
                            ...(extraCost) && {
                                extraCost: {
                                    gte: extraCost
                                }
                            },
                            ...(power) && {
                                power: {
                                    gte: power
                                }
                            },
                        }
                    }
                    
                }, include: {
                    images: true,
                    user: true,
                    pkwAttribute: true,
                    lkwAttribute: true,
                    trailerAttribute : true,
                    transportAttribute : true,
                    address: true
                }, orderBy: {
                    views: "desc"
                }
            })
            let filteredArray = [];

            if (location) {
                const addressObject = await axios.get(`https://geocode.maps.co/search?q=${location}&api_key=${process.env.GEOCODING_API}`);


                for (const inserat of inserate) {
                    const distance = calculateDistance(addressObject.data[0].lat, addressObject.data[0].lon,
                        Number(inserat.address?.latitude), Number(inserat.address?.longitude));
                    console.log(distance);
                    if (distance < 50) {
                        filteredArray.push(inserat);
                    }
                }
            } else {
                filteredArray = inserate;
            }

            return filteredArray;

        } else {
            const inserate = await db.inserat.findMany({
                where: {
                    isPublished: true,
                    title: {
                        contains: title,
                        mode: 'insensitive'
                    },
                    category: category,
                    price: {
                        gte: start ? start : 0,
                        lte: end ? end : 1000000,
                    }, ...(periodBegin || periodEnd) && {
                        OR: [
                            {
                                begin: {
                                    gte: periodBegin

                                }, end: {
                                    lte: periodEnd
                                }
                            }, {
                                annual: true
                            }
                        ]
                    },
                    ...(amount) && {
                        amount : {
                            gte : amount
                        }
                    },
                    ...(reqAge) && {
                        reqAge: {
                            lte: reqAge
                        }
                    },
                    //PKW-Attribute
                    ...(category === "PKW") && {
                        pkwAttribute: {
                            brand: brand,
                            ...(doors) && {
                                doors : doors
                            },
                            ...(seats) && {
                                seats: {
                                    gte: seats
                                },
                            },
                            fuel: fuel,
                            transmission: transmission,
                            type: type,
                            ...(freeMiles) && {
                                freeMiles: {
                                    gte: freeMiles
                                }
                            
                            },
                            ...(extraCost) && {
                                extraCost: {
                                    gte: extraCost
                                }
                            },
                            ...(power) && {
                                power: {
                                    gte: power
                                }
                            },
                        }
                    },
                    //LKW-Attribute
                    ...(category === "LKW") && {
                        lkwAttribute: {
                            lkwBrand: lkwBrand,
                            ...(weightClass) && {
                                weightClass : weightClass
                            },
                            ...(seats) && {
                                seats: {
                                    gte: seats
                                },
                            },
                            drive : drive,
                            loading: loading,
                            application : application,
                            
                        }
                    }

                }, include: {
                    images: true,
                    user: true,
                    pkwAttribute: true,
                    lkwAttribute: true,
                    trailerAttribute : true,
                    transportAttribute : true,
                    address: true
                }, orderBy: {
                    price: filter === "asc" ? "asc" : "desc"
                }
            })
            console.log(seats)


            let filteredArray = [];

            if (location) {
                const addressObject = await axios.get(`https://geocode.maps.co/search?q=${location}&api_key=${process.env.GEOCODING_API}`);

                for (const inserat of inserate) {
                    const distance = calculateDistance(addressObject.data[0].lat, addressObject.data[0].lon,
                        Number(inserat.address?.latitude), Number(inserat.address?.longitude));
                    console.log(addressObject.data[0].lat)
                    console.log(addressObject.data[0].lon)
                    console.log(distance);
                    if (distance < 50) {
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