'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSavedSearchParams } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";


import { Banknote} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";



const CautionSearch = () => {


    const currentObject: any = useSavedSearchParams((state) => state.searchParams)

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [currentValue, setCurrentValue] = useState<number | null>(null);
    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();
    const savedParams = useSavedSearchParams((state) => state.searchParams);

    const setCaution = async (currentCaution: number) => {
        await changeSearchParams("caution", currentCaution);
    }

    

    const deleteCaution = () => {
        deleteSearchParams("caution")
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
            caution: currentObject["caution"] ? currentObject["caution"] : 0
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
                        <Banknote className="w-4 h-4" /><p className="ml-2 font-semibold"> Kautionsgebühr </p>
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
                                                placeholder="Wie hoch darf die Kaution sein?"
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

export default CautionSearch;