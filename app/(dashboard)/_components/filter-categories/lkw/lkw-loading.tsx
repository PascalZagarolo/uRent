'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";
import qs from "query-string";
import { getSearchParamsFunction } from "@/actions/getSearchParams";




const LkwLoadingBar = () => {
    const brand = useSearchParams().get("loading");
    const [currentBrand, setCurrentBrand] = useState(brand);
    const [isLoading, setIsLoading] = useState(false);

    const params = getSearchParamsFunction("loading")

    const pathname = usePathname();

    const router = useRouter();



    const onSubmit = (selectedValue: string) => {
        setCurrentBrand(selectedValue)
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                loading: selectedValue,
                ...params
            }
        }, { skipEmptyString: true, skipNull: true })

        router.push(url)
    }



    

    return (
        <div className="w-full">
            <div className="w-full">
                <Label className="flex justify-start items-center text-gray-200">
                    <p className="ml-2 font-semibold"> Ladevorrichtung </p>
                </Label>

                <Select
                    onValueChange={(brand) => {
                        onSubmit(brand)
                    }}
                    value={currentBrand}
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
                        <SelectItem value="AUFFAHRRAMPE">Auffahrrampe</SelectItem>
                        <SelectItem value="LADERAMPE">Laderampe</SelectItem>
                        <SelectItem value="KRAN">Kran</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default LkwLoadingBar;