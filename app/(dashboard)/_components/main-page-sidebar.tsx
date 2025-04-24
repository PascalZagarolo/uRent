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
import { MdManageSearch, MdOutlineCancel, MdFilterList } from "react-icons/md";
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
        <div className="hidden lg:block">
            <div className="w-[280px] rounded-lg overflow-hidden shadow-lg bg-[#1e2235]">
                {/* Header */}
                <div className=" px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <MdFilterList className="w-4 h-4 text-indigo-400" />
                            <h3 className="font-medium text-lg text-gray-200">Suchfilter</h3>
                        </div>
                        <button 
                            className="text-xs text-rose-500 hover:text-rose-400 flex items-center gap-1"
                            onClick={onReset}
                        >
                            <MdOutlineCancel className="w-3.5 h-3.5" />
                            <span>Zurücksetzen</span>
                        </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Wähle Filter und klicke auf {`"`}Ergebnisse anzeigen{`"`}</p>
                </div>

                {/* Save Search Section */}
                <div className="px-4 py-3 bg-[#21263a]s">
                    <SaveSearch userId={userId || ""} />
                </div>

                {/* Existing Filters (if any) */}
                {usedSearchParams !== null && (
                    <div className="px-4 py-2">
                        <ExistingFilter />
                    </div>
                )}

                {/* Vehicle Categories */}
                <div className="px-4 pt-2 pb-4">
                    <h4 className="text-sm font-medium text-gray-200 mb-3">Fahrzeugkategorie</h4>
                    <div className="grid grid-cols-2 gap-3">
                        {/* PKW */}
                        <div 
                            onClick={() => {
                                if (currentObject["thisCategory"] === "PKW") {
                                    deleteCategory();
                                } else {
                                    // @ts-ignore
                                    setCategory("PKW");
                                }
                            }}
                            className={cn(
                                "flex flex-col items-center p-3 rounded-md transition-all duration-200 cursor-pointer",
                                currentObject["thisCategory"] === "PKW" 
                                    ? "bg-indigo-600/20 shadow-md" 
                                    : "bg-[#252a40] hover:bg-[#282d45] shadow-sm"
                            )}
                        >
                            <CarFront className={cn(
                                "w-6 h-6 mb-1", 
                                currentObject["thisCategory"] === "PKW" ? "text-indigo-400" : "text-gray-300"
                            )} />
                            <span className="text-xs font-medium text-gray-200">PKW</span>
                        </div>

                        {/* LKW */}
                        <div 
                            onClick={() => {
                                if (currentObject["thisCategory"] === "LKW") {
                                    deleteCategory();
                                } else {
                                    // @ts-ignore
                                    setCategory("LKW");
                                }
                            }}
                            className={cn(
                                "flex flex-col items-center p-3 rounded-md transition-all duration-200 cursor-pointer",
                                currentObject["thisCategory"] === "LKW" 
                                    ? "bg-indigo-600/20 shadow-md" 
                                    : "bg-[#252a40] hover:bg-[#282d45] shadow-sm"
                            )}
                        >
                            <Truck className={cn(
                                "w-6 h-6 mb-1", 
                                currentObject["thisCategory"] === "LKW" ? "text-indigo-400" : "text-gray-300"
                            )} />
                            <span className="text-xs font-medium text-gray-200">LKW</span>
                        </div>

                        {/* Anhänger */}
                        <div 
                            onClick={() => {
                                if (currentObject["thisCategory"] === "TRAILER") {
                                    deleteCategory();
                                } else {
                                    // @ts-ignore
                                    setCategory("TRAILER");
                                }
                            }}
                            className={cn(
                                "flex flex-col items-center p-3 rounded-md transition-all duration-200 cursor-pointer",
                                currentObject["thisCategory"] === "TRAILER" 
                                    ? "bg-indigo-600/20 shadow-md" 
                                    : "bg-[#252a40] hover:bg-[#282d45] shadow-sm"
                            )}
                        >
                            <RiCaravanLine className={cn(
                                "w-6 h-6 mb-1", 
                                currentObject["thisCategory"] === "TRAILER" ? "text-indigo-400" : "text-gray-300"
                            )} />
                            <span className="text-xs font-medium text-gray-200">Anhänger</span>
                        </div>

                        {/* Transporter */}
                        <div 
                            onClick={() => {
                                if (currentObject["thisCategory"] === "TRANSPORT") {
                                    deleteCategory();
                                } else {
                                    // @ts-ignore
                                    setCategory("TRANSPORT");
                                }
                            }}
                            className={cn(
                                "flex flex-col items-center p-3 rounded-md transition-all duration-200 cursor-pointer",
                                currentObject["thisCategory"] === "TRANSPORT" 
                                    ? "bg-indigo-600/20 shadow-md" 
                                    : "bg-[#252a40] hover:bg-[#282d45] shadow-sm"
                            )}
                        >
                            <PiVanFill className={cn(
                                "w-6 h-6 mb-1", 
                                currentObject["thisCategory"] === "TRANSPORT" ? "text-indigo-400" : "text-gray-300"
                            )} />
                            <span className="text-xs font-medium text-gray-200">Transporter</span>
                        </div>
                    </div>
                </div>

                {/* PKW Filter Component */}
                <div className="px-2 py-2 mt-2">
                    <PKW />
                </div>

                {/* Category Overview */}
                <div className="px-2 py-2">
                    <CategoryOverview />
                </div>

                {/* Advanced Search Link */}
                <div className="px-4">
                    <button 
                        onClick={() => { router.push("/search") }}
                        className="w-full flex items-center justify-center gap-2 text-xs text-indigo-400 hover:text-indigo-300 py-2"
                    >
                        <Settings2 className="w-4 h-4s" />
                        <span>Erweiterte Suche öffnen</span>
                    </button>
                </div>

                {/* Results Button */}
                <div className=" mt-1">
                    <MainPageResults />
                </div>
            </div>
        </div>
    );
}

export default MainPageSideBar;