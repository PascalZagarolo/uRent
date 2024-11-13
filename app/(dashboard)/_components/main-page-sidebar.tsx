'use client';

import { CarFront, FilterIcon, Settings2, Truck, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


import qs from "query-string";
import PKW from "./_smart-filter/pkw";

import { cn } from "@/lib/utils";


import { getSearchParamsFunction } from "@/actions/getSearchParams";
import { PiVanFill } from "react-icons/pi";
import { RiCaravanLine } from "react-icons/ri";
import CategoryOverview from "./filter-categories/category-overview";
import { useDeleteParams, useSavedSearchParams } from "@/store";
import { MdManageSearch, MdOutlineCancel } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import MainPageResults from "./main-page-results";
import { CategoryEnumRender } from "@/db/schema";
import SaveSearch from "./save-search";
import ExistingFilter from "./existing-filter";
import { set } from "lodash";
import { link } from "fs";


interface MainPageSideBarProps {
    userId?: string
}

const MainPageSideBar: React.FC<MainPageSideBarProps> = ({
    userId
}) => {
    const pathname = usePathname();
    const usedSearchParams = useSearchParams();
    const currentCategory = usedSearchParams.get("category");


    const router = useRouter();

    const isMounted = useRef(false)

    const params = getSearchParamsFunction("category");

    const linkedParams = getSearchParamsFunction("");







    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true
        }
    }, [])



    const onReset = () => {
        const url = process.env.NEXT_PUBLIC_BASE_URL

        router.push(url)


    }



    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const currentObject = useSavedSearchParams((state) => state.searchParams)


    const { changeAttributes } = useDeleteParams();

    const setCategory = (category: typeof CategoryEnumRender) => {
        deleteAttributes();
        //@ts-ignore
        changeSearchParams("thisCategory", category);

    }

    useEffect(() => {
        if (currentCategory) {
            changeSearchParams("thisCategory", currentCategory);
        }

    }, [])



    const deleteCategory = () => {

        deleteAttributes();
        deleteSearchParams("thisCategory")
    }






    const deleteAttributes = () => {

        changeAttributes(true);

        //ALLGEMEIN
        deleteSearchParams("caution")

        //PKW
        deleteSearchParams("brand")
        deleteSearchParams("thisBrand")
        deleteSearchParams("seats")
        deleteSearchParams("seatsMax")
        deleteSearchParams("doors")
        deleteSearchParams("doorsMax")
        deleteSearchParams("fuel")
        deleteSearchParams("initial")
        deleteSearchParams("initialMax")
        deleteSearchParams("type");
        deleteSearchParams("ahk");

        //LKW
        deleteSearchParams("application")
        deleteSearchParams("axis")
        deleteSearchParams("drive")
        deleteSearchParams("lkwBrand")
        deleteSearchParams("loading")
        deleteSearchParams("loading_b")
        deleteSearchParams("loading_h")
        deleteSearchParams("loading_l")
        deleteSearchParams("power")
        deleteSearchParams("powerMax")
        deleteSearchParams("transmission")
        deleteSearchParams("volume")
        deleteSearchParams("weightClass")

        //TRAILER
        deleteSearchParams("brake")
        deleteSearchParams("coupling")
        deleteSearchParams("brake")

        //TRANSPORT
        deleteSearchParams("transportBrand")



    }






    return (
        <div>
            <div className=" no-scrollbar w-[280px] rounded-md hidden lg:block bg-[#202336]  sm:overflow-auto    ">
                <h3 className="text-bold text-2xl p-4 font-medium  flex flex-col justify-center text-gray-100 items-center  bg-[#1b1e2c]">
                    <div className="flex flex-row items-center">
                    <MdManageSearch  className="mr-4" /> Suchfilter
                    </div>
                    <p className="text-xs text-gray-200/60 text-center  py-2"> Wähle Filter aus und scrolle nach unten, um auf "Ergebnisse" zu klicken. </p>
                </h3>

                <a
                    className="w-full flex bg-[#1b1e2c] justify-center items-center text-xs pb-2 hover:underline hover:cursor-pointer"
                    href={process.env.NEXT_PUBLIC_BASE_URL}>
                    <MdOutlineCancel className="w-4 h-4 mr-2 text-rose-600" />  Filter zurücksetzen
                </a>
                <div className="py-2 bg-[#1b1e2c]">
                    <SaveSearch
                        userId={userId || ""}
                    />
                </div>
                {usedSearchParams !== null && (
                    <div className="">
                        <ExistingFilter />
                    </div>
                )}

                <div className="">
                    <h3 className="text-gray-100 font-semibold    p-2 flex justify-center  bg-[#1b1f2c] dark:border-[#1f2332]">
                        Fahrzeugkategorie
                    </h3>
                    <div className="flex justify-between ml-12 mr-12 mt-8 ">
                        <div className="">
                            <p className={cn("p-4 rounded-md text-gray-200  border-2 hover:cursor-pointer bg-[#1c1f2f]",
                                //@ts-ignore
                                currentObject["thisCategory"] === "PKW" ? "border-blue-800" : "border-[#212539]")}
                                onClick={//@ts-ignore
                                    () => currentObject["thisCategory"] === "PKW" ? deleteCategory() : setCategory("PKW")}>
                                <CarFront />
                            </p>
                            <p className="flex justify-center text-gray-100 text-xs font-semibold mt-1">
                                PKW
                            </p>
                        </div>

                        <div>
                            <p className={cn("p-4 rounded-md text-gray-200 border-2 hover:cursor-pointer bg-[#1c1f2f]",
                                //@ts-ignore
                                currentObject["thisCategory"] === "LKW" ? "border-blue-800" : "border-[#212539]")}
                                onClick={//@ts-ignore
                                    () => currentObject["thisCategory"] === "LKW" ? deleteCategory() : setCategory("LKW")}>
                                <Truck />
                            </p>
                            <p className="flex justify-center text-gray-100 text-xs font-semibold mt-1">
                                LKW
                            </p>
                        </div>

                    </div>

                    <div className="flex justify-between ml-12 mr-12 mt-4 ">
                        <div>
                            <p className={cn("p-4 rounded-md text-gray-200 border-2 hover:cursor-pointer bg-[#1c1f2f]",
                                //@ts-ignore
                                currentObject["thisCategory"] === "TRAILER" ? "border-blue-800" : "border-[#212539]")}
                                onClick={//@ts-ignore
                                    () => currentObject["thisCategory"] === "TRAILER" ? deleteCategory() : setCategory("TRAILER")}>
                                <RiCaravanLine className="w-6 h-6" />
                            </p>
                            <p className="flex justify-center text-gray-100 text-xs font-semibold mt-1">
                                Anhänger
                            </p>
                        </div>

                        <div className="w-[60px]">
                            <p className={cn("p-4 rounded-md text-gray-200 border-2   flex justify-center hover:cursor-pointer bg-[#1c1f2f]",
                                //@ts-ignore
                                currentObject["thisCategory"] === "TRANSPORT" ? "border-blue-800" : "border-[#212539]")}
                                onClick={//@ts-ignore
                                    () => currentObject["thisCategory"] === "TRANSPORT" ? deleteCategory() : setCategory("TRANSPORT")}>
                                <PiVanFill className="w-6 h-6" />
                            </p>
                            <p className="flex justify-center text-gray-100 text-xs font-semibold mt-1 ">
                                Transporter
                            </p>
                        </div>


                    </div>

                    <div className="flex justify-between ml-12 mr-12 mt-4 ">
                    </div>
                    <div>
                        <PKW />
                    </div>
                    <div>

                        <CategoryOverview />

                    </div>
                    <div className="text-xs flex justify-center text-gray-100 underline hover:cursor-pointer" onClick={() => { router.push("/search") }}>
                        <Settings2 className="mr-2 h-4 w-4" /> Zu der Erweiterten Suche
                    </div>
                    <div className="flex justify-center mt-2 mb-2 rounded-md">
                        <MainPageResults />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default MainPageSideBar;