'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSavedSearchParams } from "@/store";
import { LkwBrand } from "@prisma/client";



import { useParams, useRouter } from "next/navigation";

import { useState } from "react";




const PkwTypeSearch = () => {

    const [currentAge, setCurrentAge] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const router = useRouter();

    const params = useParams();

    const onSubmit = (selectedValue: string) => {
        changeSearchParams("type", selectedValue);
        console.log(selectedValue)
    }

    const deleteType = () => {
        deleteSearchParams("type")
    }

    function removeUnderscore(inputString: string): string {
        const outputString = inputString.replace(/_/g, ' ');
        return outputString;
    }

    return (
        <div className="w-full">
            <div className="w-full">
                <Label className="flex justify-start items-center ">
                    <p className="ml-2 font-semibold"> Typ </p>
                </Label>

                <Select
                    onValueChange={(brand) => {
                        brand === "BELIEBIG" ? deleteType() : onSubmit(brand)
                    }}

                    disabled={isLoading}
                >

                    <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md "
                        disabled={isLoading}  >
                        <SelectValue
                            placeholder="Welcher Autotyp?"


                        />
                    </SelectTrigger>

                    <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
                        <SelectItem key="beliebig" value="BELIEBIG" className="font-semibold">
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

export default PkwTypeSearch;