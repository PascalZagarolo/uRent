'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
import qs from "query-string";
import { getSearchParamsFunction } from "@/actions/getSearchParams";
import { useSavedSearchParams } from "@/store";




const LkwWeightClassBar = () => {
    const weightClass = useSearchParams().get("weightClass");
    const weightClassMax = useSearchParams().get("weightClassMax");
    const [currentWeight, setCurrentWeight] = useState(weightClass);
    const [currentWeightMax, setCurrentWeightMax] = useState(weightClassMax);
    const [isLoading, setIsLoading] = useState(false);

    const params = getSearchParamsFunction("weightClass")

    const pathname = usePathname();

    const router = useRouter();



    useEffect(() => {
        if (weightClass) {
            changeSearchParams("weightClass", weightClass);
            setCurrentWeight(weightClass);
        }
    }, [])




    const currentObject = useSavedSearchParams((state) => state.searchParams)

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const setStart = (weightClass: string) => {

        if (!weightClass) {
            deleteSearchParams("weightClass");
            setCurrentWeight(null);
        } else {
            //@ts-ignore
            changeSearchParams("weightClass", weightClass);
            setCurrentWeight(weightClass);
        }

    }

    const setEnd = (weightClass: string) => {

        if (!weightClass) {
            deleteSearchParams("weightClassMax");
            setCurrentWeightMax(null);
        } else {
            //@ts-ignore
            changeSearchParams("weightClassMax", weightClass);
            setCurrentWeightMax(weightClass);
        }

    }



    function removeUnderscore(inputString: string): string {
        const outputString = inputString.replace(/_/g, ' ');
        return outputString;
    }

    return (
        <div className="w-full">
            <div className="w-full">
                <Label className="flex justify-start items-center text-gray-200">
                    <p className="ml-2 font-semibold"> Gewichtsklasse </p>
                </Label>

                <div className="flex items-center w-full gap-x-2">
                    <div className="w-1/2">
                        <Select
                            onValueChange={(brand) => {
                                setStart(brand)
                            }}
                            value={currentWeight}
                            disabled={isLoading}
                        >

                            <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md "
                                disabled={isLoading}

                            >
                                <SelectValue
                                    placeholder="Wähle deinen Anwendungsbereich"


                                />
                            </SelectTrigger>

                            <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full flex justify-center">
                                <SelectItem value={null} className="font-bold">Beliebig</SelectItem>

                                <SelectItem value="550">5,5 t</SelectItem>
                                <SelectItem value="750">7,5 t</SelectItem>
                                <SelectItem value="1200">12 t</SelectItem>
                                <SelectItem value="1800">18 t</SelectItem>
                                <SelectItem value="2600">26 t</SelectItem>
                                <SelectItem value="3200">32 t</SelectItem>
                                <SelectItem value="3400">34 t</SelectItem>
                                <SelectItem value="3900">39 t</SelectItem>
                                <SelectItem value="5000">{'>'} 39 t</SelectItem>


                            </SelectContent>
                        </Select>
                    </div>

                    <div className="w-1/2">
                        <Select
                            onValueChange={(brand) => {
                                setEnd(brand)
                            }}
                            value={currentWeightMax}
                            disabled={isLoading}
                        >

                            <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md "
                                disabled={isLoading}

                            >
                                <SelectValue
                                    placeholder="Wähle deinen Anwendungsbereich"


                                />
                            </SelectTrigger>

                            <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full flex justify-center">
                            <SelectItem value={null} className="font-bold">Beliebig</SelectItem>
                                <SelectItem value="550">5,5 t</SelectItem>
                                <SelectItem value="750">7,5 t</SelectItem>
                                <SelectItem value="1200">12 t</SelectItem>
                                <SelectItem value="1800">18 t</SelectItem>
                                <SelectItem value="2600">26 t</SelectItem>
                                <SelectItem value="3200">32 t</SelectItem>
                                <SelectItem value="3400">34 t</SelectItem>
                                <SelectItem value="3900">39 t</SelectItem>
                                <SelectItem value="5000">{'>'} 39 t</SelectItem>


                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LkwWeightClassBar;