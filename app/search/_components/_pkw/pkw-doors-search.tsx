'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSavedSearchParams } from "@/store";



import axios from "axios";
import { User2Icon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";




const PkwDoorsSearch = () => {

    const currentObject: any = useSavedSearchParams((state) => state.searchParams)

    const [currentAge, setCurrentAge] = useState(currentObject["doors"]);
    const [currentEnd, setCurrentEnd] = useState(currentObject["doorsMax"]);
    const [isLoading, setIsLoading] = useState(false);

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const router = useRouter();

    const params = useParams();

    const onSubmit = (selectedValue: string) => {
        setCurrentAge(selectedValue);
        changeSearchParams("doors", selectedValue);
        console.log(selectedValue)
    }

    const deleteDoors = () => {
        setCurrentAge(null);
        deleteSearchParams("doors")
    }

    const onSubmitEnd = (selectedValue: string) => {
        setCurrentEnd(selectedValue);
        changeSearchParams("doorsMax", selectedValue);
        console.log(selectedValue)
    }

    const deleteDoorsEnd = () => {
        setCurrentEnd(null);
        deleteSearchParams("doorsMax")
    }

    useEffect(() => {
        if(Number(currentAge) > Number(currentEnd) && currentEnd && currentAge){
            changeSearchParams("doorsMax", currentAge);
            setCurrentEnd(currentAge)
        }
    },[currentAge])

    useEffect(() => {
        if(Number(currentAge) > Number(currentEnd) && currentEnd && currentAge){
            changeSearchParams("doors", currentEnd);
            setCurrentAge(currentEnd)
        }
    },[currentEnd])

    function removeUnderscore(inputString: string): string {
        const outputString = inputString.replace(/_/g, ' ');
        return outputString;
    }

    return (
        <div className="w-full">
            <div className="w-full">
                <Label className="flex justify-start items-center ">
                    <p className="ml-2 font-semibold"> Türen </p>
                </Label>

                <div className="flex items-center gap-x-2 w-full">
                    <div className="w-1/2">
                    <Select
                    onValueChange={(brand) => {
                        !brand ? deleteDoors() : onSubmit(brand)
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
                        <SelectItem value="2">2/3</SelectItem>
                        <SelectItem value="4">4/5</SelectItem>
                        <SelectItem value="6">6/7</SelectItem>
                    </SelectContent>
                </Select>
                    </div>
                    <div className="w-1/2">
                    <Select
                    onValueChange={(brand) => {
                        !brand ? deleteDoorsEnd() : onSubmitEnd(brand)
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
                        <SelectItem value="2">2/3</SelectItem>
                        <SelectItem value="4">4/5</SelectItem>
                        <SelectItem value="6">6/7</SelectItem>
                    </SelectContent>
                </Select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PkwDoorsSearch;
