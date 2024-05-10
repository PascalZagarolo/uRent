

import { AlignCenter, SearchCode } from "lucide-react";

import { getInserate } from "@/actions/getInserate";

import OrderBy from "../_components/_smart-filter/order-by";



import { Suspense, cache, lazy, memo } from "react";
import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { ApplicationEnumRender, BrandEnumRender, CarTypeEnumRender, CategoryEnumRender, 
    CouplingEnumRender, DriveEnumRender, ExtraTypeEnumRender, favourite, FuelTypeEnumRender, 
    LkwBrandEnumRender, LoadingEnumRender, TrailerEnumRender, TransmissionEnumRender, userTable } from "@/db/schema";
import { MdFilterList } from "react-icons/md";
import InseratRenderedList from "./_components/inserat-rendered-list";


interface RelevanteInserateProps {
    title: string;
    thisCategory: typeof CategoryEnumRender;
    filter: string;
    start: string;
    end: string;
    page: number;

    periodBegin: string;
    periodEnd: string;
    startTime : number,
    endTime : number,

    location: string;
    amount: string;
    //conditions

    reqAge?: string;
    reqLicense?: string;

    //PKW
    thisBrand?: typeof BrandEnumRender[];
    doors?: string;
    initial?: string;
    power?: string;
    seats?: string;
    fuel?: typeof FuelTypeEnumRender;
    transmission?: typeof TransmissionEnumRender;
    thisType?: typeof CarTypeEnumRender;
    freeMiles?: string;
    extraCost?: string;

    //LKW
    weightClass?: string;
    drive?: typeof DriveEnumRender;
    loading?: typeof LoadingEnumRender;
    application: typeof ApplicationEnumRender;
    lkwBrand?: typeof LkwBrandEnumRender;

    //Trailer
    trailerType: typeof TrailerEnumRender;
    coupling: typeof CouplingEnumRender;
    extraType: typeof ExtraTypeEnumRender;
    axis: string;
    brake: string,

    currentUser : typeof userTable.$inferSelect;

    volume? : number;
    loading_l? : number;
    loading_b? : number;
    loading_h? : number;

    radius : number;
    caution : number;
    userId : string;

}

const RelevanteInserate: React.FC<RelevanteInserateProps> = cache(async ({
    title,
    thisCategory,
    filter,
    start,
    end,
    page,


    periodBegin,
    periodEnd,
    startTime,
    endTime,

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

    currentUser,
    
    volume,
    loading_b,
    loading_h,
    loading_l,

    radius,
    userId,
    caution,
}) => {

    






    let favedInserate : typeof favourite.$inferSelect[] = [];

    if(currentUser) {
        favedInserate = await db.query.favourite.findMany({
            where: eq(favourite?.userId, currentUser?.id)
        })
    }



    const foundInserate = await getInserate({
        title: title,
        thisCategory: thisCategory,
        filter: filter,
        start: Number(start),
        end: Number(end),
        page: Number(page),


        periodBegin: periodBegin,
        periodEnd: periodEnd,
        startTime : startTime,
        endTime : endTime,

        location: location,
        amount: Number(amount),

        reqAge: Number(reqAge),
        reqLicense: reqLicense,

        thisBrand: thisBrand,
        doors: Number(doors),
        initial: new Date(initial),
        power: Number(power),
        seats: Number(seats) || null,
        fuel: fuel,
        transmission: transmission,
        thisType: thisType,
        freeMiles: Number(freeMiles),
        extraCost: Number(extraCost),

        weightClass: Number(weightClass),
        drive: drive,
        loading: loading,
        application: application,
        lkwBrand: lkwBrand,

        trailerType : trailerType,
        coupling : coupling,
        extraType : extraType,
        axis : Number(axis),
        brake : brake ? (brake.toLowerCase() == 'true') : null,

        volume : volume,
        loading_l : loading_l,
        loading_b : loading_b,
        loading_h : loading_h,

        radius : radius,
        userId : userId,
        caution : caution
});






    

    return (
        <div className="w-full">
            
            {!title ? (
                <div className="h-full flex sm:block sm:mt-0 items-center font-semibold w-full py-4 text-gray-100 bg-[#141620]">
                <div className="ml-4 flex w-full items-center">
                    <div className="p-2 sm:block hidden rounded-lg">
                        <MdFilterList className="w-6 h-6 sm:mr-2" />
                    </div>
                    <h3 className="  flex font-base text-lg items-center sm:text-xl h-full w-full">
                        Relevante
                        Inserate
                        <div className="flex ml-4 sm:ml-auto mr-4 sm:mr-8 text-black">
                            <OrderBy />
                        </div>
                    </h3>
                </div>
            </div>
            ) : (
                <div className="h-full flex sm:block sm:mt-0 items-center  border-2 border-gray-300 dark:border-gray-900 p-4 text-gray-100 bg-[#141620] ">
                    <div className="ml-4 flex w-full items-center">
                        <div className="p-2 border-2  rounded-lg">
                            <SearchCode />
                        </div>
                        <h3 className="ml-8 flex font-bold text-lg sm:text-2xl h-full w-full">
                            ({foundInserate.length}) Ergebnisse
                            <div className="flex ml-auto mr-4 sm:mr-8 text-black">
                                <OrderBy />
                            </div>
                        </h3>
                    </div>
                </div>
            )}
            <div className="sm:flex sm:justify-center w-full px-0.5">
            <InseratRenderedList
                        inserateArray={foundInserate}
                        currentUser={currentUser}
                        //@ts-ignore
                        favedInserate={favedInserate}

                    />
                
                
            </div>
        </div>

    );
});

export default RelevanteInserate;