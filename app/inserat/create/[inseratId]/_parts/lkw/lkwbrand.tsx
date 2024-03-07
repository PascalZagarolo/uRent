'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FuelType, LkwBrand } from "@prisma/client";



import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

interface LkwBrandFormProps {
    brand: LkwBrand;
}

const LkwBrandForm: React.FC<LkwBrandFormProps> = ({
    brand
}) => {

    const [currentBrand, setCurrentBrand] = useState<LkwBrand | null>(brand || null);
    const [isLoading, setIsLoading] = useState(false);



    const router = useRouter();

    const params = useParams();


    const onSubmit = (selectedValue: LkwBrand) => {
        try {
            setCurrentBrand(selectedValue);
            const values = {
                lkwBrand: selectedValue
            }
            setIsLoading(true);
            axios.patch(`/api/inserat/${params.inseratId}/lkw`, values);
            toast.success("Anzahl Türen erfolgreich gespeichert : " + values.lkwBrand);
            setTimeout(() => {
                router.refresh();
            }, 400)
        } catch {
            toast.error("Fehler beim Speichern der Kategorie");
        } finally {
            setIsLoading(false);
        }
    }

    function removeUnderscore(inputString: string): string {
        const outputString = inputString.replace(/_/g, ' ');
        return outputString;
    }

    return (
        <div className="w-full">
            <div className="w-1/2">
                <Label>Lkw-Marke</Label>
                <Select
                    onValueChange={(brand: LkwBrand) => {
                        onSubmit(brand);
                    }}
                    
                    disabled={isLoading}
                    value={brand || currentBrand }
                    
                >

                    <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md "
                        disabled={isLoading} >
                        <SelectValue
                            placeholder="Wähle die Kategorie aus"
                            
                            className="placeholder:text-gray-100"
                        />
                    </SelectTrigger>

                    <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
                        {Object.values(LkwBrand).map((brand, index) => (
                            <SelectItem key={index} value={brand}>
                                {removeUnderscore(brand)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default LkwBrandForm;