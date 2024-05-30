'use client';

import { getSearchParamsFunction } from "@/actions/getSearchParams";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";





import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
import qs from "query-string";
import { useDeleteParams, useSavedSearchParams } from "@/store";



const PkwDoorsBar = () => {
    const params = getSearchParamsFunction("doors");
    const doors = useSearchParams().get("doors");
    const doorsMax = useSearchParams().get("doorsMax");

    const [currentDoors, setCurrentDoors] = useState(doors);
    const [currentEnd, setCurrentEnd] = useState(doorsMax);
    const [isLoading, setIsLoading] = useState(false);



    const router = useRouter();
    const pathname = usePathname();

    const currentState = useDeleteParams((state) => state.removeAttributes);



    const onSubmit = (selectedValue: string) => {
        setCurrentDoors(selectedValue)
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                doors: selectedValue,
                ...params
            }
        }, { skipEmptyString: true, skipNull: true })

        router.push(url)
    }


    useEffect(() => {
        if (doors && !currentState) {
            changeSearchParams("doors", doors);
            setCurrentDoors(doors);
        }

        if (doorsMax && !currentState) {
            changeSearchParams("doorsMax", doorsMax);
            setCurrentEnd(doorsMax);
        }
    }, [])

    useEffect(() => {
        if(Number(currentDoors) > Number(currentEnd) && currentEnd && currentDoors){
            changeSearchParams("doorsMax", currentDoors);
            setCurrentEnd(currentDoors)
        }
    },[currentDoors])

    useEffect(() => {
        if(Number(currentDoors) > Number(currentEnd) && currentEnd && currentDoors){
            changeSearchParams("doors", currentEnd);
            setCurrentDoors(currentEnd)
        }
    },[currentEnd])



    const currentObject = useSavedSearchParams((state) => state.searchParams)

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const setStart = (doors: string) => {

        if (!doors) {
            deleteSearchParams("doors");
            setCurrentDoors(null);
        } else {
            //@ts-ignore
            changeSearchParams("doors", doors);
            setCurrentDoors(doors);
        }

    }

    const setEnd = (doors: string) => {

        if (!doors) {
            deleteSearchParams("doorsMax");
            setCurrentEnd(null);
        } else {
            //@ts-ignore
            changeSearchParams("doorsMax", doors);
            setCurrentEnd(doors);
        }

    }



    return (
        <div className="w-full">
            <div className="w-full">
                <Label className="flex justify-start items-center text-gray-200">
                    <p className="ml-2 font-semibold"> Türen </p>
                </Label>

                <div className="w-full flex items-center gap-x-2">
                    <div className="w-1/2">
                        <Select
                            onValueChange={(brand) => {
                                setStart(brand)
                            }}
                            value={currentDoors}
                            disabled={isLoading}
                        >

                            <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none   focus-visible:ring-0 mt-2 rounded-md "
                                disabled={isLoading}

                            >
                                <SelectValue
                                    placeholder="Wie viele Sitze?"
                                    className="flex justify-center"

                                />
                            </SelectTrigger>

                            <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full flex justify-center" >
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
                                setEnd(brand)
                            }}
                            value={currentEnd}
                            disabled={isLoading}
                        >

                            <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none   focus-visible:ring-0 mt-2 rounded-md "
                                disabled={isLoading}

                            >
                                <SelectValue
                                    placeholder="Wie viele Sitze?"
                                    className="flex justify-center"

                                />
                            </SelectTrigger>

                            <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full flex justify-center" >
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

export default PkwDoorsBar;