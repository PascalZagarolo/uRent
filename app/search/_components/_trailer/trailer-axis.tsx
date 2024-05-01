'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSavedSearchParams } from "@/store";

import { useParams, useRouter } from "next/navigation";

import { useState } from "react";




const TrailerAxisSearch = () => {

    const currentObject: any = useSavedSearchParams((state) => state.searchParams)

    const [currentAge, setCurrentAge] = useState(currentObject['axis'] ? currentObject['axis'] : null);
    const [isLoading, setIsLoading] = useState(false);

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const router = useRouter();

    const params = useParams();

    const onSubmit = (selectedValue: string) => {
        changeSearchParams("axis", selectedValue);
        setCurrentAge(selectedValue)
        console.log(selectedValue)
    }

    const deleteWeight = () => {
        deleteSearchParams("axis");
        setCurrentAge(null)
    }

    function removeUnderscore(inputString: string): string {
        const outputString = inputString.replace(/_/g, ' ');
        return outputString;
    }

    return (
        <div className="w-full">
            <div className="w-full">
                <Label className="flex justify-start items-center ">
                    <p className="ml-2 font-semibold"> Anz. Achsen </p>
                </Label>

                <Select
                    onValueChange={(brand) => {
                        brand === "BELIEBIG" ? deleteWeight() : onSubmit(brand)
                    }}
                    value={currentAge}
                    disabled={isLoading}
                >

                    <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md "
                        disabled={isLoading}  >
                        <SelectValue
                            placeholder="Wie viele Achsen?"


                        />
                    </SelectTrigger>

                    <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
                        <SelectItem key="beliebig" value={currentAge} className="font-semibold">
                            Beliebig
                        </SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">{'>'} 4 </SelectItem>

                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default TrailerAxisSearch;