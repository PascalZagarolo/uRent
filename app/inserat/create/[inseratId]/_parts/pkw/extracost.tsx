'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";

import { CarTaxiFrontIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { inserat } from '../../../../../../db/schema';

interface ExtraCostProps {
    thisInserat : typeof inserat.$inferSelect;
}

const ExtraCost: React.FC<ExtraCostProps> = ({
    thisInserat
}) => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [currentValue, setCurrentValue] = useState(thisInserat.pkwAttribute?.extraCost || 0);

    const formSchema = z.object({
        extraCost: z.preprocess(
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
            extraCost: thisInserat.pkwAttribute?.extraCost || 0
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);
            axios.patch(`/api/inserat/${thisInserat.id}/pkw`, values);
            toast.success("Zusatzkosten gespeichert");
            setTimeout(() => {
                router.refresh();
            }, 1000)
        } catch {
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
                        <CarTaxiFrontIcon className="w-4 h-4" /><p className="ml-2 font-semibold"> Zusatskosten/KM </p>
                    </FormLabel>
                    <p className="font-semibold text-gray-800/50 text-xs dark:text-gray-100/80"> Wie viel mehr pro KM?</p>
                    <FormField
                        control={form.control}
                        name="extraCost"
                        render={({ field }) => (
                            <FormField
                                control={form.control}
                                name="extraCost"
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


                                                    let cleanedValue = rawValue.replace(/[^0-9.]/g, '');
                                                    cleanedValue = rawValue.replace(/,/g, '.');

                                                    let formattedValue = Number(cleanedValue).toFixed(2);

                                                    if(isNaN(Number(formattedValue))){
                                                        formattedValue = String(2);
                                                    }
                                                    if(Number(formattedValue) >= 1_000_000){
                                                        formattedValue = "999999";
                                                    }
                                                    e.currentTarget.value = formattedValue;

                                                    setCurrentValue(Number(formattedValue));
                                                        
                                                    field.onChange(formattedValue);
                                                }}
                                                disabled={thisInserat.category ? false : true}
                                            />
                                        </FormControl>
                                        
                                        <FormMessage />
                                    </FormItem>
                                    
                                )}
                            />
                        )}
                    />
                    <div>
                        <Button
                            className="bg-white hover:bg-gray-200 text-gray-900 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]  mt-2
                             dark:bg-black dark:text-gray-100 dark:hover:bg-gray-900"
                            type="submit" disabled={!isValid || isSubmitting || currentValue == thisInserat.pkwAttribute?.extraCost}
                        >
                            Zusatzkosten angeben
                        </Button>
                        
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default ExtraCost;