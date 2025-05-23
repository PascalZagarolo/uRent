'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { inserat } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";

import { Banknote } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface SelectCautionProps {
    thisInserat : typeof inserat.$inferSelect;
}

const SelectCaution: React.FC<SelectCautionProps> = ({
    thisInserat
}) => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [currentValue, setCurrentValue] = useState(thisInserat.caution || 0);

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
            caution: thisInserat.caution || null
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);
            axios.patch(`/api/inserat/${thisInserat.id}`, values);
            toast.success("Kaution gespeichert");
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
                        <Banknote className="w-4 h-4" /><p className="ml-2 font-semibold"> Kautionsgebühr </p>
                    </FormLabel>
                    <p className="font-semibold text-gray-800/50 text-xs dark:text-gray-100/80"> Alle angaben in EUR </p>
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
                                                className=" dark:bg-[#151515] dark:border-none"
                                                placeholder="Gebe deine Kaution ein"
                                                max={999999}
                                                maxLength={7}
                                                onBlur={(e) => {
                                                    const rawValue = e.currentTarget.value;


                                                    let cleanedValue = rawValue.replace(/[^0-9.]/g, '');
                                                    cleanedValue = rawValue.replace(/,/g, '.');

                                                    let formattedValue = parseFloat(cleanedValue).toFixed(2);

                                                    if(isNaN(Number(formattedValue))){
                                                        formattedValue = null;
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
                            type="submit" disabled={!isValid || isSubmitting || currentValue == thisInserat.caution}
                        >
                            Kaution festlegen
                        </Button>
                        
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default SelectCaution;