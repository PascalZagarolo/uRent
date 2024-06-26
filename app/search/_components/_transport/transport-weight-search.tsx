'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSavedSearchParams } from "@/store";

import { useParams, useRouter } from "next/navigation";

import { useState } from "react";




const TransportWeightClassSearch = () => {

    const currentObject: any = useSavedSearchParams((state) => state.searchParams)

    const [currentAge, setCurrentAge] = useState(currentObject['weightClass']);
    const [currentEnd, setCurrentEnd] = useState(currentObject['weightClassMax']);
    const [isLoading, setIsLoading] = useState(false);

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const router = useRouter();

    const params = useParams();

    const onSubmit = (selectedValue: string) => {
        changeSearchParams("weightClass", selectedValue);
        setCurrentAge(selectedValue)
        console.log(selectedValue)
    }

    const onSubmitEnd = (selectedValue: string) => {
        changeSearchParams("weightClassMax", selectedValue);
        setCurrentEnd(selectedValue)
        
    }

    const deleteWeight = () => {
        deleteSearchParams("weightClass");
        setCurrentAge(null)
    }

    const deleteWeightEnd = () => {
        deleteSearchParams("weightClassMax");
        setCurrentEnd(null)
    }

    function removeUnderscore(inputString: string): string {
        const outputString = inputString.replace(/_/g, ' ');
        return outputString;
    }

    return (
        <div className="w-full">
            <div className="w-full">
                <Label className="flex justify-start items-center ">
                    <p className="ml-2 font-semibold"> Gewichtsklasse </p>
                </Label>

                <div className="w-full flex items-center gap-x-2">
                    <div className="w-1/2">
                    <Select
                    onValueChange={(brand) => {
                        !brand  ? deleteWeight() : onSubmit(brand)
                    }}
                    value={currentAge}
                    disabled={isLoading}
                >

                    <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md "
                        disabled={isLoading}  >
                        <SelectValue
                            placeholder="Von"


                        />
                    </SelectTrigger>

                    <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
                        <SelectItem key="beliebig" value={null} className="font-semibold">
                            Beliebig
                        </SelectItem>
                        <SelectItem value="280">2,8 t</SelectItem>
                        <SelectItem value="350">3,5 t</SelectItem>
                        <SelectItem value="550">5,5 t</SelectItem>
                        
                        
                    </SelectContent>
                </Select>
                    </div>
                    <div className="w-1/2">
                    <Select
                    onValueChange={(brand) => {
                        !brand  ? deleteWeightEnd() : onSubmitEnd(brand)
                    }}
                    value={currentEnd}
                    disabled={isLoading}
                >

                    <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md "
                        disabled={isLoading}  >
                        <SelectValue
                            placeholder="Bis"


                        />
                    </SelectTrigger>

                    <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
                        <SelectItem key="beliebig" value={null} className="font-semibold">
                            Beliebig
                        </SelectItem>
                        <SelectItem value="280">2,8 t</SelectItem>
                        <SelectItem value="350">3,5 t</SelectItem>
                        <SelectItem value="550">5,5 t</SelectItem>
                        
                        
                    </SelectContent>
                </Select>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default TransportWeightClassSearch;