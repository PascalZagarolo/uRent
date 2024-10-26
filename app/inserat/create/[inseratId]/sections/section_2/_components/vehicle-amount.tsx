'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { inserat } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";

import { Banknote, CarTaxiFrontIcon, EuroIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";


interface VehicleAmountProps {
    thisInserat : typeof inserat.$inferSelect;
    currentValue : number;
    setCurrentValue : (value : number) => void;
}

const VehicleAmount: React.FC<VehicleAmountProps> = ({
    thisInserat,
    currentValue,
    setCurrentValue
}) => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
   

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

   

    const handleInputChange = (e : any) => {
        const inputValue = e.target.value;
        let numericInput = inputValue.replace(/[^0-9]/g, ''); 
        
        
        setCurrentValue(numericInput);
    };

    return (
        <div className=" ">
            <Form {...form}>
                <form >
                    <FormLabel className="flex justify-start items-center">
                        <CarTaxiFrontIcon className="w-4 h-4" /><p className="ml-2 font-semibold"> Anzahl deiner identischen Fahrzeuge </p>
                    </FormLabel>
                    <p className=" text-gray-800/50 text-xs dark:text-gray-200/60"> 1-20 Fahrzeuge </p>
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
                    
                </form>
            </Form>
        </div>
    );
}

export default VehicleAmount;