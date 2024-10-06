'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { inserat } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";

import { Banknote } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface SelectCautionCreationProps {
    currentValue : string;
    setCurrentValue : (value) => void
}

const SelectCautionCreation: React.FC<SelectCautionCreationProps> = ({
    currentValue,
    setCurrentValue
}) => {

    const router = useRouter();



    

   



    return (
        <div className=" ">
       
                
                    <Label className="flex justify-start items-center">
                        <p className="font-semibold text-sm text-gray-200"> Kautionsgebühr </p>
                    </Label>
                    <p className=" text-gray-800/50 text-xs dark:text-gray-200/60"> Alle angaben in EUR </p>
                    
                                            <Input
                                                type="text"
                                             
                                                name="price"
                                                className=" dark:bg-[#151515] dark:border-none mt-2"
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
                                                        
         
                                                }}

                                            />
                                  
                                    
                    
              
           
        </div>
    );
}

export default SelectCautionCreation;