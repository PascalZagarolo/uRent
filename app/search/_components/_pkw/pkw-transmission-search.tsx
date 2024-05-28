'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSavedSearchParams } from "@/store";




import { useParams, useRouter } from "next/navigation";

import { useState } from "react";




const PkwTransmissionSearch = () => {

    const currentObject : any = useSavedSearchParams((state) => state.searchParams)


    const [currentAge, setCurrentAge] = useState(currentObject["transmission"]);
    const [isLoading, setIsLoading] = useState(false);

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const router = useRouter();

    const params = useParams();

    const onSubmit = (selectedValue: string) => {
        setCurrentAge(selectedValue);
        changeSearchParams("transmission", selectedValue);
        console.log(selectedValue)
    }

    const deleteTransmission = () => {
        setCurrentAge(null)
        deleteSearchParams("transmission")
    }

    function removeUnderscore(inputString: string): string {
        const outputString = inputString.replace(/_/g, ' ');
        return outputString;
    }

    return (
        <div className="w-full">
            <div className="w-full">
                <Label className="flex justify-start items-center ">
                    <p className="ml-2 font-semibold"> Getriebe </p>
                </Label>

                <Select
                    onValueChange={(brand) => {
                        brand === "BELIEBIG" ? deleteTransmission() : onSubmit(brand)
                    }}
                    value={currentAge}
                    disabled={isLoading}
                >

                    <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md "
                        disabled={isLoading}  >
                        <SelectValue
                            placeholder="Welches Getriebe?"


                        />
                    </SelectTrigger>

                    <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
                        <SelectItem key="beliebig" value="BELIEBIG" className="font-semibold">
                            Beliebig
                        </SelectItem>


                        
                        <SelectItem value="MANUAL">Manuell</SelectItem>
                        <SelectItem value="AUTOMATIC">Automatisch</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default PkwTransmissionSearch;