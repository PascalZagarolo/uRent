import { getInserate } from "@/actions/getInserate";

import OrderBy from "../_components/_smart-filter/order-by";

import { cache } from "react";
import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import {
    ApplicationEnumRender, BrandEnumRender, CarTypeEnumRender, CategoryEnumRender,
    CouplingEnumRender, DriveEnumRender, ExtraTypeEnumRender, favourite, FuelTypeEnumRender,
    LkwBrandEnumRender, LoadingEnumRender, TrailerEnumRender, TransmissionEnumRender, userTable
} from "@/db/schema";

import InseratRenderedList from "./_components/inserat-rendered-list";

import { TbDeviceDesktopSearch, TbListSearch, TbReportSearch } from "react-icons/tb";
import { FaAlignLeft, FaSearch } from "react-icons/fa";
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
    startTime: number,
    endTime: number,
    startDateDynamic: string,
    endDateDynamic: string,
    reqTime: string,

    location: string;
    amount: string;
    minTime : string;
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
    seatsMax?: string;
    fuel?: typeof FuelTypeEnumRender;
    transmission?: typeof TransmissionEnumRender;
    thisType?: typeof CarTypeEnumRender;
    freeMiles?: string;
    extraCost?: string;

    //LKW
    weightClass?: string;
    weightClassMax?: string;
    payload?: string;
    payloadMax?: string;
    drive?: typeof DriveEnumRender;
    loading?: typeof LoadingEnumRender;
    application: typeof ApplicationEnumRender;
    lkwBrand?: typeof LkwBrandEnumRender;

    //TRANSPORT
    transportBrand: string;

    //Trailer
    trailerType: typeof TrailerEnumRender;
    coupling: typeof CouplingEnumRender;
    extraType: typeof ExtraTypeEnumRender;
    axis: string;
    axisMax: string;
    brake: string,

    currentUser: typeof userTable.$inferSelect;

    volume?: number;
    loading_l?: number;
    loading_b?: number;
    loading_h?: number;

    radius: number;
    caution: number;
    userId: string;

    ahk: string;

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
    minTime,

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
    payload,
    payloadMax,
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
    

    

    const foundInserate = await getInserate({
        title: title,
        thisCategory: thisCategory,
        filter: filter,
        start: Number(start),
        end: Number(end),
        page: Number(page),

        periodBegin: periodBegin,
        periodEnd: periodEnd,
        startTime: startTime,
        endTime: endTime,
        startDateDynamic: startDateDynamic,
        endDateDynamic: endDateDynamic,
        reqTime: reqTime,
        minTime: Number(minTime),

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
        payload: Number(payload),
        payloadMax: Number(payloadMax),
        drive: drive,
        loading: loading,
        application: application,
        lkwBrand: lkwBrand,

        transportBrand: transportBrand,

        trailerType: trailerType,
        coupling: coupling,
        extraType: extraType,
        axis: Number(axis),
        axisMax: Number(axisMax),
        brake: brake ? (brake.toLowerCase() == 'true') : null,
        ahk: ahk ? ahk : null,

        volume: volume,
        loading_l: loading_l,
        loading_b: loading_b,
        loading_h: loading_h,

        radius: radius,
        userId: userId,
        caution: caution
    });

    return (
        <div className="w-full">
            {!title ? (
                <div className="bg-[#1a1d28] rounded-lg shadow-sm overflow-hidden mb-4">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-[#252838]/40">
                        <div className="flex items-center gap-2">
                            <TbListSearch className="w-5 h-5 text-indigo-400" />
                            <h3 className="font-medium text-gray-100">Relevante Inserate</h3>
                        </div>
                        <div className="flex items-center">
                            <OrderBy />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-[#1a1d28] rounded-lg shadow-sm overflow-hidden mb-4">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-[#252838]/40">
                        <div className="flex items-center gap-2">
                            <FaSearch className="w-4 h-4 text-indigo-400" />
                            <h3 className="font-medium text-gray-100 line-clamp-1 max-w-[300px]">
                                {title}
                            </h3>
                            <span className="text-xs text-gray-400 ml-2">
                                {foundInserate.length} {foundInserate.length === 1 ? "Ergebnis" : "Ergebnisse"}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <OrderBy />
                        </div>
                    </div>
                </div>
            )}
            <div className="lg:hidden w-full mt-4 sm:mt-0  px-2 xl:px-0">
                <MobileFilterSheet 
                userId={currentUser?.id || ""}
                />
                <div className="md:mt-0 mt-4 ">
                    <MobileFilter />
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