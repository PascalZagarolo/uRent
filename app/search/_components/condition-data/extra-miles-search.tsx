'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSavedSearchParams } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GiReceiveMoney } from "react-icons/gi";
import { z } from "zod";



const ExtraMilesSearch = () => {

    const currentObject: any = useSavedSearchParams((state) => state.searchParams)

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [currentValue, setCurrentValue] = useState<number | null>(0);
    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();
    const savedParams = useSavedSearchParams((state) => state.searchParams);

    const setCaution = async (currentCaution: number) => {
        await changeSearchParams("extraCost", currentCaution);
    }

    

    const deleteCaution = () => {
        deleteSearchParams("extraCost")
    }

    const formSchema = z.object({
        caution: z.preprocess(
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
            caution: currentObject["extraCost"] ? currentObject["extraCost"] : null
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
                    <FormLabel className="flex justify-start items-center">
                        <GiReceiveMoney  className="w-4 h-4" /><p className="ml-2 font-semibold"> Kosten/Km </p>
                    </FormLabel>

                    <FormField
                        control={form.control}
                        name="caution"
                        render={({ field }) => (
                            <FormField
                                control={form.control}
                                name="caution"
                                render={({ field }) => (
                                    <FormItem className="mt-2 ">
                                        <FormControl>
                                            <Input
                                                type="text"
                                                {...field}
                                                name="price"
                                                className="dark:bg-[#151515] dark:border-none"
                                                placeholder="Preis pro/Km"
                                                disabled={//@ts-ignore
                                                    savedParams['category'] !== 'PKW'}
                                                onBlur={(e) => {
                                                    const rawValue = e.currentTarget.value;
                                                    const cleanedValue = rawValue.replace(/[^0-9.]/g, '');
                                                    let formattedValue = parseFloat(cleanedValue).toFixed(2);

                                                    if (isNaN(Number(formattedValue))) {
                                                        formattedValue = null;
                                                    }

                                                    e.currentTarget.value = formattedValue;
                                                    setCurrentValue(Number(formattedValue));
                                                    field.onChange(formattedValue);

                                                    if (formattedValue) {
                                                        setCaution(Number(formattedValue));
                                                    } else {
                                                        deleteCaution();
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

export default ExtraMilesSearch;