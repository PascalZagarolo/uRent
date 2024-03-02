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


const SitzeDetailForm = () => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentTitle = searchParams.get("title");
    const category = searchParams.get("category");
    const sitze = searchParams.get("sitze");

    const [currentStart, setCurrentStart] = React.useState(null);
    const [currentEnd, setCurrentEnd] = React.useState(null);

    const startPrice = searchParams.get("start");
    const endPrice = searchParams.get("end");
    


    const onClick = (sitze) => {

        

        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                title: currentTitle,
                category: category,
                end: endPrice,
                start: startPrice,
                sitze: sitze
                
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
            
            <div className=" gap-x-32 mt-2 ">
                <div >
                    <h3 className="text-sm  text-gray-900 font-medium mb-1 ">
                        Sitzplätze
                    </h3>
                    <Select onValueChange={(e) => onClick(e)} value={sitze || "4"} defaultValue="Start" >
                        <SelectTrigger className="w-[120px]  rounded-lg border-[#282c45] focus:ring-0">
                            <SelectValue className="font-bold" placeholder="Start" />
                        </SelectTrigger>
                        <SelectContent className="" >
                            <SelectGroup>
                                
                                
                                <SelectItem value="1" className="font-bold" >1</SelectItem>
                                <SelectItem value="2" className="font-bold">2</SelectItem>
                                <SelectItem value="3" className="font-bold">3</SelectItem>
                                <SelectItem value="4" className="font-bold">4</SelectItem>
                                <SelectItem value="5" className="font-bold">5</SelectItem>
                                <SelectItem value="6" className="font-bold">6</SelectItem>
                                <SelectItem value="7" className="font-bold">7</SelectItem>
                                
                                
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                
                
            </div>
            
        </div>
    );
}

export default SitzeDetailForm;