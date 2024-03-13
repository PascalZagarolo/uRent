'use client';

import { getSearchParamsFunction } from "@/actions/getSearchParams";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSavedSearchParams } from "@/store";
import { Inserat, LkwBrand } from "@prisma/client";




import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";
import qs from "query-string";
import { User2Icon } from "lucide-react";



const RequiredAgeBar = () => {
    const params = getSearchParamsFunction("reqAge");
    const reqAge = useSearchParams().get("reqAge");

    const [currentAge, setCurrentAge] = useState(reqAge);
    const [isLoading, setIsLoading] = useState(false);



    const router = useRouter();
    const pathname = usePathname();



    const onSubmit = (selectedValue: string) => {
        setCurrentAge(selectedValue)
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                reqAge: selectedValue,
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
                    <p className="ml-2 font-semibold text-gray-200 flex"> <User2Icon className="w-4 h-4 mr-2" />Min. Alter </p>
                </Label>

                <Select
                    onValueChange={(brand) => {
                        onSubmit(brand)
                    }}
                    value={currentAge}
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
                        <SelectItem value="16">16</SelectItem>
                        <SelectItem value="17">17</SelectItem>
                        <SelectItem value="18">18</SelectItem>
                        <SelectItem value="19">19</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="21">21</SelectItem>
                        <SelectItem value="23">23</SelectItem>
                        <SelectItem value="24">24</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="26">26</SelectItem>
                        <SelectItem value="27">27</SelectItem>
                        <SelectItem value="28">28</SelectItem>
                        <SelectItem value="29">29</SelectItem>
                        <SelectItem value="30">30</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default RequiredAgeBar;