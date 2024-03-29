'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";
import qs from "query-string";
import { getSearchParamsFunction } from "@/actions/getSearchParams";




const LkwWeightClassBar = () => {
    const brand = useSearchParams().get("weightClass");
    const [currentWeight, setCurrentWeight] = useState(brand);
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

                    <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
                        <SelectItem key="beliebig" value={null} className="font-semibold">
                            Beliebig
                        </SelectItem>
                        <SelectItem value="3">bis 3,5 t</SelectItem>
                        <SelectItem value="5">3,5 - 5t</SelectItem>
                        <SelectItem value="7">5,0 - 7,5t</SelectItem>
                        <SelectItem value="12">7,5 - 12t</SelectItem>
                        <SelectItem value="26">12t - 26t</SelectItem>
                        <SelectItem value="0">Sonstiges</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default LkwWeightClassBar;