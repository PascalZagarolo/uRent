'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSavedSearchParams } from "@/store";



import axios from "axios";
import { User2Icon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";



const PkwSeatsSearch = () => {

    const currentObject: any = useSavedSearchParams((state) => state.searchParams)

    const [currentAge, setCurrentAge] = useState(currentObject["seats"]);
    const [currentEnd, setCurrentEnd] = useState(currentObject["seatsMax"]);
    const [isLoading, setIsLoading] = useState(false);

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const router = useRouter();

    const params = useParams();

    const onSubmit = (selectedValue: string) => {
        setCurrentAge(selectedValue);
        changeSearchParams("seats", selectedValue);

    }

    const onSubmitEnd = (selectedValue: string) => {
        setCurrentEnd(selectedValue);
        changeSearchParams("seatsMax", selectedValue);

    }

    useEffect(() => {
        if (currentAge && currentEnd) {
            if (Number(currentAge) > Number(currentEnd)) {
                changeSearchParams("seatsMax", currentAge);
                setCurrentEnd(currentAge);
            }

        }
    }, [currentAge])

    useEffect(() => {
        if (currentAge && currentEnd) {
            if (Number(currentAge) > Number(currentEnd)) {
                changeSearchParams("seats", currentEnd);
                setCurrentAge(currentEnd);
            }

        }
    }, [currentEnd])


    const deleteSeats = () => {
        setCurrentAge(null);
        deleteSearchParams("seats")
    }

    const deleteSeatsEnd = () => {
        setCurrentEnd(null);
        deleteSearchParams("seatsMax")
    }

    function removeUnderscore(inputString: string): string {
        const outputString = inputString.replace(/_/g, ' ');
        return outputString;
    }

    return (
        <div className="w-full">
            <div className="w-full">
                <Label className="flex justify-start items-center ">
                    <p className="ml-2 font-semibold"> Sitze </p>
                </Label>

                <div className="w-full flex items-center gap-x-2">
                    <div className="w-1/2">
                        <Select
                            onValueChange={(brand) => {
                                !brand ? deleteSeats() : onSubmit(brand)
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
                                !brand ? deleteSeatsEnd() : onSubmitEnd(brand)
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

export default PkwSeatsSearch;