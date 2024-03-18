


import { applicationEnum, brandEnum, categoryEnum, couplingEnum, driveEnum, extraTypeEnum, fuelTypeEnum, images, lkwBrandEnum, loadingEnum, trailerEnum, transmissionEnum } from "@/db/schema";






/*
type InserateImagesAndAttributes = Inserat & {
    user: User;
    images: typeof images.$inferSelect[];
    address: Address;
    pkwAttribute: PkwAttribute;
    lkwAttribute: LkwAttribute;
    trailerAttribute : TrailerAttribute;
    transportAttribute : TransportAttribute;
}
*/

type GetInserate = {
    title?: string;
    category?: typeof categoryEnum;
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
    brand?: typeof brandEnum[];
    doors?: number;
    initial?: Date;
    power?: number;
    seats?: number;
    fuel?: typeof fuelTypeEnum;
    transmission?: typeof transmissionEnum;
    type?: any;
    freeMiles?: number;
    extraCost?: number;

    //LKW
    weightClass? : number;
    drive? : typeof driveEnum;
    loading? : typeof loadingEnum;
    application? : typeof applicationEnum;
    lkwBrand? : typeof lkwBrandEnum;

    //Trailer
    trailerType : typeof trailerEnum;
    coupling : typeof couplingEnum;
    extraType : typeof extraTypeEnum;
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
    lkwBrand,

    trailerType,
    coupling,
    extraType,
    axis,
    brake,
}: GetInserate): Promise<[]> => {
    return[];
        
}