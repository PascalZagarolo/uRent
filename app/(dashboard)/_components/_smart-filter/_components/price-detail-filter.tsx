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


const PriceDetailForm = () => {

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
            
            <div className="flex gap-x-32 mt-2 justify-center">
                <div >
                    <h3 className="text-sm  text-gray-900 font-medium mb-1 flex justify-center">
                        Von :
                    </h3>
                    <Select onValueChange={(e) => onClick(e, currentEnd)} value={startPrice || "0"} defaultValue="Start" >
                        <SelectTrigger className="w-[120px] font-semibold rounded-lg border-[#282c45] focus:ring-0">
                            <SelectValue className="font-bold" placeholder="Start" />
                        </SelectTrigger>
                        <SelectContent className="" >
                            <SelectGroup>
                                
                                
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
                    <h3 className="text-sm  text-gray-900 font-medium mb-1 flex justify-center">
                        Bis :
                    </h3>
                    <Select onValueChange={(e) => onClick(currentStart, e)} value={endPrice || "max"} >
                        <SelectTrigger className="w-[120px] font-semibold rounded-lg border-[#282c45] focus:ring-0">
                            <SelectValue className="font-bold" placeholder="Ende"/>
                        </SelectTrigger>
                        <SelectContent >
                            <SelectGroup>
                                
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
            
        </div>
    );
}

export default PriceDetailForm;