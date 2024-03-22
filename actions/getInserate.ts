


import db from "@/db/drizzle";
import { ApplicationEnumRender, BrandEnumRender, CategoryEnumRender, CouplingEnumRender, 
    DriveEnumRender, ExtraTypeEnumRender, FuelTypeEnumRender, inserat, lkwAttribute, LkwBrandEnumRender, 
    LoadingEnumRender, pkwAttribute, TrailerEnumRender, TransmissionEnumRender, 
    transportAttribute} from "@/db/schema";
import { and, between, eq, gte, ilike, like, lte } from "drizzle-orm";



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
    try {
        console.log(title);
        console.log(title ? "ja" : "nein")
        
           const ilikeQuery = title ? title.split(' ').map((w) => ilike(inserat.title, `%${w}%`)) : "";

        const foundInserate = await db.query.inserat.findMany({
            where : (
                and(
                    eq(inserat.isPublished, "true"),
                    thisCategory ? eq(inserat.category, thisCategory) : undefined,
                    //@ts-ignore
                    ...ilikeQuery,
                )
            ),
            with : {
                user : true,
                images : true,
                address : true,
                    lkwAttribute: true,
                    pkwAttribute: true,
                    trailerAttribute: true,
                    transportAttribute: true,
            }
        })

        return foundInserate;

    } catch {
        return [];
    }
        
}