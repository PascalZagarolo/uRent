'use client'


import * as React from "react"
import qs from "query-string"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { z } from "zod";
import { useForm, FieldValues } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { getSearchParamsFunction } from "@/actions/getSearchParams";
import { IoIosPricetags } from "react-icons/io";
import { useSavedSearchParams } from "@/store";
import { Input } from "@/components/ui/input";


const PriceFormFilter = () => {

    const router = useRouter();
    const pathname = usePathname();
    const usedSearchParams = useSearchParams();
    const currentTitle = usedSearchParams.get("title");
    const category = usedSearchParams.get("category");



    const startPrice = usedSearchParams.get("start");
    const endPrice = usedSearchParams.get("end");

    const [currentStart, setCurrentStart] = React.useState(startPrice ? startPrice : null);
    const [currentEnd, setCurrentEnd] = React.useState(endPrice ? endPrice : null);

    const params = getSearchParamsFunction("start", "end");

    const currentObject = useSavedSearchParams((state) => state.searchParams)

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const setStart = (begin: number) => {
        //@ts-ignore
        changeSearchParams("start", begin);

    }

    const setEnd = (end: number) => {
        //@ts-ignore
        console.log(end)
        changeSearchParams("end", end);

    }

    React.useEffect(() => {
        if (startPrice) {
            changeSearchParams("start", startPrice);
        }

        if (endPrice) {
            changeSearchParams("end", endPrice);
        }
    }, [])

    const deletePrice = () => {
        deleteSearchParams("start");
        deleteSearchParams("end");
    }

    React.useEffect(() => {
        if (!startPrice) {
            deleteSearchParams("start");
            setCurrentStart(null)
        }
        if (!endPrice) {
            deleteSearchParams("end");
            setCurrentEnd(null);
        }
    }, [startPrice, endPrice])




    const onPriceReset = () => {
        setCurrentStart(null);
        setCurrentEnd(null);

        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                ...params
            }
        }, { skipNull: true, skipEmptyString: true });

        router.push(url)
    }

    const formSchema = z.object({
        start: z.string().optional(),
        end: z.string().optional()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            start: params.start || null,
            end: params.end || null,
        }
    })






    return (
        <div className="w-full ">
            <h3 className="flex justify-start text-lg text-gray-100 items-center   w-full bg-[#1b1f2c] 
            p-2 border-[#1f2332]">
                <IoIosPricetags className="mr-4" /> Preisrahmen
            </h3>
            <div className="flex gap-x-4 mt-2 w-full px-2">
                <div className="w-1/2">
                    <h3 className="text-sm  text-gray-300  mb-1">
                        Von :
                    </h3>
                    <Select onValueChange={(e) => { setStart(Number(e)); setCurrentStart(e) }} value={currentStart || "0"} defaultValue="Start">


                        <div className="flex w-full">
                            <Input
                                className="w-full dark:bg-[#171717]   border-none rounded-none"
                                placeholder="Start"
                                value={currentStart || ""}
                                onChange={(e) => {
                                    const newValue = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                                    setCurrentStart(newValue);
                                    setStart(Number(newValue)); 
                                    setCurrentStart(newValue);
                                }}
                            />
                            <SelectTrigger
                                className="rounded-none rounded-r-md w-[36px] font-semibold  border-[#282c45] dark:bg-[#0F0F0F]  dark:border-none" />
                        </div>


                        <SelectContent className="dark:bg-[#191919] dark:border-none p-2 flex justify-center">
                            <SelectGroup>
                                
                                <SelectItem value={null} className="font-bold" >Beliebig</SelectItem>
                                <SelectItem value="0" className="font-bold" >0 €</SelectItem>
                                <SelectItem value="50" className="font-bold">50 €</SelectItem>
                                <SelectItem value="75" className="font-bold">75 €</SelectItem>
                                <SelectItem value="100" className="font-bold">100 €</SelectItem>
                                <SelectItem value="125" className="font-bold">125 €</SelectItem>
                                <SelectItem value="150" className="font-bold">150 €</SelectItem>
                                <SelectItem value="200" className="font-bold">200 €</SelectItem>
                                <SelectItem value="250" className="font-bold">250 €</SelectItem>
                                <SelectItem value="300" className="font-bold">300 €</SelectItem>
                                <SelectItem value="400" className="font-bold">400 €</SelectItem>
                                <SelectItem value="500" className="font-bold">500 €</SelectItem>
                                <SelectItem value="600" className="font-bold">600 €</SelectItem>
                                <SelectItem value="750" className="font-bold">750 €</SelectItem>
                                <SelectItem value="1000" className="font-bold">1000 €</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-1/2">
                    <h3 className="text-sm  text-gray-300 mb-1">
                        Bis :
                    </h3>
                    <Select onValueChange={(e) => { setEnd(Number(e)); setCurrentEnd(e) }} value={currentEnd || "max"} >
                        <div className="flex w-full">
                            <Input
                                className="w-full dark:bg-[#171717] border-none rounded-none"
                                placeholder="Ende"
                                onChange={(e) => {
                                    const newValue = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                                    setEnd(Number(newValue)); 
                                    setCurrentEnd(newValue);
                                }}
                                value={currentEnd || ""}
                            />
                            <SelectTrigger
                            
                                className="rounded-none rounded-r-md w-[36px] font-semibold  border-[#282c45] dark:bg-[#0F0F0F] dark:border-none" />
                        </div>
                        <SelectContent className="dark:bg-[#191919] dark:border-none p-2 flex justify-center">
                            <SelectGroup>
                                
                                <SelectItem value={null} className="font-bold" >Beliebig</SelectItem>
                                <SelectItem value="0" className="font-bold" >0 €</SelectItem>
                                <SelectItem value="50" className="font-bold">50 €</SelectItem>
                                <SelectItem value="75" className="font-bold">75 €</SelectItem>
                                <SelectItem value="100" className="font-bold">100 €</SelectItem>
                                <SelectItem value="125" className="font-bold">125 €</SelectItem>
                                <SelectItem value="150" className="font-bold">150 €</SelectItem>
                                <SelectItem value="200" className="font-bold">200 €</SelectItem>
                                <SelectItem value="250" className="font-bold">250 €</SelectItem>
                                <SelectItem value="300" className="font-bold">300 €</SelectItem>
                                <SelectItem value="400" className="font-bold">400 €</SelectItem>
                                <SelectItem value="500" className="font-bold">500 €</SelectItem>
                                <SelectItem value="600" className="font-bold">600 €</SelectItem>
                                <SelectItem value="750" className="font-bold">750 €</SelectItem>
                                <SelectItem value="1000" className="font-bold">1000 €</SelectItem>
                                <SelectItem value="max" className="font-bold"> &lt; 1000 €</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                </div>

            </div>
            <div className="mt-2 flex justify-center  ">
                <Button className="bg-[#1a1d2c] w-full border  dark:text-gray-100
                      dark:hover:bg-[#212538]" onClick={onPriceReset} disabled={!currentStart && !currentEnd && !startPrice && !endPrice}>
                    Filter zurücksetzen
                </Button>
            </div>
        </div>
    );
}

export default PriceFormFilter;