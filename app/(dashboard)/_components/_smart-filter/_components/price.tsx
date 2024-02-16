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
import { Banknote, Link } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm, FieldValues } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";


const PriceFormFilter = () => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentTitle = searchParams.get("title");
    const category = searchParams.get("category");

    const [currentStart, setCurrentStart] = React.useState(null);
    const [currentEnd, setCurrentEnd] = React.useState(null);

    const startPrice = searchParams.get("start");
    const endPrice = searchParams.get("end");
    


    const onClick = (startPrice: string, endPrice: string) => {

        setCurrentStart(Number(startPrice));
        setCurrentEnd(Number(endPrice));

        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                title: currentTitle,
                category: category,
                end: endPrice,
                start: startPrice,
                
            }
        }, { skipNull: true, skipEmptyString: true });

        router.push(url)
    }

    const onPriceReset = () => {
        setCurrentStart(null);
        setCurrentEnd(null);

        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                title: currentTitle,
                category: category,
                
                
            }
        }, { skipNull: true, skipEmptyString: true });

        router.push(url)
    }

    const formSchema = z.object({
        start: z.string().optional(),
        end: z.string().optional()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            start : null,
            end : null
        }
    })
   

    const onStartPrice = (values : z.infer<typeof formSchema>) => {
        console.log(values);
    }

    const onEndPrice = (values : z.infer<typeof formSchema>) => {
        console.log(values);
    }



    return (
        <div>
            <h3 className="flex justify-start text-lg text-gray-100 items-center rounded-md border-2 border-black bg-[#1f2332] p-2">
                <Banknote className="mr-4" /> Preis
            </h3>
            <div className="flex gap-x-4 mt-2">
                <div >
                    <h3 className="text-sm  text-gray-300  mb-1">
                        Von :
                    </h3>
                    <Select onValueChange={(e) => onClick(e, currentEnd)} value={startPrice || "0"} defaultValue="Start">
                        <SelectTrigger className="w-[120px] font-semibold rounded-lg border-[#282c45]">
                            <SelectValue className="font-bold" placeholder="Start" />
                        </SelectTrigger>
                        <SelectContent >
                            <SelectGroup>
                                <SelectLabel>Startpreis</SelectLabel>
                                
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
                                
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="">
                    <h3 className="text-sm  text-gray-300 mb-1">
                        Bis :
                    </h3>
                    <Select onValueChange={(e) => onClick(currentStart, e)} value={endPrice || "max"} >
                        <SelectTrigger className="w-[120px] font-semibold rounded-lg border-[#282c45] ">
                            <SelectValue className="font-bold" placeholder="Ende"/>
                        </SelectTrigger>
                        <SelectContent >
                            <SelectGroup>
                                <SelectLabel>Endpreis</SelectLabel>
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
                                <SelectItem value="max" className="font-bold"> &lt; 500 €</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                        
                </div>
                
            </div>
            <div className="mt-2 flex justify-center  ">
                    <Button className="bg-[#1a1d2c] w-full border border-[#11131c] dark:text-gray-100
                     dark:border-black dark:hover:bg-[#212538]" onClick={onPriceReset} disabled={!currentStart && !currentEnd}>
                        Filter zurücksetzen
                    </Button>
                </div>
        </div>
    );
}

export default PriceFormFilter;