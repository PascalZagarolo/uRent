'use client';

import { getSearchParamsFunction } from "@/actions/getSearchParams";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";
import qs from "query-string"




const PkwFuelBar = () => {

    const fuel = useSearchParams().get("fuel");
    const [currentFuel, setCurrentFuel] = useState(fuel);
    const [isLoading, setIsLoading] = useState(false);

    const pathname = usePathname();

    const router = useRouter();

    const params = getSearchParamsFunction("fuel");

    const onSubmit = (selectedValue: string) => {
        setCurrentFuel(selectedValue)
        const url = qs.stringifyUrl({
            url : pathname,
            query : {
                fuel : selectedValue,
                ...params
            }
        }, { skipEmptyString: true, skipNull: true })

        router.push(url) 
    }



    function removeUnderscore(inputString: string): string {
        const outputString = inputString.replace(/_/g, ' ');
        return outputString;
    }

    return (
        <div className="w-full">
            <div className="w-full">
                <Label className="flex justify-start items-center text-gray-200">
                    <p className="ml-2 font-semibold"> Treibstoff </p>
                </Label>

                <Select
                    onValueChange={(brand) => {
                        onSubmit(brand)
                    }}
                    value = {currentFuel}
                    disabled={isLoading}
                >

                    <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md "
                        disabled={isLoading}  >
                        <SelectValue
                            placeholder="Welcher Treibstoff?" />
                    </SelectTrigger>

                    <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
                        <SelectItem key="beliebig" value={null} className="font-semibold">
                            Beliebig
                        </SelectItem>


                        <SelectItem value="BENZIN">Benzin</SelectItem>
                        <SelectItem value="DIESEL">Diesel</SelectItem>
                        <SelectItem value="ELEKTRISCH">Elektrisch</SelectItem>
                        <SelectItem value="HYBRID">Hybrid</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default PkwFuelBar;