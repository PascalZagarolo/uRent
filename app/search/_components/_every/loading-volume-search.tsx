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



const LoadingVolumeSearch = () => {

    const router = useRouter();

    const currentObject : any = useSavedSearchParams((state) => state.searchParams)

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
            if(currentLiter === 0) {
                deleteSearchParams("volume");
            } else {
                await changeSearchParams("volume", currentLiter);
            }
        }
    setAmount();
    }, [currentLiter])
   
    

    const { isSubmitting, isValid } = form.formState

    return (
        <div className=" ">
            <h3 className="font-semibold">
                Volumen
            </h3>
            <Form {...form}>
                <form>
                    <div className="w-full flex gap-x-2 mt-3">
                    
                        <div className="w-1/2">
                        <FormLabel className="flex justify-start items-center">
                        <div className="ml-2 font-semibold flex"> Liter </div>
                    </FormLabel>
                    
                        </div>
                        <div className="w-1/2">
                        <FormLabel className="flex justify-start items-center">
                        <div className="ml-2 font-semibold flex"> Meter  </div>
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
                                            defaultValue={currentMeter}
                                                type="text"
                                                {...field}
                                                name="price"
                                                className=" dark:bg-[#151515] dark:border-none"
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
                                                        //@ts-ignore
                                                        form.setValue("minPrice", formattedValue * 1000)
                                                    } else {
                                                        form.setValue("minPrice", 0)
                                                    }
                                                    
                                                    
                                                }}
                                                disabled={usesLiter}
                                                
                                            />
                                        </FormControl>
                                        
                                        
                                    </FormItem>
                                    
                                )}
                            />
                    </div>
                    
                       

                </form>
            </Form>
            <RadioGroup className="mt-2" defaultValue="PS">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="PS" id="PS" className="h-2 w-2" onClick={() => { setUsesLiter(true) }} />
                    <Label htmlFor="PS" className="text-sm"><p className="text-sm"> Liter </p></Label>
                    <RadioGroupItem value="KW" id="KW" className="h-2 w-2" onClick={() => { setUsesLiter(false) }} />
                    <Label htmlFor="KW" className="text-sm"><p className="text-sm"> m³ </p></Label>
                </div>
            </RadioGroup>
        </div>
    );
}

export default LoadingVolumeSearch;