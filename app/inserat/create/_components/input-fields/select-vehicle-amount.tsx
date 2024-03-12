'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Inserat, PkwAttribute } from "@prisma/client";
import axios from "axios";
import { set } from "date-fns";
import { Banknote, CarTaxiFrontIcon, EuroIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface SelectVehicleAmountProps {
    inserat: Inserat;
}

const SelectVehicleAmount: React.FC<SelectVehicleAmountProps> = ({
    inserat
}) => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [currentValue, setCurrentValue] = useState(inserat.amount || 1);

    const formSchema = z.object({
        amount: z.preprocess(
            (args) => (args === '' ? undefined : args),
            z.coerce
                .number({ invalid_type_error: 'Preis muss eine Nummer sein' })
                .positive('Price must be positive')
                .optional()
        ),
    })

    useEffect(() => {
        if(inserat.multi === false) {
            setCurrentValue(1);
            const values = {
                amount : 1
            }
            axios.patch(`/api/inserat/${inserat.id}`, values);
        } if(inserat.multi === true) {
            setCurrentValue(2);
            
        }
    }, [inserat.multi])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: inserat?.multi === true ? inserat.amount || 2 : 1
        }
    })

    const onSubmit = () => {
        try {

            const values = {
                amount : Number(currentValue)
            }

            setIsLoading(true);
            axios.patch(`/api/inserat/${inserat.id}`, values);
            
            setTimeout(() => {
                router.refresh();
            }, 1000)
        } catch {
            toast.error("Fehler beim Speichern der Kaution");
        } finally {
            setIsLoading(false);
        }
    }

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        let numericInput = inputValue.replace(/[^0-9]/g, ''); 
        
        
        setCurrentValue(numericInput);
    };

    return (
        <div className=" ">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormLabel className="flex justify-start items-center">
                        <CarTaxiFrontIcon className="w-4 h-4" /><p className="ml-2 font-semibold"> Anzahl </p>
                    </FormLabel>
                    <p className="font-semibold text-gray-800/50 text-xs dark:text-gray-100/80"> Wie viele genau? </p>
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem className="mt-2 ">
                                        <FormControl>
                                            <Input
                                                type="number"
                                                {...field}
                                                name="price"
                                                className=" dark:bg-[#151515] dark:border-none"
                                                onChange={handleInputChange}
                                                disabled={inserat.multi === false}
                                                value={currentValue}
                                                onBlur={() => {currentValue < 2 && setCurrentValue(2)}}
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
                            onClick={onSubmit} disabled={!currentValue || Number(currentValue) === inserat.amount || inserat.multi === false}
                        >
                            Anzahl angeben
                        </Button>
                        
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default SelectVehicleAmount;