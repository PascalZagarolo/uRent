'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSavedSearchParams } from "@/store";
import { LkwBrand } from "@prisma/client";



import { useParams, useRouter } from "next/navigation";

import { useState } from "react";




const PkwFuelSearch = () => {

    const [currentAge, setCurrentAge] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const router = useRouter();

    const params = useParams();

    const onSubmit = (selectedValue: string) => {
        changeSearchParams("fuel", selectedValue);
        console.log(selectedValue)
    }

    const deleteFuel = () => {
        deleteSearchParams("fuel")
    }

    function removeUnderscore(inputString: string): string {
        const outputString = inputString.replace(/_/g, ' ');
        return outputString;
    }

    return (
        <div className="w-full">
            <div className="w-full">
                <Label className="flex justify-start items-center ">
                    <p className="ml-2 font-semibold"> Treibstoff </p>
                </Label>

                <Select
                    onValueChange={(brand) => {
                        brand === "BELIEBIG" ? deleteFuel() : onSubmit(brand)
                    }}

                    disabled={isLoading}
                >

                    <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md "
                        disabled={isLoading}  >
                        <SelectValue
                            placeholder="Welcher Treibstoff?"


                        />
                    </SelectTrigger>

                    <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
                        <SelectItem key="beliebig" value="BELIEBIG" className="font-semibold">
                            Beliebig
                        </SelectItem>


                        <SelectItem value="BENZIN">Benzin</SelectItem>
            <SelectItem value="DIESEL">Diesel</SelectItem>
            <SelectItem value="ELEKTRISCH">Elektrisch</SelectItem>
            <SelectItem value="HYBRID">Hybrid</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default PkwFuelSearch;