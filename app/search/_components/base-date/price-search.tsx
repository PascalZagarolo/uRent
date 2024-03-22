'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";



import { Banknote } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";



const CautionSearch = () => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [currentMin, setCurrentMin] = useState(0);
    const [currentMax, setCurrentMax] = useState(0);

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
            minPrice: 0,
            maxPrice : 0,
        }
    })

    const onSubmit = () => {
        console.log(2)
    }
   

    const { isSubmitting, isValid } = form.formState

    return (
        <div className=" ">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
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
                                                onBlur={(e) => {
                                                    const rawValue = e.currentTarget.value;


                                                    const cleanedValue = rawValue.replace(/[^0-9.]/g, '');


                                                    let formattedValue = parseFloat(cleanedValue).toFixed(2);

                                                    if(isNaN(Number(formattedValue))){
                                                        formattedValue = String(0);
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
                                                onBlur={(e) => {
                                                    const rawValue = e.currentTarget.value;


                                                    const cleanedValue = rawValue.replace(/[^0-9.]/g, '');


                                                    let formattedValue = parseFloat(cleanedValue).toFixed(2);

                                                    if(isNaN(Number(formattedValue))){
                                                        formattedValue = String(0);
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