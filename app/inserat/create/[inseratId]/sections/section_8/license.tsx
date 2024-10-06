'use client';


import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem,  SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { User2Icon } from "lucide-react";
import { LicenseEnumRender } from "@/db/schema";

interface SelectLicenseCreationProps {
    currentValue : string;
    setCurrentValue : (value) => void;
    category : string
}

const SelectLicenseCreation: React.FC<SelectLicenseCreationProps> = ({
    currentValue,
    setCurrentValue,
    category
}) => {


    const formSchema = z.object({
        category: z.string({
            required_error: "Bitte wähle eine Kategorie aus"
        })
    })



    const [isLoading, setIsLoading] = useState(false);

    





   
   

    return (
        <div className="flex w-full">



            <div className="w-full">
            <Label className="flex justify-start items-center text-sm">
                        <p className="font-semibold"> Führerscheinklasse </p>
                    </Label>
                    <p className=" text-gray-800/50 text-xs dark:text-gray-200/60"> Benötigter Führerschein? </p>
                <Select
                //@ts-ignore
                    onValueChange={(selectedValue: typeof LicenseEnumRender) => {
                        setCurrentValue(selectedValue);
                    }}
                    value={category === "PKW" ? "B" : currentValue}
                    defaultValue={category === "PKW" ? "B" : currentValue}
                    disabled={isLoading || category === "PKW"}
                >

                    <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 
                    rounded-md w-full"
                        disabled={isLoading || category === "PKW"}  >
                        <SelectValue
                            placeholder="Wähle die Kategorie aus"
                            

                        />
                    </SelectTrigger>

                    <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
                        <SelectItem value={null}>
                            Beliebig
                        </SelectItem>
                        {Object.values(LicenseEnumRender).map((license, index) => (
                            <SelectItem key={index} value={license}>
                                {license}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>





        </div>
    );
}

export default SelectLicenseCreation;