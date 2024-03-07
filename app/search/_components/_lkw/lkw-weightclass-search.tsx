'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSavedSearchParams } from "@/store";
import { Inserat, LkwBrand } from "@prisma/client";


import axios from "axios";
import { User2Icon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";



const LkwWeightClassSearch = () => {

    const [currentAge, setCurrentAge] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const router = useRouter();

    const params = useParams();

    const onSubmit = (selectedValue: string) => {
        changeSearchParams("weightClass", selectedValue);
        console.log(selectedValue)
    }

    const deleteWeight = () => {
        deleteSearchParams("weightClass")
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
                        brand === "BELIEBIG" ? deleteWeight() : onSubmit(brand)
                    }}

                    disabled={isLoading}
                >

                    <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md "
                        disabled={isLoading}  >
                        <SelectValue
                            placeholder="Wie viel Gewicht?"


                        />
                    </SelectTrigger>

                    <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
                        <SelectItem key="beliebig" value="BELIEBIG" className="font-semibold">
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

export default LkwWeightClassSearch;