'use client';

import { getSearchParamsFunction } from "@/actions/getSearchParams";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import qs from "query-string";




const PkwTypeBar = () => {
    const type = useSearchParams().get("type");
    const [currentType, setCurrentType] = useState(type);
    const [isLoading, setIsLoading] = useState(false);

    
    const pathname = usePathname();

    const router = useRouter();

    const params = getSearchParamsFunction("type");

    const onSubmit = (selectedValue: string) => {
        setCurrentType(selectedValue)
        const url = qs.stringifyUrl({
            url : pathname,
            query : {
                type : selectedValue,
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
                    <p className="ml-2 font-semibold"> Fahrzeugtyp </p>
                </Label>

                <Select
                    onValueChange={(brand) => {
                        onSubmit(brand)
                    }}
                    value={currentType}
                    disabled={isLoading}
                >

                    <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md "
                        disabled={isLoading}  >
                        <SelectValue
                            placeholder="Welcher Autotyp?"


                        />
                    </SelectTrigger>

                    <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
                        <SelectItem key="beliebig" value={null} className="font-semibold">
                            Beliebig
                        </SelectItem>


                        <SelectItem value="KOMBI">Kombi</SelectItem>
                        <SelectItem value="COUPE">Coupe</SelectItem>
                        <SelectItem value="SUV">SUV</SelectItem>
                        <SelectItem value="VAN">Van</SelectItem>
                        <SelectItem value="KLEINBUS">Kleinbus</SelectItem>
                        <SelectItem value="CABRIO">Cabrio</SelectItem>
                        <SelectItem value="KLEIN">Kleinwagen</SelectItem>
                        <SelectItem value="SPORT">Sportwagen</SelectItem>
                        <SelectItem value="SUPERSPORT">Supersportwagen</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default PkwTypeBar;
