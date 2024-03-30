'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSavedSearchParams } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";



import { Banknote } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";



const CautionSearch = () => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [currentMin, setCurrentMin] = useState(null);
    const [currentMax, setCurrentMax] = useState(null);

    const formSchema = z.object({
        minPrice: z.preprocess(
            (args) => (args === '' ? undefined : args),
            z.coerce
                .number({ invalid_type_error: 'Preis muss eine Nummer sein' })
                .positive('Price must be positive')
                .optional()
        ),
        maxPrice: z.preprocess(
            (args) => (args === '' ? undefined : args),
            z.coerce
                .number({ invalid_type_error: 'Preis muss eine Nummer sein' })
                .positive('Price must be positive')
                .optional()
        ),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            minPrice: null,
            maxPrice : null,
        }
    })

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();
    
    useEffect(() => {
        const setAmount = async () => {
            await changeSearchParams("minPrice", currentMin);
                   }
    setAmount();
    }, [currentMin, currentMax])
   
    useEffect(() => {
        const setAmount = async () => {
            await changeSearchParams("maxPrice", currentMax);  
        }
        setAmount();
    },[currentMax])

    const { isSubmitting, isValid } = form.formState

    return (
        <div className=" ">
            <Form {...form}>
                <form>
                    <div className="w-full flex gap-x-2">
                        <div className="w-1/2">
                        <FormLabel className="flex justify-start items-center">
                        <Banknote className="w-4 h-4" /><div className="ml-2 font-semibold flex"> Min. <p className="sm:block hidden px-1"> Preis </p> </div>
                    </FormLabel>
                    
                        </div>
                        <div className="w-1/2">
                        <FormLabel className="flex justify-start items-center">
                        <Banknote className="w-4 h-4" /><div className="ml-2 font-semibold flex"> Max. <p className="sm:block hidden px-1"> Preis </p> </div>
                    </FormLabel>
                        </div>
                    </div>
                    <div className="flex w-full gap-x-2">
                    <FormField
                        control={form.control}
                        name="minPrice"
                        render={({ field }) => (
                            <FormField
                                control={form.control}
                                name="minPrice"
                                render={({ field }) => (
                                    <FormItem className="mt-3 ">
                                        <FormControl>
                                            <Input
                                                type="text"
                                                {...field}
                                                name="price"
                                                className=" dark:bg-[#151515] dark:border-none"
                                                placeholder="Min. Preis"
                                                onBlur={(e) => {
                                                    const rawValue = e.currentTarget.value;


                                                    const cleanedValue = rawValue.replace(/[^0-9.]/g, '');


                                                    let formattedValue = parseFloat(cleanedValue).toFixed(2);

                                                    if(isNaN(Number(formattedValue))){
                                                        formattedValue = null;
                                                    }
                                                    e.currentTarget.value = formattedValue;

                                                    setCurrentMin(Number(formattedValue));
                                                        
                                                    field.onChange(formattedValue);
                                                    
                                                }}
                                                
                                            />
                                        </FormControl>
                                        
                                        <FormMessage />
                                    </FormItem>
                                    
                                )}
                            />
                        )}
                    />
                    
                    <FormField
                                control={form.control}
                                name="maxPrice"
                                render={({ field }) => (
                                    <FormItem className="mt-3 ">
                                        <FormControl>
                                            <Input
                                                type="text"
                                                {...field}
                                                name="price"
                                                className=" dark:bg-[#151515] dark:border-none"
                                                placeholder="Max. Preis"
                                                onBlur={(e) => {
                                                    const rawValue = e.currentTarget.value;


                                                    const cleanedValue = rawValue.replace(/[^0-9.]/g, '');


                                                    let formattedValue = parseFloat(cleanedValue).toFixed(2);

                                                    if(isNaN(Number(formattedValue))){
                                                        formattedValue = null;
                                                    }
                                                    e.currentTarget.value = formattedValue;

                                                    setCurrentMax(Number(formattedValue));
                                                        
                                                    field.onChange(formattedValue);
                                                    
                                                }}
                                                
                                                
                                            />
                                        </FormControl>
                                        
                                        <FormMessage />
                                    </FormItem>
                                    
                                )}
                            />
                    </div>
                    
                       

                </form>
            </Form>
        </div>
    );
}

export default CautionSearch;