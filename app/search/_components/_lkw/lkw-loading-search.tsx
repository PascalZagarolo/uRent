'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSavedSearchParams } from "@/store";




import { useParams, useRouter } from "next/navigation";

import { useState } from "react";




const LkwLoadingSearch = () => {

    const currentObject: any = useSavedSearchParams((state) => state.searchParams)

    const [currentAge, setCurrentAge] = useState(currentObject['loading']);
    const [isLoading, setIsLoading] = useState(false);

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const router = useRouter();

    const params = useParams();

    const onSubmit = (selectedValue: string) => {
        changeSearchParams("loading", selectedValue);
        setCurrentAge(selectedValue)
        console.log(selectedValue)
    }

    const deleteLoading = () => {
        deleteSearchParams("loading");
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
                    <p className="ml-2 font-semibold"> Ladevorrichtung </p>
                </Label>
                <Select
                    onValueChange={(brand) => {
                        !brand ? deleteLoading() : onSubmit(brand)
                    }}
                    value={currentAge}
                    disabled={isLoading}
                >
                    <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md "
                        disabled={isLoading}  >
                        <SelectValue
                            placeholder="Welcher Ladetyp?"
                        />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
                        <SelectItem key="beliebig" value={null} className="font-semibold">
                            Beliebig
                        </SelectItem>
                        <SelectItem value="AUFFAHRRAMPE">Auffahrrampe</SelectItem>
                        <SelectItem value="KIPPER">Kipper</SelectItem>
                        <SelectItem value="KRAN">Kran</SelectItem>
                        <SelectItem value="LADERAMPE">Laderampe</SelectItem>
                        <SelectItem value="LADEBORDWAND">Ladebordwand</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default LkwLoadingSearch;