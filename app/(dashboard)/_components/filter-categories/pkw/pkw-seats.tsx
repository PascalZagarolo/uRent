'use client';

import { getSearchParamsFunction } from "@/actions/getSearchParams";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";





import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { use, useEffect, useState } from "react";
import qs from "query-string";
import { useSavedSearchParams } from "@/store";
import { set } from 'date-fns';



const PkwSeatsBar = () => {
    const params = getSearchParamsFunction("seats");
    const seats = useSearchParams().get("seats");
    const seatsMax = useSearchParams().get("seatsMax");

    const [currentSeats, setCurrentSeats] = useState(seats);
    const [currentEnd, setCurrentEnd] = useState(seatsMax);
    const [isLoading, setIsLoading] = useState(false);



    const router = useRouter();
    const pathname = usePathname();





    useEffect(() => {
        if (seats) {
            changeSearchParams("seats", seats);
            setCurrentSeats(seats);
        }
    }, [])


    useEffect(() => {
        if (currentSeats && currentEnd) {
            if (Number(currentSeats) > Number(currentEnd)) {
                changeSearchParams("seatsMax", currentSeats);
                setCurrentEnd(currentSeats);
            }

        }
    }, [currentSeats])

    useEffect(() => {
        if (currentSeats && currentEnd) {
            if (Number(currentSeats) > Number(currentEnd)) {
                changeSearchParams("seatsMax", currentEnd);
                setCurrentSeats(currentEnd);
            }

        }
    }, [currentEnd])



    const currentObject = useSavedSearchParams((state) => state.searchParams)

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const setStart = (seats: string) => {

        if (!seats) {
            deleteSearchParams("seats");
            setCurrentSeats(null);
        } else {
            //@ts-ignore
            changeSearchParams("seats", seats);
            setCurrentSeats(seats);
        }

    }

    const setEnd = (seats: string) => {

        if (!seats) {
            deleteSearchParams("seatsMax");
            setCurrentEnd(null);
        } else {
            //@ts-ignore
            changeSearchParams("seatsMax", seats);
            setCurrentEnd(seats);
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
                    <p className="ml-2 font-semibold text-gray-200"> Sitze </p>
                </Label>

                <div className="flex w-full items-center gap-x-2">
                    <div className="w-1/2">
                        <Select
                            onValueChange={(brand) => {
                                setStart(brand)
                            }}
                            value={currentSeats}
                            disabled={isLoading}
                        >

                            <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none   focus-visible:ring-0 mt-2 rounded-md "
                                disabled={isLoading}
                                value={currentSeats}
                            >
                                <SelectValue
                                    placeholder="Wie viele Sitze?"
                                    className="flex justify-center"
                                    defaultValue={currentSeats}
                                />
                            </SelectTrigger>

                            <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full flex justify-center" >
                                <SelectItem key="beliebig" value={null} className="font-semibold">
                                    Beliebig
                                </SelectItem>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="4">4</SelectItem>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="6">6</SelectItem>
                                <SelectItem value="7">7</SelectItem>
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
                                value={currentEnd}
                            >
                                <SelectValue
                                    placeholder="Wie viele Sitze?"
                                    className="flex justify-center"
                                    defaultValue={currentEnd}
                                />
                            </SelectTrigger>

                            <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full flex justify-center" >
                                <SelectItem key="beliebig" value={null} className="font-semibold">
                                    Beliebig
                                </SelectItem>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="4">4</SelectItem>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="6">6</SelectItem>
                                <SelectItem value="7">7</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PkwSeatsBar;