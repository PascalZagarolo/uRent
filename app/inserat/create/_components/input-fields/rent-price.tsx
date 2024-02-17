'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Inserat } from "@prisma/client";
import axios from "axios";
import { set } from "date-fns";
import { Banknote, EuroIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface RentPriceProps {
    inserat: Inserat;
}

const RentPrice: React.FC<RentPriceProps> = ({
    inserat
}) => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [currentValue, setCurrentValue] = useState(inserat.price || 0);

    const formSchema = z.object({
        price: z.preprocess(
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
            price: inserat.price || 0
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);
            axios.patch(`/api/inserat/${inserat.id}`, values);
            toast.success("Preis erfolgreich gespeichert");
            setTimeout(() => {
                router.refresh();
            }, 1000)
        } catch {
            toast.error("Fehler beim Speichern des Preises");
        } finally {
            setIsLoading(false);
        }
    }

    const { isSubmitting, isValid } = form.formState

    return (
        <div className="ml-4 mt-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormLabel className="flex justify-start items-center">
                        <Banknote /><p className="ml-2 font-semibold"> Mietgebühr </p>
                    </FormLabel>
                    <p className="font-semibold text-gray-800/50 text-xs"> Alle angaben in EUR </p>
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem className="mt-2 flex">
                                        <FormControl>
                                            <Input
                                                type="text"
                                                {...field}
                                                name="price"
                                                className="w-1/6 dark:bg-[#151515] dark:border-gray-300"
                                                onBlur={(e) => {
                                                    const rawValue = e.currentTarget.value;


                                                    const cleanedValue = rawValue.replace(/[^0-9.]/g, '');


                                                    const formattedValue = parseFloat(cleanedValue).toFixed(2);


                                                    e.currentTarget.value = formattedValue;

                                                    setCurrentValue(Number(formattedValue));

                                                    field.onChange(formattedValue);
                                                }}
                                                disabled={inserat.category ? false : true}
                                            />
                                        </FormControl>
                                        <EuroIcon className="ml-2 h-4 w-4" />
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
                            type="submit" disabled={!isValid || isSubmitting || currentValue == inserat.price}
                        >
                            Preis festlegen
                        </Button>
                        
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default RentPrice;