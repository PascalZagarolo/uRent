'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BrandEnumRender } from "@/db/schema";




import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

interface CarBrandFormProps {
    thisBrand: typeof BrandEnumRender;
}

const CarBrandForm: React.FC<CarBrandFormProps> = ({
    thisBrand
}) => {

    const [currentBrand, setCurrentBrand] = useState<typeof BrandEnumRender | null>(thisBrand || null);
    const [isLoading, setIsLoading] = useState(false);



    const router = useRouter();

    const params = useParams();


    const onSubmit = (selectedValue: typeof BrandEnumRender) => {
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
                    //@ts-ignore
                    onValueChange={(brand: typeof BrandEnumRender) => {
                        onSubmit(brand);
                    }}
                    disabled={isLoading}
                    //@ts-ignore
                    value={currentBrand}
                    
                >

                    <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md "
                        disabled={isLoading}>
                        <SelectValue
                            className="placeholder:text-gray-100"
                        />
                    </SelectTrigger>

                    <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
                        <SelectItem value={null}>Beliebig</SelectItem>
                        {Object.values(BrandEnumRender).map((brand, index) => (
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