'use client'
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { inserat } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import {  CarTaxiFrontIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface FreeMilesProps {
    thisInserat : typeof inserat.$inferSelect;
}

const FreeMiles: React.FC<FreeMilesProps> = ({
    thisInserat
}) => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [currentValue, setCurrentValue] = useState(thisInserat.pkwAttribute?.freeMiles || 0);
    const [isUnlimited, setIsUnlimited] = useState(Number(thisInserat?.freeMiles) >= 10000000 ? true : false);

    const formSchema = z.object({
        freeMiles: z.preprocess(
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
            freeMiles: thisInserat.pkwAttribute?.freeMiles || 0
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);
            axios.patch(`/api/inserat/${thisInserat.id}/pkw`, values)
                .then(() => {
                    toast.success("Freikilometer gespeichert");
                    router.refresh();
                })
           

        } catch {
            toast.error("Fehler beim Speichern der Kaution");
        } finally {
            setIsLoading(false);
        }
    }

    const onUnlimited = async () => {
        try {

            const values = {
                freeMiles : 10_000_000
            }
            setIsLoading(true);
            axios.patch(`/api/inserat/${thisInserat.id}/pkw`, values)
                .then(() => {
                    toast.success("Freikilometer gespeichert");
                    router.refresh();
                
                })
            
        } catch(error : any) {
            console.log("Fehler : ", error);
            toast.error("Fehler beim Speichern der Kaution");
        } finally {
            setIsLoading(false);
        }
    }

    const { isSubmitting, isValid } = form.formState

    return (
        <div className=" ">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormLabel className="flex justify-start items-center">
                        <CarTaxiFrontIcon className="w-4 h-4" /><p className="ml-2 font-semibold"> Freikilometer </p>
                    </FormLabel>
                    <p className="font-semibold text-gray-800/50 text-xs dark:text-gray-100/80"> Wieviele KM? </p>
                    <FormField
                        control={form.control}
                        name="freeMiles"
                        render={({ field }) => (
                            <FormField
                                control={form.control}
                                name="freeMiles"
                                render={({ field }) => (
                                    <FormItem className="mt-2 ">
                                        <FormControl>
                                            <Input
                                                
                                                type="text"
                                                {...field}
                                                name="price"
                                                className=" dark:bg-[#151515] dark:border-none"
                                                onBlur={(e) => {
                                                    const rawValue = e.currentTarget.value;


                                                    const cleanedValue = rawValue.replace(/[^0-9.]/g, '');


                                                    let formattedValue = Number(cleanedValue).toFixed(0);

                                                    if(isNaN(Number(formattedValue))){
                                                        formattedValue = String(0);
                                                    }
                                                    if(Number(formattedValue) >= 1_000_000){
                                                        formattedValue = "999999";
                                                    }
                                                    e.currentTarget.value = formattedValue;

                                                    setCurrentValue(Number(formattedValue));
                                                        
                                                    field.onChange(formattedValue);
                                                }}
                                                disabled={(thisInserat.category ? false : true) || isUnlimited}
                                            />
                                        </FormControl>
                                        
                                        <FormMessage />
                                    </FormItem>
                                    
                                )}
                            />
                        )}
                    />
                    <div className="flex items-center gap-x-2">
                        
                        <Button
                            className="bg-white hover:bg-gray-200 text-gray-900 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]  mt-2
                             dark:bg-black dark:text-gray-100 dark:hover:bg-gray-900"
                            type="submit" disabled={!isValid || isSubmitting || currentValue == thisInserat.pkwAttribute?.freeMiles}
                        >
                            Freikilometer angeben
                        </Button>
                        <div className="space-x-2 flex items-center">
                            <Checkbox
                            onCheckedChange={(isChecked : boolean) => {
                                setIsUnlimited(isChecked);
                                if(isChecked){
                                    onUnlimited();
                                }
                            }}
                            checked={isUnlimited}
                            />
                            <Label className="text-sm">
                                Keine Kilometer Begrenzung
                            </Label>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default FreeMiles;