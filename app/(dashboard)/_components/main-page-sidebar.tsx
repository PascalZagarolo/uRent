'use client';

import { AlignCenter, CarFront, CaravanIcon, ConstructionIcon, Contact, Glasses, SearchIcon, TractorIcon, Truck, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


import qs from "query-string";
import { useEffect, useState } from "react";
import PKW from "./_smart-filter/pkw";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MainPageSideBarProps {
    treffer: number;
 }

const MainPageSideBar: React.FC<MainPageSideBarProps> = ({
    treffer
}) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get("category");
    const currentTitle = searchParams.get("title");

    const router = useRouter();

    const [setCategory, setNewCategory] = useState<string | null>(null);

    const onClick = (category: string) => {

        const newCategory = currentCategory === category ? null : category;

        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                title: currentTitle,
                category: newCategory
            }
        }, { skipNull: true, skipEmptyString: true });

        router.push(url)
    }

    const onReset = () => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                title: currentTitle,
            }
        }, { skipNull: true, skipEmptyString: true });

        router.push(url)
    }



    return (
        <div className="h-full fixed no-scrollbar w-[280px] hidden 2xl:block bg-[#2b2f48] border border-black sm:overflow-auto p-2   ">
            <h3 className="text-bold text-2xl p-2 rounded-md mt-4 flex justify-center text-gray-100 items-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] bg-[#1b1e2c]">
                <AlignCenter className="mr-4" /> Suchfilter <X className="h-4 w-4 mb-2 ml-2 hover:cursor-pointer" onClick={onReset}/>
            </h3>
            <div className="mt-4 ">
                <h3 className="text-gray-100 font-semibold border-2 rounded-md border-black p-2 flex justify-center ml-2 mr-2 bg-[#1f2332]">
                    Fahrzeugkategorie 
                </h3>

                <div className="flex justify-between ml-12 mr-12 mt-8 ]">
                    <div className="">
                        <p className={cn("p-4 rounded-md bg-white border-2 hover:cursor-pointer", 
                        currentCategory === "PKW" ? "border-[#ed580dec]" : "border-[#212539]")} onClick={() => { onClick("PKW") }}>
                            <CarFront />
                        </p>
                        <p className="flex justify-center text-gray-100 text-xs font-semibold mt-1">
                            PKW
                        </p>
                    </div>

                    <div>
                        <p className={cn("p-4 rounded-md bg-white border-2 hover:cursor-pointer", 
                        currentCategory === "LKW" ? "border-[#ed580dec]" : "border-[#212539]")} onClick={() => { onClick("LKW") }}>
                            <Truck />
                        </p>
                        <p className="flex justify-center text-gray-100 text-xs font-semibold mt-1">
                            LKW
                        </p>
                    </div>

                </div>

                <div className="flex justify-between ml-12 mr-12 mt-8 ">
                    <div>
                        <p className={cn("p-4 rounded-md bg-white border-2 hover:cursor-pointer", 
                        currentCategory === "LAND" ? "border-[#ed580dec]" : "border-[#212539]")} onClick={() => { onClick("LAND") }}>
                            <TractorIcon />
                        </p>
                        <p className="flex justify-center text-gray-100 text-xs font-semibold mt-1">
                            Land
                        </p>
                    </div>

                    <div>
                        <p className={cn("p-4 rounded-md bg-white border-2 hover:cursor-pointer", 
                        currentCategory === "BAU" ? "border-[#ed580dec]" : "border-[#212539]")} onClick={() => { onClick("BAU") }}>
                            <ConstructionIcon />
                        </p>
                        <p className="flex justify-center text-gray-100 text-xs font-semibold mt-1">
                            Bau
                        </p>
                    </div>


                </div>

                <div className="flex justify-between ml-12 mr-12 mt-8 ">


                    <div>
                        <p className={cn("p-4 rounded-md bg-white border-2  w-[185px] flex justify-center hover:cursor-pointer",
                        currentCategory === "CARAVAN" ? "border-[#ed580dec]" : "border-[#212539]")} onClick={() => { onClick("CARAVAN") }}>
                            <CaravanIcon className="" />
                        </p>
                        <p className="flex justify-center text-gray-100 text-xs font-semibold mt-1">
                            Wohnmobile & Anhänger
                        </p>
                    </div>

                </div>
                <div>
                    <PKW/>
                </div>
                <div className="text-xs flex justify-center mt-2 text-gray-100 underline">
                  <Contact className="mr-2 h-4 w-4"/>  kein passendes Angebot dabei ?
                </div>
                <div className="flex justify-center mt-2 rounded-md">
                    <Button className="bg-[#ed580dec] w-full h-[100px] m ml-2 mr-2 border-2 border-[#000000] flex justify-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                        <SearchIcon className="h-5 w-5 mr-2"/> <p className="font-bold mr-1 ">{treffer}</p> Ergebnisse
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default MainPageSideBar;