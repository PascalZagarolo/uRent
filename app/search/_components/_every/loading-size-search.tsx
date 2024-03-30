'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSavedSearchParams } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";



import { Banknote } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";



const LoadingSizeSearch = () => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [currentLength, setCurrentLength] = useState(null);
    const [currentWidth, setCurrentWidth] = useState(null);
    const [currentHeight, setCurrentHeight] = useState(null);
    const [usesLiter, setUsesLiter] = useState(true);

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
        midPrice: z.preprocess(
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
            maxPrice: null,
            midPrice: null
        }
    })

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    useEffect(() => {
        const setAmount = async () => {
            if (currentLength === 0) {
                deleteSearchParams("loading_l");
            } else {
                await changeSearchParams("loading_l", currentLength);
            }
        }
        setAmount();
    }, [currentLength])

    useEffect(() => {
        const setAmount = async () => {
            if (currentWidth === 0) {
                deleteSearchParams("loading_b");
            } else {
                await changeSearchParams("loading_b", currentWidth);
            }
        }
        setAmount();
    }, [currentWidth])

    useEffect(() => {
        const setAmount = async () => {
            if (currentHeight === 0) {
                deleteSearchParams("loading_h");
            } else {
                await changeSearchParams("loading_h", currentHeight);
            }
        }
        setAmount();
    }, [currentHeight])



    const { isSubmitting, isValid } = form.formState

    return (
        <div className=" ">
            <h3 className="font-semibold">
                Lademaßstab
            </h3>
            <Form {...form}>
                <form>
                    <div className="w-full flex mt-3">

                        <div className="w-1/3">
                            <FormLabel className="flex justify-start items-center">
                                <div className="ml-2 font-semibold flex"> Länge </div>
                            </FormLabel>
                        </div>

                        <div className="w-1/3">
                            <FormLabel className="flex justify-start items-center">
                                <div className="ml-2 font-semibold flex"> Breite  </div>
                            </FormLabel>
                        </div>

                        <div className="w-1/3">
                            <FormLabel className="flex justify-start items-center">
                                <div className="ml-2 font-semibold flex"> Höhe  </div>
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
                                                    placeholder="in Meter"
                                                    onBlur={(e) => {
                                                        const rawValue = e.currentTarget.value;


                                                        let cleanedValue = rawValue.replace(/[^0-9.]/g, '');
                                                        cleanedValue = rawValue.replace(/,/g, '.');

                                                        let formattedValue = parseFloat(cleanedValue).toFixed(2);

                                                        if (isNaN(Number(formattedValue))) {
                                                            formattedValue = null;
                                                        }
                                                        e.currentTarget.value = formattedValue;

                                                        setCurrentLength(Number(formattedValue));
                                                        
                                                        field.onChange(formattedValue);


                                                    }}
                                                    disabled={!usesLiter}
                                                />
                                            </FormControl>


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
                                            placeholder="in Meter"
                                            onBlur={(e) => {
                                                const rawValue = e.currentTarget.value;


                                                let cleanedValue = rawValue.replace(/[^0-9.]/g, '');
                                                cleanedValue = rawValue.replace(/,/g, '.');

                                                let formattedValue = parseFloat(cleanedValue).toFixed(2);

                                                if (isNaN(Number(formattedValue))) {
                                                    formattedValue = null;
                                                }
                                                e.currentTarget.value = formattedValue;

                                                setCurrentWidth(Number(formattedValue));
                                                

                                                field.onChange(formattedValue);
                                               


                                            }}
                                            

                                        />
                                    </FormControl>


                                </FormItem>

                            )}
                        />

                        <FormField
                            control={form.control}
                            name="midPrice"
                            render={({ field }) => (
                                <FormItem className="mt-3 ">
                                    <FormControl>
                                        <Input
                                            type="text"
                                            {...field}
                                            name="price"
                                            className=" dark:bg-[#151515] dark:border-none"
                                            placeholder="in Meter"
                                            onBlur={(e) => {
                                                const rawValue = e.currentTarget.value;


                                                let cleanedValue = rawValue.replace(/[^0-9.]/g, '');
                                                cleanedValue = rawValue.replace(/,/g, '.');

                                                let formattedValue = parseFloat(cleanedValue).toFixed(2);

                                                if (isNaN(Number(formattedValue))) {
                                                    formattedValue = null;
                                                }
                                                e.currentTarget.value = formattedValue;

                                                setCurrentHeight(Number(formattedValue));
                                                

                                                field.onChange(formattedValue);
                                                


                                            }}
                                            

                                        />
                                    </FormControl>


                                </FormItem>

                            )}
                        />
                    </div>



                </form>
            </Form>

        </div>
    );
}

export default LoadingSizeSearch;