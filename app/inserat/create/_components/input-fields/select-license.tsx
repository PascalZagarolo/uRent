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
import { inserat, LicenseEnumRender } from '../../../../../db/schema';
import { User2Icon } from "lucide-react";

interface SelectLicenseInseratProps {
    thisInserat : typeof inserat.$inferSelect;
}

const SelectLicenseInserat: React.FC<SelectLicenseInseratProps> = ({
    thisInserat
}) => {


    const formSchema = z.object({
        category: z.string({
            required_error: "Bitte wähle eine Kategorie aus"
        })
    })

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            category: thisInserat?.license
        }
    })

    const [currentLicense, setCurrentLicense] = useState<typeof LicenseEnumRender | null>(thisInserat?.license);


    const onSubmit = (selectedValue: typeof LicenseEnumRender) => {
        try {

            setCurrentLicense(selectedValue);

            const values = {
                license: selectedValue
            }

            setIsLoading(true);
            axios.patch(`/api/inserat/${thisInserat.id}`, values);
            toast.success("Führerscheinklasse : " + values.license);
            setTimeout(() => {
                router.refresh();
            }, 400)
        } catch {
            toast.error("Fehler beim Speichern der Kategorie");
        } finally {
            setIsLoading(false);
        }
    }

   

    return (
        <div className="flex w-full">



            <div className="w-full">
            <Label className="flex justify-start items-center ">
                        <User2Icon className="w-4 h-4" /><p className="ml-2 font-semibold"> Führerscheinklasse </p>
                    </Label>
                    <p className="font-semibold text-gray-800/50 text-xs dark:text-gray-100/80  truncate"> Benötigter Führerschein? </p>
                <Select
                //@ts-ignore
                    onValueChange={(selectedValue: typeof LicenseEnumRender) => {
                        onSubmit(selectedValue);
                    }}
                    value={thisInserat.category === "PKW" ? "B" : thisInserat.license}
                    defaultValue={thisInserat.category === "PKW" ? "B" : thisInserat.license}
                    disabled={isLoading}
                >

                    <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 
                    rounded-md w-full"
                        disabled={isLoading || thisInserat.category === "PKW"}  >
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

export default SelectLicenseInserat;