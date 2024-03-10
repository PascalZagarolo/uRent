'use client';


import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem,  SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Inserat, LicenseType } from "@prisma/client";
import axios from "axios";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface SelectLicenseInseratProps {
    inserat: Inserat;
}

const SelectLicenseInserat: React.FC<SelectLicenseInseratProps> = ({
    inserat
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
            category: inserat?.license
        }
    })

    const [currentLicense, setCurrentLicense] = useState<LicenseType | null>(inserat?.license);


    const onSubmit = (selectedValue: LicenseType) => {
        try {

            setCurrentLicense(selectedValue);

            const values = {
                license: selectedValue
            }

            setIsLoading(true);
            axios.patch(`/api/inserat/${inserat.id}`, values);
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
                <Label>Führerscheinklasse</Label>
                <Select
                    onValueChange={(selectedValue: LicenseType) => {
                        onSubmit(selectedValue);
                    }}
                    defaultValue={inserat.license}
                    disabled={isLoading}
                >

                    <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md w-1/2"
                        disabled={isLoading} defaultValue={inserat.license} >
                        <SelectValue
                            placeholder="Wähle die Kategorie aus"
                            

                        />
                    </SelectTrigger>

                    <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
                        <SelectItem value={null}>
                            Beliebig
                        </SelectItem>
                        {Object.values(LicenseType).map((license, index) => (
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