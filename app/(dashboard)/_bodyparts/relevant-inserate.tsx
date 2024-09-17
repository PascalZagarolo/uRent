

import { getInserate } from "@/actions/getInserate";

import OrderBy from "../_components/_smart-filter/order-by";



import { cache } from "react";
import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { ApplicationEnumRender, BrandEnumRender, CarTypeEnumRender, CategoryEnumRender, 
    CouplingEnumRender, DriveEnumRender, ExtraTypeEnumRender, favourite, FuelTypeEnumRender, 
    LkwBrandEnumRender, LoadingEnumRender, TrailerEnumRender, TransmissionEnumRender, userTable } from "@/db/schema";

import InseratRenderedList from "./_components/inserat-rendered-list";

import { TbReportSearch } from "react-icons/tb";
import { FaAlignLeft } from "react-icons/fa";
import MobileFilterSheet from "../_components/mobile-filter-sheet";
import MobileFilter from "../_components/mobile-filter";


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
    startDateDynamic: string,
    endDateDynamic: string,
    reqTime : string,	

    location: string;
    amount: string;
    //conditions

    reqAge?: string;
    reqLicense?: string;

    //PKW
    thisBrand?: typeof BrandEnumRender[];
    doors?: string;
    doorsMax?: string;
    initial?: string;
    initialMax?: string;
    power?: string;
    powerMax?: string;
    seats?: string;
    seatsMax? : string;
    fuel?: typeof FuelTypeEnumRender;
    transmission?: typeof TransmissionEnumRender;
    thisType?: typeof CarTypeEnumRender;
    freeMiles?: string;
    extraCost?: string;

    //LKW
    weightClass?: string;
    weightClassMax?: string;
    drive?: typeof DriveEnumRender;
    loading?: typeof LoadingEnumRender;
    application: typeof ApplicationEnumRender;
    lkwBrand?: typeof LkwBrandEnumRender;

    //TRANSPORT
    transportBrand : string;

    //Trailer
    trailerType: typeof TrailerEnumRender;
    coupling: typeof CouplingEnumRender;
    extraType: typeof ExtraTypeEnumRender;
    axis: string;
    axisMax: string;
    brake: string,

    currentUser : typeof userTable.$inferSelect;

    volume? : number;
    loading_l? : number;
    loading_b? : number;
    loading_h? : number;

    radius : number;
    caution : number;
    userId : string;

    ahk : string;

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
    startDateDynamic,
    endDateDynamic,
    reqTime,

    location,
    amount,

    reqAge,
    reqLicense,

    thisBrand,
    doors,
    doorsMax,
    initial,
    initialMax, 
    power,
    powerMax,
    seats,
    seatsMax,
    fuel,
    transmission,
    thisType,
    freeMiles,
    extraCost,

    weightClass,
    weightClassMax,
    drive,
    loading,
    application,
    lkwBrand,

    trailerType,
    coupling,
    extraType,
    axis,
    axisMax,
    brake,

    currentUser,
    
    volume,
    loading_b,
    loading_h,
    loading_l,

    radius,
    userId,
    caution,
    transportBrand,
    ahk
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
        startDateDynamic: startDateDynamic,
        endDateDynamic: endDateDynamic,
        reqTime : reqTime,

        location: location,
        amount: Number(amount),

        reqAge: Number(reqAge),
        reqLicense: reqLicense,

        thisBrand: thisBrand,
        doors: Number(doors),
        doorsMax: Number(doorsMax),
        initial: new Date(initial),
        initialMax: new Date(initialMax),
        power: Number(power),
        powerMax: Number(powerMax),
        seats: Number(seats) || null,
        seatsMax: Number(seatsMax) || null,
        fuel: fuel,
        transmission: transmission,
        thisType: thisType,
        freeMiles: Number(freeMiles),
        extraCost: Number(extraCost),

        weightClass: Number(weightClass),
        weightClassMax: Number(weightClassMax),
        drive: drive,
        loading: loading,
        application: application,
        lkwBrand: lkwBrand,

        transportBrand : transportBrand,

        trailerType : trailerType,
        coupling : coupling,
        extraType : extraType,
        axis : Number(axis),
        axisMax : Number(axisMax),
        brake : brake ? (brake.toLowerCase() == 'true') : null,
        ahk : ahk ? ahk : null,

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
                        <FaAlignLeft   className="w-6 h-6 sm:mr-2" />
                    </div>
                    <h3 className="  flex font-semibold text-lg items-center sm:text-xl h-full w-full">
                        Relevante
                        Inserate
                        <div className="flex ml-4 sm:ml-auto mr-2 sm:mr-8 text-black">
                            <OrderBy />
                        </div>
                    </h3>
                </div>
            </div>
            ) : (
                <div className="h-full flex sm:block sm:mt-0 items-center   py-4 text-gray-100 bg-[#141620] ">
                    <div className="ml-4 flex w-full items-center">
                        <div className="rounded-lg hidden sm:block">
                            <TbReportSearch className="w-6 h-6 sm:mr-2" />
                        </div>
                        <h3 className=" flex font-semibold  items-center text-lg sm:text-lg h-full w-full">
                            {foundInserate.length} {foundInserate.length == 1 ? "Ergebnis" : "Ergebnisse"}
                            <div className="flex ml-auto mr-2 sm:mr-8 text-black">
                                <OrderBy />
                            </div>
                        </h3>
                    </div>
                </div>
            )}
            <div className="sm:hidden  mt-4  px-2 sm:px-0">
            <MobileFilterSheet />
            <div className="sm:mt-0 mt-4 ">
            <MobileFilter/>
            </div>
            </div>
            <div className="sm:flex sm:justify-center w-full px-0.5">
                    <InseratRenderedList
                        inserateArray={foundInserate}
                        currentUser={currentUser}
                        //@ts-ignore
                    />
            </div>
        </div>

    );
});

export default RelevanteInserate;