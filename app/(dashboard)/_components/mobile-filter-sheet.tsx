'use client';

import { SheetContent, SheetTrigger, Sheet } from "@/components/ui/sheet";
import { AlignCenter, AlignLeft, CarFront, FilterIcon, SearchIcon, Settings2, Truck, X } from "lucide-react";
import PKW from "./_smart-filter/pkw";
import { Button } from "@/components/ui/button";
import { RiCaravanLine } from "react-icons/ri";
import { PiVanFill } from "react-icons/pi";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getSearchParamsFunction } from "@/actions/getSearchParams";
import qs from "query-string";
import { useGetFilterAmount, useSavedSearchParams } from "@/store";
import { MdOutlineCancel } from "react-icons/md";
import MainPageResults from "./main-page-results";
import { CategoryEnumRender } from "@/db/schema";
import { GrAddCircle } from "react-icons/gr";
import { TiFilter } from "react-icons/ti";

const MobileFilterSheet = () => {

    const pathname = usePathname();
    const pSearchParams = useSearchParams();
    const currentCategory = pSearchParams.get("category");
    const currentTitle = pSearchParams.get("title");
    const currentLocation = pSearchParams.get("location")

    const router = useRouter();

   

    const { searchParams, changeSearchParams, deleteSearchParams, removeAll } = useSavedSearchParams();

    const setCategory = (category : typeof CategoryEnumRender) => {
        //@ts-ignore
        changeSearchParams("thisCategory", category);
        
    }

    useEffect(() => {
        if(currentCategory){
            changeSearchParams("thisCategory", currentCategory);
        }
    }, [])

    const currentObject = useSavedSearchParams((state) => state.searchParams)

    const params = getSearchParamsFunction("category");

    const onClick = (category: string) => {

        const newCategory = currentCategory === category ? null : category;

        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                category: newCategory,
                ...params,
            }
        }, { skipNull: true, skipEmptyString: true });

        router.push(url)
    }

    const onReset = () => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                title: currentTitle,
                periodBegin: null,
                periodEnd: null,
                location: currentLocation,
            }
        }, { skipNull: true, skipEmptyString: true });

        router.push(url)
    }

    const results = useGetFilterAmount((state) => state.amount);

    return (

        <Sheet>
            <SheetTrigger className="flex items-center sm:bg-[#1C1E2C] w-full rounded-md" asChild>
                <Button className="bg-indigo-800 hover:bg-indigo-900 text-gray-200 hover:text-gray-300 gap-x-2" 
                size="sm"
                variant="ghost">
                  <TiFilter  className="w-4 h-4" />  Filter bearbeiten
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-[#202336] p-0 px-0 pb-4 border-none w-4/5 h-full overflow-y-scroll no-scrollbar">
            <h3 className="text-bold text-2xl p-4 font-medium  flex justify-center text-gray-100 items-center  bg-[#1b1e2c]">
                <FilterIcon className="mr-4" /> Suchfilter                 
            </h3>
            <p className="w-full flex bg-[#1b1e2c] justify-center items-center text-xs pb-2 hover:underline hover:cursor-pointer" onClick={onReset}>
            <MdOutlineCancel  className="w-4 h-4 mr-2 text-rose-600" />  Filter zurücksetzen
            </p>

                <div className=" p-4">
                    <h3 className="text-gray-100 font-semibold  rounded-md  py-2 flex justify-center  bg-[#1b1f2c] dark:border-[#1f2332]">
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
                <div className="text-xs flex justify-center mt-2 text-gray-100 underline hover:cursor-pointer" onClick={() => {router.push("/search")}}>
                    <Settings2 className="mr-2 h-4 w-4" /> Zu der Erweiterten Suche
                </div>
                <div className="flex justify-center mt-2 mb-2 rounded-md">
                    <SheetTrigger className="w-full mr-2">
                    <MainPageResults />
                    </SheetTrigger>
                </div>
                </div>
            </SheetContent>
        </Sheet>

    );
}

export default MobileFilterSheet;