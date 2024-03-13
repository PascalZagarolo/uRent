'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSavedSearchParams } from "@/store";
import { CarBrands, Inserat, LkwBrand } from "@prisma/client";

import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";
import qs from "query-string";
import { getSearchParamsFunction } from "@/actions/getSearchParams";




const TrailerWeightClassBar = () => {
    const weightClass = useSearchParams().get("weightClass");
    const [currentWeight, setCurrentWeight] = useState(weightClass);
    const [isLoading, setIsLoading] = useState(false);

    const params = getSearchParamsFunction("weightClass")

    const pathname = usePathname();

    const router = useRouter();



    const onSubmit = (selectedValue: string) => {
        setCurrentWeight(selectedValue)
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                weightClass: selectedValue,
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
                    <p className="ml-2 font-semibold"> Gewichtsklasse </p>
                </Label>

                <Select
                    onValueChange={(brand) => {
                        onSubmit(brand)
                    }}
                    value={currentWeight}
                    disabled={isLoading}
                >

                    <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md "
                        disabled={isLoading}

                    >
                        <SelectValue
                            placeholder="Wähle deinen Anwendungsbereich"


                        />
                    </SelectTrigger>

                    <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full flex justify-center">
                    <SelectItem value={null} className="font-bold">Beliebig</SelectItem>
                        <SelectItem value="75">0,75 t</SelectItem>
                        <SelectItem value="150">1,5 t</SelectItem>
                        <SelectItem value="280">2,8 t</SelectItem>
                        <SelectItem value="350">3,5 t</SelectItem>
                        <SelectItem value="750">7,5 t</SelectItem>
                        <SelectItem value="1200">12 t</SelectItem>
                        <SelectItem value="1800">18 t</SelectItem>
                        <SelectItem value="2600">26 t</SelectItem>
                        <SelectItem value="3200">32 t</SelectItem>
                        <SelectItem value="3900">39 t</SelectItem>
                        <SelectItem value="5000">{'>'} 39 t</SelectItem>
                        
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default TrailerWeightClassBar;