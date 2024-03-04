'use client';

import { AlignCenter, CarFront, CaravanIcon, ConstructionIcon, Contact, Glasses, SearchIcon, TractorIcon, TramFront, Truck, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


import qs from "query-string";
import { useEffect, useState } from "react";
import PKW from "./_smart-filter/pkw";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetFilterAmount } from "@/store";
import { getInserate } from "@/actions/getInserate";
import { getSearchParamsFunction } from "@/actions/getSearchParams";



const MainPageSideBar= () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get("category");
    const currentTitle = searchParams.get("title");
    const currentLocation = searchParams.get("location")

    const router = useRouter();

    const [setCategory, setNewCategory] = useState<string | null>(null);

    const params = getSearchParamsFunction("category");

    useEffect(() => {
        // Store currentLocation in session storage
        sessionStorage.setItem("currentLocation", currentLocation);
      }, [currentLocation]);


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
        <div className=" rounded-md  no-scrollbar w-[280px] hidden xl:block bg-[#202336]  sm:overflow-auto    ">
            <h3 className="text-bold text-2xl p-2 rounded-md mt-4 flex justify-center text-gray-100 items-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] bg-[#1b1e2c]">
                <AlignCenter className="mr-4" /> Suchfilter <X className="h-4 w-4 mb-2 ml-2 hover:cursor-pointer" onClick={onReset} />
            </h3>
            <div className="mt-4 ">
                <h3 className="text-gray-100 font-semibold  rounded-md  p-2 flex justify-center ml-2 mr-2 bg-[#1b1f2c] dark:border-[#1f2332]">
                    Fahrzeugkategorie
                </h3>
                <div className="flex justify-between ml-12 mr-12 mt-8 ">
                    <div className="">
                        <p className={cn("p-4 rounded-md bg-white border-2 hover:cursor-pointer dark:bg-[#1c1f2f]",
                            currentCategory === "PKW" ? "border-[#ed580dec]" : "border-[#212539]")} onClick={() => { onClick("PKW") }}>
                            <CarFront />
                        </p>
                        <p className="flex justify-center text-gray-100 text-xs font-semibold mt-1">
                            PKW
                        </p>
                    </div>

                    <div>
                        <p className={cn("p-4 rounded-md bg-white border-2 hover:cursor-pointer dark:bg-[#1c1f2f]",
                            currentCategory === "LKW" ? "border-[#ed580dec]" : "border-[#212539]")} onClick={() => { onClick("LKW") }}>
                            <Truck />
                        </p>
                        <p className="flex justify-center text-gray-100 text-xs font-semibold mt-1">
                            LKW
                        </p>
                    </div>

                </div>

                <div className="flex justify-between ml-12 mr-12 mt-4 ">
                    <div>
                        <p className={cn("p-4 rounded-md bg-white border-2 hover:cursor-pointer dark:bg-[#1c1f2f]",
                            currentCategory === "LAND" ? "border-[#ed580dec]" : "border-[#212539]")} onClick={() => { onClick("LAND") }}>
                            <TractorIcon />
                        </p>
                        <p className="flex justify-center text-gray-100 text-xs font-semibold mt-1">
                            Land
                        </p>
                    </div>

                    <div>
                        <p className={cn("p-4 rounded-md bg-white border-2 hover:cursor-pointer dark:bg-[#1c1f2f]",
                            currentCategory === "BAU" ? "border-[#ed580dec]" : "border-[#212539]")} onClick={() => { onClick("BAU") }}>
                            <ConstructionIcon />
                        </p>
                        <p className="flex justify-center text-gray-100 text-xs font-semibold mt-1">
                            Bau
                        </p>
                    </div>


                </div>

                <div className="flex justify-between ml-12 mr-12 mt-4 ">


                    <div className="w-[40px] ml-2.5">
                        <div className="flex flex-col items-center">
                            <p className={cn("p-4 rounded-md bg-white border-2 flex justify-center items-center hover:cursor-pointer dark:bg-[#1c1f2f]",
                                currentCategory === "CARAVAN" ? "border-[#ed580dec]" : "border-[#212539]")} onClick={() => { onClick("CARAVAN") }}>
                                <CaravanIcon className="" />
                            </p>
                            <p className="text-gray-100 text-xs font-semibold mt-1  text-center">
                                Wohnmobile <br /> & Anhänger
                            </p>
                        </div>
                    </div>



                    <div className="">
                        <p className={cn("p-4 rounded-md bg-white border-2   flex justify-center hover:cursor-pointer dark:bg-[#1c1f2f]",
                            currentCategory === "TRANSPORT" ? "border-[#ed580dec]" : "border-[#212539]")} onClick={() => { onClick("TRANSPORT") }}>
                            <TramFront className="" />
                        </p>
                        <p className="flex justify-center text-gray-100 text-xs font-semibold mt-1 ">
                            Transport
                        </p>
                    </div>

                </div>
                <div>
                <PKW />
                </div>
                <div className="text-xs flex justify-center mt-2 text-gray-100 underline">
                    <Contact className="mr-2 h-4 w-4" />  kein passendes Angebot dabei ?
                </div>
                <div className="flex justify-center mt-2 mb-2 rounded-md">
                    <Button className="bg-blue-800 w-full h-[100px]  ml-2 mr-2  flex 
                    justify-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
                    dark:text-gray-100 dark:hover:bg-sky-700
                    ">
                        <SearchIcon className="h-5 w-5 mr-2" /> <p className="font-bold mr-1 "> {results} </p> Ergebnisse
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default MainPageSideBar;