import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/utils/db";
import { AlignCenter, Search, SearchCode, TrendingUp, } from "lucide-react";

import { getInserate } from "@/actions/getInserate";
import type { ApplicationType, CarBrands, CarType, Category, DriveType, FuelType, Images, Inserat, LkwBrand, LoadingType, PkwAttribute, Transmission, User } from "@prisma/client";
import OrderBy from "../_components/_smart-filter/order-by";

const InseratRenderedList = lazy(() => import("./_components/inserat-rendered-list"));

import { Suspense, lazy } from "react";
import { InserateImagesAndAttributes } from "@/types/types";

interface RelevanteInserateProps {
    title: string;
    category: Category;
    filter: string;
    start: string;
    end: string;
    page: number;
    periodBegin: string;
    periodEnd: string;
    location: string;

    //conditions

    reqAge?: string;
    reqLicense?: string;

    //PKW
    brand?: CarBrands;
    doors?: string;
    initial?: string;
    power?: string;
    seats?: string;
    fuel?: FuelType;
    transmission?: Transmission;
    type?: CarType;
    freeMiles?: string;
    extraCost?: string;

    //LKW
    weightClass?: string;
    drive?: DriveType;
    loading?: LoadingType;
    application: ApplicationType;
    lkwBrand?: LkwBrand;

}

const RelevanteInserate: React.FC<RelevanteInserateProps> = async ({
    title,
    category,
    filter,
    start,
    end,
    page,
    periodBegin,
    periodEnd,
    location,

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
}) => {

    const currentUser = await getCurrentUser()








    const favedInserate = await db.favourite.findMany({
        where: {
            userId: currentUser?.id || ""
        }
    })



    const inserate = await getInserate({
        title: title,
        category: category,
        filter: filter,
        start: Number(start),
        end: Number(end),
        page: Number(page),
        periodBegin: periodBegin,
        periodEnd: periodEnd,
        location: location,

        reqAge: Number(reqAge),
        reqLicense: reqLicense,

        brand: brand,
        doors: Number(doors),
        initial: new Date(initial),
        power: Number(power),
        seats: Number(seats) || null,
        fuel: fuel,
        transmission: transmission,
        type: type,
        freeMiles: Number(freeMiles),
        extraCost: Number(extraCost),

        weightClass: Number(weightClass),
        drive: drive,
        loading: loading,
        application: application,
        lkwBrand: lkwBrand,

    });






    const LoadingComponent = () => <div>Laden...</div>

    return (
        <div className="">

            {!title ? (
                <div className="h-full flex sm:block sm:mt-0 items-center font-semibold   p-4 text-gray-100 bg-[#141620]">
                    <div className="ml-4 flex w-full items-center">
                        <div className="p-2 sm:block hidden rounded-lg">
                            <AlignCenter />
                        </div>
                        <h3 className=" sm:ml-8 flex font-base text-lg items-center sm:text-2xl h-full w-full">
                            Relevante
                            Inserate
                            <div className="flex ml-4 sm:ml-auto mr-4 sm:mr-8 text-black">
                                <OrderBy />
                            </div>
                        </h3>
                    </div>
                </div>
            ) : (
                <div className="h-full flex sm:block sm:mt-0 items-center  border-2 border-gray-300 dark:border-gray-900 p-4 text-gray-100 bg-[#141620]">
                    <div className="ml-4 flex w-full items-center">
                        <div className="p-2 border-2  rounded-lg">
                            <SearchCode />
                        </div>
                        <h3 className="ml-8 flex font-bold text-2xl h-full w-full">
                            ({inserate.length}) Suchergebnisse
                            <div className="flex ml-auto mr-4 sm:mr-8 text-black">
                                <OrderBy />
                            </div>
                        </h3>
                    </div>
                </div>
            )}
            <div className="flex justify-center">
                <Suspense fallback={<LoadingComponent />}>
                    <InseratRenderedList
                        inserateArray={inserate}
                        currentUser={currentUser}
                        //@ts-ignore
                        favedInserate={favedInserate}

                    />
                </Suspense>
            </div>
        </div>

    );
}

export default RelevanteInserate;