'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSavedSearchParams } from "@/store";

import { useParams, useRouter } from "next/navigation";

import { useState } from "react";




const LkwWeightClassSearch = () => {

    const currentObject: any = useSavedSearchParams((state) => state.searchParams)

    const [currentAge, setCurrentAge] = useState(currentObject['weightClass']);
    const [isLoading, setIsLoading] = useState(false);

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const router = useRouter();

    const params = useParams();

    const onSubmit = (selectedValue: string) => {
        changeSearchParams("weightClass", selectedValue);
        setCurrentAge(selectedValue)
        console.log(selectedValue)
    }

    const deleteWeight = () => {
        deleteSearchParams("weightClass");
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
                    <p className="ml-2 font-semibold"> Gewichtsklasse </p>
                </Label>

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
                            placeholder="Wie viel Gewicht?"


                        />
                    </SelectTrigger>

                    <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
                        <SelectItem key="beliebig" value={null} className="font-semibold">
                            Beliebig
                        </SelectItem>
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

export default LkwWeightClassSearch;