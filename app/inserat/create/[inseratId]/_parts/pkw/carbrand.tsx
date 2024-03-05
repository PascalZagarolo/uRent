'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CarBrands, FuelType } from "@prisma/client";



import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

interface CarBrandFormProps {
    brand: CarBrands;
}

const CarBrandForm: React.FC<CarBrandFormProps> = ({
    brand
}) => {

    const [currentBrand, setCurrentBrand] = useState<CarBrands | null>(brand || null);
    const [isLoading, setIsLoading] = useState(false);



    const router = useRouter();

    const params = useParams();


    const onSubmit = (selectedValue: CarBrands) => {
        try {
            setCurrentBrand(selectedValue);
            const values = {
                brand: selectedValue
            }
            setIsLoading(true);
            axios.patch(`/api/inserat/${params.inseratId}/pkw`, values);
            toast.success("Anzahl Türen erfolgreich gespeichert : " + values.brand);
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
                <Label>Automarke</Label>
                <Select
                    onValueChange={(brand: CarBrands) => {
                        onSubmit(brand);
                    }}
                    defaultValue={brand}
                    disabled={isLoading}
                    value={brand || currentBrand }
                    
                >

                    <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md "
                        disabled={isLoading} defaultValue={brand}>
                        <SelectValue
                            placeholder="Wähle die Kategorie aus"
                            defaultValue={brand}
                            className="placeholder:text-gray-100"
                        />
                    </SelectTrigger>

                    <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
                        {Object.values(CarBrands).map((brand, index) => (
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

export default CarBrandForm;