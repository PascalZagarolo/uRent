'use client';

import { getSearchParamsFunction } from "@/actions/getSearchParams";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSavedSearchParams } from "@/store";
import  qs from "query-string";



import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";




const PkwTransmissionBar = () => {
    const transmission = useSearchParams().get("transmission");
    const [currentTransmission, setCurrentTransmission] = useState(transmission);
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();

    const router = useRouter();

    const params = getSearchParamsFunction("transmission");

    const onSubmit = (selectedValue: string) => {
        setCurrentTransmission(selectedValue)
        const url = qs.stringifyUrl({
            url : pathname,
            query : {
                transmission : selectedValue,
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
                <Label className="flex justify-start items-center ">
                    <p className="ml-2 font-semibold text-gray-200"> Getriebe </p>
                </Label>

                <Select
                    onValueChange={(brand) => {
                        onSubmit(brand)
                    }}
                    value={currentTransmission}
                    disabled={isLoading}
                >

                    <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md "
                        disabled={isLoading}  >
                        <SelectValue
                            placeholder="Welches Getriebe?"


                        />
                    </SelectTrigger>

                    <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
                        <SelectItem key="beliebig" value={null} className="font-semibold">
                            Beliebig
                        </SelectItem>


                        <SelectItem value="MANUAL">Manuell</SelectItem>
                        <SelectItem value="AUTOMATIC">Automatisch</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default PkwTransmissionBar;