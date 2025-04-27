'use client'

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSavedSearchParams } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { BoxIcon } from "lucide-react";

const LoadingSizeSearch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentLength, setCurrentLength] = useState(null);
    const [currentWidth, setCurrentWidth] = useState(null);
    const [currentHeight, setCurrentHeight] = useState(null);

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
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            minPrice: null,
            maxPrice: null,
            midPrice: null
        }
    });

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    useEffect(() => {
        const setAmount = async () => {
            if (currentLength === 0) {
                deleteSearchParams("loading_l");
            } else {
                await changeSearchParams("loading_l", currentLength);
            }
        };
        setAmount();
    }, [currentLength]);

    useEffect(() => {
        const setAmount = async () => {
            if (currentWidth === 0) {
                deleteSearchParams("loading_b");
            } else {
                await changeSearchParams("loading_b", currentWidth);
            }
        };
        setAmount();
    }, [currentWidth]);

    useEffect(() => {
        const setAmount = async () => {
            if (currentHeight === 0) {
                deleteSearchParams("loading_h");
            } else {
                await changeSearchParams("loading_h", currentHeight);
            }
        };
        setAmount();
    }, [currentHeight]);

    const { isSubmitting, isValid } = form.formState;

    return (
        <div className="space-y-3">
            <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-indigo-900/20 text-indigo-400">
                    <BoxIcon className="w-4 h-4" />
                </div>
                <h3 className="font-medium text-sm text-gray-100">Laderaummaße</h3>
            </div>
            
            <Form {...form}>
                <div className="flex w-full gap-x-2">
                    <div className="w-1/3 group">
                        <FormField
                            control={form.control}
                            name="minPrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            {...field}
                                            name="price"
                                            className={cn(
                                                "h-10 transition-all duration-200 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500 border-0 bg-[#1e1e2a] text-gray-200 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24]",
                                                !currentLength && "text-gray-500"
                                            )}
                                            placeholder="Länge (m)"
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
                                        />
                                    </FormControl>
                                    <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${currentLength ? 'w-full' : 'w-0'}`}></div>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="w-1/3 group">
                        <FormField
                            control={form.control}
                            name="maxPrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            {...field}
                                            name="price"
                                            className={cn(
                                                "h-10 transition-all duration-200 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500 border-0 bg-[#1e1e2a] text-gray-200 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24]",
                                                !currentWidth && "text-gray-500"
                                            )}
                                            placeholder="Breite (m)"
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
                                    <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${currentWidth ? 'w-full' : 'w-0'}`}></div>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="w-1/3 group">
                        <FormField
                            control={form.control}
                            name="midPrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            {...field}
                                            name="price"
                                            className={cn(
                                                "h-10 transition-all duration-200 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500 border-0 bg-[#1e1e2a] text-gray-200 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24]",
                                                !currentHeight && "text-gray-500"
                                            )}
                                            placeholder="Höhe (m)"
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
                                    <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${currentHeight ? 'w-full' : 'w-0'}`}></div>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default LoadingSizeSearch;