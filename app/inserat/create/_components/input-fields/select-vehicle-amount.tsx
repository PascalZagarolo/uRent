'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";

import { Banknote, CarTaxiFrontIcon, EuroIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { inserat } from '../../../../../db/schema';

interface SelectVehicleAmountProps {
    thisInserat : typeof inserat.$inferSelect;
}

const SelectVehicleAmount: React.FC<SelectVehicleAmountProps> = ({
    thisInserat
}) => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [currentValue, setCurrentValue] = useState(thisInserat.amount);

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
        if(thisInserat.multi === false) {
            setCurrentValue(1);
            const values = {
                amount : 1
            }
            axios.patch(`/api/inserat/${thisInserat.id}`, values);
        } else if(thisInserat.multi === true) {
            setCurrentValue(thisInserat.amount >= 2 ? thisInserat.amount : 2);
            
        }
    }, [thisInserat.multi])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: thisInserat?.multi === true ? thisInserat.amount || 2 : 1
        }
    })

    const onSubmit = () => {
        try {

            if(currentValue > 20) {
                return toast.error("Maximal 20 Fahrzeuge erlaubt");
            }

            const values = {
                amount : Number(currentValue)
            }

            setIsLoading(true);
            axios.patch(`/api/inserat/${thisInserat.id}`, values);
            
            setTimeout(() => {
                router.refresh();
            }, 1000)
        } catch {
            toast.error("Fehler beim Speichern der Kaution");
        } finally {
            setIsLoading(false);
        }
    }

    const handleInputChange = (e : any) => {
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
                    <p className="font-semibold text-gray-800/50 text-xs dark:text-gray-100/80"> 1-20 Fahrzeuge </p>
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
                                                max={20}
                                                name="price"
                                                className=" dark:bg-[#151515] dark:border-none"
                                                onChange={handleInputChange}
                                                disabled={thisInserat.multi === false}
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
                            className="bg-white hover:bg-gray-200 text-gray-900 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mt-6
                             dark:bg-black dark:text-gray-100 dark:hover:bg-gray-900"
                            onClick={onSubmit} disabled={!currentValue || 
                                currentValue == thisInserat.amount || thisInserat.multi === false
                                || currentValue > 20
                            
                            }
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