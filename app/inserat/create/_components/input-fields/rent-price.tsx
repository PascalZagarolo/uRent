'use client'
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { inserat } from "@/db/schema";
import { useUnsavedChanges } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { set } from "date-fns";
import { Banknote, EuroIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface SelectPriceProps {
    thisInserat: typeof inserat.$inferSelect;
}

const SelectPrice: React.FC<SelectPriceProps> = ({
    thisInserat
}) => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [currentValue, setCurrentValue] = useState(thisInserat.price);
    const [isDailyPrice, setDailyPrice] = useState(thisInserat.dailyPrice || false);

    const {currentChanges, changeCurrent, deleteCurrent} = useUnsavedChanges()

    useEffect(() => {
        const setAmount = async () => {
            if(currentValue) {
                await changeCurrent("price", Number(currentValue)?.toFixed(2));
            } else {
                console.log("delete")
                deleteCurrent("price");
            }
        }
        setAmount();
    }, [currentValue])
 
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
            price: thisInserat.price || null
        }
    })

    const onSubmit = (value: z.infer<typeof formSchema>) => {
        try {
            const values = {
                price : value.price.toFixed(2)
            }
            setIsLoading(true);
            axios.patch(`/api/inserat/${thisInserat.id}`, values);
            toast.success("Preis erfolgreich gespeichert");
            setTimeout(() => {
                router.refresh();
            }, 1000)
        } catch {
            toast.error("Fehler beim Speichern der Kaution");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const values = {
            dailyPrice : isDailyPrice
        }
        axios.patch(`/api/inserat/${thisInserat.id}`, values);
    }, [isDailyPrice])

    useEffect(() => {
        if(thisInserat.annual) {
            setDailyPrice(true)
        }
    },[thisInserat.annual])

    const { isSubmitting, isValid } = form.formState

    return (
        <div className=" ">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormLabel className="flex justify-start items-center">
                        <Banknote className="w-4 h-4" /><p className="ml-2 font-semibold"> Mietpreis *</p>
                    </FormLabel>
                    <p className="font-semibold text-gray-800/50 text-xs dark:text-gray-100/80"> Alle angaben in EUR </p>
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem className="mt-2">
                                        <FormControl>
                                            <Input
                                                type="text"
                                                {...field}
                                                name="price"
                                                className=" dark:bg-[#151515] dark:border-none"
                                                placeholder="Mietpreis hinzufügen"
                                                onBlur={(e) => {
                                                    const rawValue = e.currentTarget.value;

                                                    
                                                    let cleanedValue = rawValue.replace(/[^0-9.]/g, '');
                                                    cleanedValue = rawValue.replace(/,/g, '.');

                                                    let formattedValue = parseFloat(cleanedValue).toFixed(2);

                                                    if(isNaN(Number(formattedValue))){
                                                        formattedValue = null;
                                                    }
                                                    e.currentTarget.value = formattedValue;

                                                    setCurrentValue(Number(formattedValue));
                                                        
                                                    field.onChange(formattedValue);
                                                }}
                                                
                                            />
                                        </FormControl>
                                        
                                        <FormMessage />
                                    </FormItem>
                                    
                                )}
                            />
                        )}
                    />
                    <div className="w-full flex items-center">
                        <Button
                            className="bg-white hover:bg-gray-200 text-gray-900 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]  mt-2
                             dark:bg-black dark:text-gray-100 dark:hover:bg-gray-900"
                            type="submit" disabled={!isValid || isSubmitting || currentValue == thisInserat.price}
                        >
                            Preis festlegen
                        </Button>
                        <div className="ml-auto space-x-2">
                        <Label>
                            Preis pro Tag
                        </Label>
                        <Checkbox
                        onCheckedChange={(checked) => {setDailyPrice(!isDailyPrice)}}
                        checked={isDailyPrice}
                        disabled={thisInserat.annual}
                        />
                      
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default SelectPrice;