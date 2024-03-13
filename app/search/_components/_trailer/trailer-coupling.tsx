'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSavedSearchParams } from "@/store";
import { LkwBrand } from "@prisma/client";



import { useParams, useRouter } from "next/navigation";

import { useState } from "react";




const TrailerCouplingSearch = () => {

    const [currentAge, setCurrentAge] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const router = useRouter();

    const params = useParams();

    const onSubmit = (selectedValue: string) => {
        changeSearchParams("coupling", selectedValue);
        console.log(selectedValue)
    }

    const deleteType = () => {
        deleteSearchParams("coupling")
    }

    function removeUnderscore(inputString: string): string {
        const outputString = inputString.replace(/_/g, ' ');
        return outputString;
    }

    return (
        <div className="w-full">
            <div className="w-full">
                <Label className="flex justify-start items-center ">
                    <p className="ml-2 font-semibold"> Kupplungsart </p>
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
                            placeholder="Welche Kupplung?"


                        />
                    </SelectTrigger>

                    <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
                        <SelectItem  value="BELIEBIG" className="font-semibold">
                            Beliebig
                        </SelectItem>
                        <SelectItem value="KUGELKOPFKUPPLUNG">Kugelkopfkupplung</SelectItem>
                        <SelectItem value="MAULKUPPLUNG">Maulkupplung</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default TrailerCouplingSearch;
