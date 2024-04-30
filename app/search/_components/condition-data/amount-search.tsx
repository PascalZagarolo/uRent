'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";


import { CarTaxiFrontIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { useSavedSearchParams } from '../../../../store';



const AmountSearch = () => {

    const currentObject: any = useSavedSearchParams((state) => state.searchParams)

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [currentValue, setCurrentValue] = useState<number | null>(null);
    const savedParams = useSavedSearchParams((state) => state.searchParams);
    
    
    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();
    const setAmount = async (currentAmount: number) => {
            await changeSearchParams("amount", currentAmount);    
    }

    const deleteAmount = () => {
        deleteSearchParams("amount")
    }
    const formSchema = z.object({
        amount: z.preprocess(
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
            amount: currentObject["amount"] ? currentObject["amount"] : null
        }
    })
    
   
    

    const { isSubmitting, isValid } = form.formState

    return (
        <div className=" ">
            <Form {...form}>
                <form>
                    <FormLabel className="flex justify-start items-center">
                        <CarTaxiFrontIcon className="w-4 h-4" /><p className="ml-2 font-semibold"> Stückzahl </p>
                    </FormLabel>
                    
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem className="mt-2 ">
                                        <FormControl>
                                            <Input
                                                type="text"
                                                {...field}
                                                name="price"
                                                placeholder="Stückzahl..."
                                                className=" dark:bg-[#151515] dark:border-none"
                                                onBlur={(e) => {
                                                    const rawValue = e.currentTarget.value;


                                                    const cleanedValue = rawValue.replace(/[^0-9.]/g, '');


                                                    let formattedValue = Number(cleanedValue).toFixed(0);

                                                    if (isNaN(Number(formattedValue)) || formattedValue === '0') {
                                                        formattedValue = null;
                                                    }
                                                    
                                                    e.currentTarget.value = formattedValue;
                                                    setCurrentValue(Number(formattedValue));
                                                    field.onChange(formattedValue);
                                                    if (formattedValue) {
                                                        setAmount(Number(formattedValue));
                                                    } else {
                                                        deleteAmount();
                                                    }
                                                    
                                                }}
                                                
                                            />
                                        </FormControl>
                                        
                                        <FormMessage />
                                    </FormItem>
                                    
                                )}
                            />
                        )}
                    />
                    
                </form>
            </Form>
        </div>
    );
}

export default AmountSearch;