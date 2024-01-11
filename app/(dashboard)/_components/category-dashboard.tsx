'use client'

import { useDebounce } from "@/hooks/use-debounce";
import { CarFront, Caravan, TowerControl, Tractor, Truck } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import qs from "query-string";

const CategoryDashboard = () => {

    const [value, setValue] = useState("");

    const debouncedValue = useDebounce(value);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentTitle = searchParams.get("title");


    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                title: debouncedValue
            }
        }, { skipEmptyString: true, skipNull: true })

        router.push(url)
    }, [debouncedValue, router, pathname])

    return (
        <div>
            <div className="flex justify-around mt-4 mb-2">

                <div className="justify-center rounded-lg bg-white px-6 py-1 border-2 border-[#2f334e]">
                    <CarFront
                        className="h-10 w-10"
                    />
                    <p className="flex justify-center font-semibold">
                        PKW
                    </p>
                </div>

                <div className="justify-center rounded-lg bg-white px-6 py-1 border-2 border-[#2f334e]">
                    <Truck
                        className="h-10 w-10"
                    />
                    <p className="flex justify-center font-semibold">
                        LKW
                    </p>
                </div>

                <div className="justify-center rounded-lg bg-white px-6 py-1 border-2 border-[#2f334e]">
                    <Tractor
                        className="h-10 w-10 flex justify-center"
                    />
                    <p className="flex justify-center font-semibold">
                        Land
                    </p>
                </div>

                <div className="flex flex-col items-center rounded-lg bg-white px-6 py-1 border-2 border-[#2f334e]">
                    <TowerControl className="h-10 w-10 flex justify-center" />
                    <p className="font-semibold">Bau</p>
                </div>


                <div className="flex flex-col items-center rounded-lg bg-white px-6 py-1 border-2 border-[#2f334e]">
                    <Caravan className="h-10 w-10 flex justify-center" />
                    <p className="font-semibold">Anhänger und Wohnmobile</p>
                </div>




            </div>
        </div>
    );
}

export default CategoryDashboard;