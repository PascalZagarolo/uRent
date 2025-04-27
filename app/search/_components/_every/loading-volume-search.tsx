'use client'

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSavedSearchParams } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { FlaskConical } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const LoadingVolumeSearch = () => {
    const currentObject: any = useSavedSearchParams((state) => state.searchParams);
    const [isLoading, setIsLoading] = useState(false);
    const [currentLiter, setCurrentLiter] = useState(currentObject['volume'] ? Number(currentObject['volume']) : null);
    const [currentMeter, setCurrentMeter] = useState(currentObject['volume'] ? Number(currentObject['volume']) * 0.001 : null);
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
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            minPrice: null,
            maxPrice: null,
        }
    });

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();
    
    useEffect(() => {
        const setAmount = async () => {
            if(currentLiter === 0) {
                deleteSearchParams("volume");
            } else {
                await changeSearchParams("volume", currentLiter);
            }
        };
        setAmount();
    }, [currentLiter]);

    const { isSubmitting, isValid } = form.formState;

    return (
        <div className="space-y-3">
            <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-indigo-900/20 text-indigo-400">
                    <FlaskConical className="w-4 h-4" />
                </div>
                <h3 className="font-medium text-sm text-gray-100">Volumen</h3>
            </div>

            <Form {...form}>
                <div className="w-full flex gap-x-2">
                    <div className="w-1/2">
                        <FormField
                            control={form.control}
                            name="minPrice"
                            render={({ field }) => (
                                <FormItem className="group">
                                    <FormControl>
                                        <Input
                                            type="text"
                                            {...field}
                                            name="price"
                                            className={cn(
                                                "h-10 transition-all duration-200 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500 border-0 bg-[#1e1e2a] text-gray-200 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24]",
                                                !currentLiter && "text-gray-500"
                                            )}
                                            placeholder="... l"
                                            defaultValue={currentLiter}
                                            onBlur={(e) => {
                                                const rawValue = e.currentTarget.value;
                                                let cleanedValue = rawValue.replace(/[^0-9.]/g, '');
                                                cleanedValue = rawValue.replace(/,/g, '.');
                                                let formattedValue = parseFloat(cleanedValue).toFixed(2);
                                                if(isNaN(Number(formattedValue))){
                                                    formattedValue = null;
                                                }
                                                e.currentTarget.value = formattedValue;
                                                setCurrentLiter(Number(formattedValue));
                                                setCurrentMeter(Number(formattedValue) * 0.001);
                                                field.onChange(formattedValue);
                                            }}
                                            disabled={!usesLiter}
                                        />
                                    </FormControl>
                                    <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${currentLiter ? 'w-full' : 'w-0'}`}></div>
                                </FormItem>
                            )}
                        />
                    </div>
                    
                    <div className="w-1/2">
                        <FormField
                            control={form.control}
                            name="maxPrice"
                            render={({ field }) => (
                                <FormItem className="group">
                                    <FormControl>
                                        <Input
                                            defaultValue={currentMeter}
                                            type="text"
                                            {...field}
                                            name="price"
                                            className={cn(
                                                "h-10 transition-all duration-200 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500 border-0 bg-[#1e1e2a] text-gray-200 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24]",
                                                !currentMeter && "text-gray-500"
                                            )}
                                            placeholder="m³"
                                            onBlur={(e) => {
                                                const rawValue = e.currentTarget.value;
                                                let cleanedValue = rawValue.replace(/[^0-9.]/g, '');
                                                cleanedValue = rawValue.replace(/,/g, '.');
                                                let formattedValue = parseFloat(cleanedValue).toFixed(2);
                                                if(isNaN(Number(formattedValue))){
                                                    formattedValue = null;
                                                }
                                                e.currentTarget.value = formattedValue;
                                                setCurrentMeter(Number(formattedValue));
                                                setCurrentLiter(Number(formattedValue) * 1000);
                                                field.onChange(formattedValue);
                                                if(formattedValue !== null) {
                                                    form.setValue("minPrice", Number(formattedValue) * 1000);
                                                } else {
                                                    form.setValue("minPrice", 0);
                                                }
                                            }}
                                            disabled={usesLiter}
                                        />
                                    </FormControl>
                                    <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${currentMeter ? 'w-full' : 'w-0'}`}></div>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </Form>
            
            <div className="flex items-center space-x-3">
                <span className={`text-sm ${usesLiter ? 'text-indigo-400 font-medium' : 'text-gray-400'}`}>Liter</span>
                <RadioGroup className="flex items-center space-x-1">
                    <div className="flex items-center">
                        <RadioGroupItem 
                            value="liter" 
                            id="liter" 
                            className="h-3 w-3 text-indigo-500 border-indigo-400" 
                            checked={usesLiter} 
                            onClick={() => setUsesLiter(true)} 
                        />
                    </div>
                    <div className="flex items-center ml-3">
                        <RadioGroupItem 
                            value="cubic" 
                            id="cubic" 
                            className="h-3 w-3 text-indigo-500 border-indigo-400" 
                            checked={!usesLiter} 
                            onClick={() => setUsesLiter(false)} 
                        />
                    </div>
                </RadioGroup>
                <span className={`text-sm ${!usesLiter ? 'text-indigo-400 font-medium' : 'text-gray-400'}`}>m³</span>
            </div>
        </div>
    );
};

export default LoadingVolumeSearch;