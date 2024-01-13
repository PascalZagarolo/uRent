'use client';

import { AlignCenter, CarFront, CaravanIcon, ConstructionIcon, TractorIcon, Truck } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


import qs from "query-string";
import { useEffect, useState } from "react";

const MainPageSideBar = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get("category");
    const currentTitle = searchParams.get("title");

    const router = useRouter();

    const [setCategory, setNewCategory] = useState<string | null>(null);

    const onClick = (category: string) => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                title: currentTitle,
                category: category
            }
        }, { skipNull: true, skipEmptyString: true });

        router.push(url)
    }




    return (
        <div className="h-screen w-[240px] hidden sm:block bg-[#3d4469] border border-black">
            <h3 className="text-bold text-2xl mt-4 flex justify-center text-gray-100 items-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                <AlignCenter className="mr-4" /> Suchfilter
            </h3>
            <div className="mt-4 ">
                <h3 className="text-gray-100 font-semibold border-2 rounded-md border-black p-2 flex justify-center">
                    Fahrzeugkategorie
                </h3>

                <div className="flex justify-between ml-12 mr-12 mt-8 ]">
                    <div className="">
                        <p className="p-4 rounded-md bg-white border-2 border-[#212539] hover:cursor-pointer" onClick={() => { onClick("PKW") }}>
                            <CarFront />
                        </p>
                        <p className="flex justify-center text-gray-100 text-xs font-semibold mt-1">
                            PKW
                        </p>
                    </div>

                    <div>
                        <p className="p-4 rounded-md bg-white border-2 border-[#212539] hover:cursor-pointer" onClick={() => { onClick("LKW") }}>
                            <Truck />
                        </p>
                        <p className="flex justify-center text-gray-100 text-xs font-semibold mt-1">
                            LKW
                        </p>
                    </div>

                </div>

                <div className="flex justify-between ml-12 mr-12 mt-8 ">
                    <div>
                        <p className="p-4 rounded-md bg-white border-2 border-[#212539] hover:cursor-pointer" onClick={() => { onClick("LAND") }}>
                            <TractorIcon />
                        </p>
                        <p className="flex justify-center text-gray-100 text-xs font-semibold mt-1">
                            Land
                        </p>
                    </div>

                    <div>
                        <p className="p-4 rounded-md bg-white border-2 border-[#212539] hover:cursor-pointer" onClick={() => { onClick("BAU") }}>
                            <ConstructionIcon />
                        </p>
                        <p className="flex justify-center text-gray-100 text-xs font-semibold mt-1">
                            Bau
                        </p>
                    </div>


                </div>

                <div className="flex justify-between ml-12 mr-12 mt-8 ">


                    <div>
                        <p className="p-4 rounded-md bg-white border-2 border-[#212539] w-[145px] flex justify-center hover:cursor-pointer" onClick={() => { onClick("CARAVAN") }}>
                            <CaravanIcon className="" />
                        </p>
                        <p className=" justify-center text-gray-100 text-xs font-semibold mt-1">
                            Wohnmobile & Anhänger
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default MainPageSideBar;