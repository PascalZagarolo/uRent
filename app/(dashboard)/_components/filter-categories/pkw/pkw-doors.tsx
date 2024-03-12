'use client';

import { getSearchParamsFunction } from "@/actions/getSearchParams";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSavedSearchParams } from "@/store";
import { Inserat, LkwBrand } from "@prisma/client";




import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";
import qs from "query-string";



const PkwDoorsBar = () => {
    const params = getSearchParamsFunction("doors");
    const doors = useSearchParams().get("doors");

    const [currentDoors, setCurrentDoors] = useState(doors);
    const [isLoading, setIsLoading] = useState(false);

    

    const router = useRouter();
    const pathname = usePathname();

    

    const onSubmit = (selectedValue: string) => {
        setCurrentDoors(selectedValue)
        const url = qs.stringifyUrl({
            url : pathname,
            query : {
                doors : selectedValue,
                ...params
            }
        }, { skipEmptyString: true, skipNull: true })

        router.push(url) 
    }

   

   

    return (
        <div className="w-full">
            <div className="w-full">
                <Label className="flex justify-start items-center text-gray-200">
                    <p className="ml-2 font-semibold"> Türen </p> 
                </Label>

                <Select
                    onValueChange={(brand) => {
                        onSubmit(brand)
                    }}
                    value={currentDoors}
                    disabled={isLoading}
                >

                    <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none   focus-visible:ring-0 mt-2 rounded-md "
                        disabled={isLoading}  
                        
                        >
                        <SelectValue
                            placeholder="Wie viele Sitze?"
                        className="flex justify-center"
                        
                        />
                    </SelectTrigger>

                    <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full flex justify-center" >
                        <SelectItem key="beliebig" value={null} className="font-semibold">
                            Beliebig
                        </SelectItem>
                        <SelectItem value="2">2/3</SelectItem>
                        <SelectItem value="4">4/5</SelectItem>
                        <SelectItem value="6">6/7</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default PkwDoorsBar;