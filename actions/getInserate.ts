


import db from "@/db/drizzle";
import { ApplicationEnumRender, BrandEnumRender, CategoryEnumRender, CouplingEnumRender, 
    DriveEnumRender, ExtraTypeEnumRender, FuelTypeEnumRender, inserat, lkwAttribute, LkwBrandEnumRender, 
    LoadingEnumRender, pkwAttribute, TrailerEnumRender, TransmissionEnumRender, 
    transportAttribute} from "@/db/schema";
import axios from "axios";
import { and, between, eq, gte, ilike, like, lte, or } from "drizzle-orm";







type GetInserate = {
    title?: string;
    thisCategory?: typeof CategoryEnumRender;
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
    thisBrand?: typeof BrandEnumRender[];
    doors?: number;
    initial?: Date;
    power?: number;
    seats?: number;
    fuel?: typeof FuelTypeEnumRender;
    transmission?: typeof TransmissionEnumRender;
    thisType?: any;
    freeMiles?: number;
    extraCost?: number;

    //LKW
    weightClass? : number;
    drive? : typeof DriveEnumRender;
    loading? : typeof LoadingEnumRender;
    application? : typeof ApplicationEnumRender;
    lkwBrand? : typeof LkwBrandEnumRender;

    //Trailer
    trailerType : typeof TrailerEnumRender;
    coupling : typeof CouplingEnumRender;
    extraType : typeof ExtraTypeEnumRender;
    axis : number;
    brake : boolean;
    
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
    thisCategory,
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

    thisBrand,
    doors,
    initial,
    power,
    seats,
    fuel,
    transmission,
    thisType,
    freeMiles,
    extraCost,

    weightClass,
    drive,
    loading,
    application,
    lkwBrand,

    trailerType,
    coupling,
    extraType,
    axis,
    brake,
}: GetInserate): Promise<typeof inserat.$inferSelect[]> => {

    const Addressfilter = async (pInserat : typeof inserat) => {
        const addressObject = await axios.get(`https://geocode.maps.co/search?q=${location}&api_key=${process.env.GEOCODING_API}`);

        const distance = calculateDistance(addressObject.data[0].lat, addressObject.data[0].lon, 
            Number(pInserat.address?.latitude), Number(pInserat.address?.longitude));
            console.log(distance)
            return distance <= 50;
    }

    const ConditionFilter = (pInserat : typeof inserat) => {
        const bAge = reqAge ? reqAge >= pInserat.reqAge : true;
        const bLicense = reqLicense ? reqLicense === pInserat.license : true;
        
        return bAge && bLicense;
    }
    
    const PkwFilter = (pInserat : typeof inserat) => {
        
        const bSeats = seats ? pInserat.pkwAttribute.seats >= seats : true;
        const bPower = power ? pInserat.pkwAttribute.power >= power : true;
        const bDoors = doors ? pInserat.pkwAttribute.doors >= doors : true;
        const bFreeMiles = freeMiles ? pInserat.pkwAttribute.freeMiles >= freeMiles : true;
        const bExtraCost = extraCost ? pInserat.pkwAttribute.extraCost >= extraCost : true;
        const bType = thisType ? thisType === pInserat.pkwAttribute.type : true;
        const bTransmission = transmission ? transmission === pInserat.pkwAttribute.transmission : true;
        const bFuel = fuel ? fuel === pInserat.pkwAttribute.fuel : true;
        const bInitial = initial.getTime() ? initial.getTime() >= pInserat.pkwAttribute.initial.getTime() : true;
        const bBrand = thisBrand ? thisBrand.includes(pInserat.pkwAttribute.brand) : true;
    
        return bSeats && bPower && bDoors && bFreeMiles &&
         bExtraCost && bType && bTransmission && bFuel && bBrand;
    }

    const LkwFilter = (pInserat : typeof inserat) => {
        const bSeats = seats ? pInserat.lkwAttribute.seats >= seats : true;
        const bWeightClass = weightClass ? pInserat.lkwAttribute.weightClass === weightClass : true;
        const bDrive = drive ? drive === pInserat.lkwAttribute.drive : true;
        const bLoading = loading ? loading === pInserat.lkwAttribute.loading : true;
        const bApplication = application ? application == pInserat.lkwAttribute.application : true;
        const bLkwBrand = lkwBrand ? lkwBrand === pInserat.lkwAttribute.lkwBrand : true;

        return bSeats && bWeightClass && bDrive && bLoading && bApplication && bLkwBrand;
    } 

    const TrailerFilter = (pInserat : typeof inserat) => {
        const bType = trailerType ? trailerType === pInserat.trailerAttribute.type : true;
        const bExtraType = extraType ? extraType === pInserat.trailerAttribute.extraType : true;
        const bCoupling = coupling ? coupling === pInserat.trailerAttribute.coupling : true;
        const bLoading = loading ? loading === pInserat.trailerAttribute.loading : true;
        const bAxis = axis ? axis === pInserat.trailerAttribute.axis : true;
        const bWeightClass = weightClass ? weightClass === pInserat.trailerAttribute.weightClass : true;
        const bBrake = brake ? brake === pInserat.trailerAttribute.brake : true;

        return bType && bExtraType && bCoupling && bLoading && bAxis && bWeightClass && bBrake; 
    }

    const TransportFilter = (pInserat : typeof inserat) => {
        const bLoading = loading ? loading === pInserat.transportAttribute.loading : true;
        const bTransmisson = transmission ? transmission === pInserat.transportAttribute.transmission : true;
        const bSeats = seats ? seats <= pInserat.transportAttribute.seats : true;
        const bDoors = doors ? doors === pInserat.transportAttribute.doors : true;
        const bFuel = fuel ? fuel === pInserat.transportAttribute.fuel : true;


        return bLoading && bTransmisson && bSeats && bDoors && bFuel;
    }

    try {
        const usedStart = new Date(periodBegin);
        const usedEnd = new Date(periodEnd);
        
        let foundInserate; 
        
        const ilikeQuery = title ? title.split(' ').map((w) => ilike(inserat.title, `%${w}%`)) : "";
        
        foundInserate = await db.query.inserat.findMany({
            where: (
                and(
                    eq(inserat.isPublished, "true"),
                    thisCategory ? eq(inserat.category, thisCategory) : undefined,
                    //@ts-ignore
                    ...ilikeQuery,
                    start ? gte(inserat.price, start) : undefined,
                    end ? lte(inserat.price, end) : undefined,
                    periodBegin ?
                        or(
                            (gte(inserat.begin, usedStart)), eq(inserat.annual, "true")
                        ) : undefined,
                    periodEnd ?
                        or(
                            (lte(inserat.end, usedEnd)),
                            eq(inserat.annual, "true")
                        )
                        : undefined,
        
                )
            ),
            with: {
                user: true,
                images: true,
                address: true,
                lkwAttribute: true,
                pkwAttribute: true,
                trailerAttribute: true,
                transportAttribute: true,
            },
            ...(filter === "relevance") && {
                orderBy : (views, { desc }) => [desc(inserat.views)]
            },
            ...(filter === "asc") && {
                orderBy : (price, { asc }) => [asc(inserat.price)]
            },
            ...(filter === "desc") && {
                orderBy : (price, { desc }) => [desc(inserat.price)]
            }
        })

        

        const filteredArray = foundInserate.filter((pInserat) => {
            
            const conditions = ConditionFilter(pInserat);

            if(!conditions) return false;

            switch(thisCategory) {
                //@ts-ignore
                case "PKW": {
                    return PkwFilter(pInserat);
                    break;
                }
                //@ts-ignore
                case "LKW": {
                    return LkwFilter(pInserat);
                    break;
                }
                //@ts-ignore
                case "TRAILER": {
                    return TrailerFilter(pInserat);
                    break;
                }
                //@ts-ignore
                case "TRANSPORT": {
                    return TransportFilter(pInserat);
                    break;
                } default: {
                    return true;
                }
                
            }
        });

        

        let returnedArray = [];

        if(location) {
            const addressObject = await axios.get(`https://geocode.maps.co/search?q=${location}&api_key=${process.env.GEOCODING_API}`);
       
        
        for (const pInserat of filteredArray) {
            const distance = calculateDistance(addressObject.data[0].lat, addressObject.data[0].lon, 
                                                Number(pInserat.address?.latitude), Number(pInserat.address?.longitude));
                                                
                                                if(distance < 50) {
                                                    returnedArray.push(pInserat);
                                                    console.log(distance)
                                                }
        }
    } else {
        returnedArray = filteredArray;
    }

        
        return returnedArray; 
        
        
        
        

    } catch {
        return [];
    }

    
}
        



