'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { transportBrandEnum, TransportBrandEnumRender } from "@/db/schema";




import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

interface CarBrandFormProps {
    thisBrand: typeof transportBrandEnum;
}

const TransportBrandForm: React.FC<CarBrandFormProps> = ({
    thisBrand
}) => {

    const [currentBrand, setCurrentBrand] = useState<typeof transportBrandEnum | null>(thisBrand || null);
    const [isLoading, setIsLoading] = useState(false);



    const router = useRouter();

    const params = useParams();


    const onSubmit = async (selectedValue: typeof transportBrandEnum) => {
        try {
            setCurrentBrand(selectedValue);
            const values = {
                transportBrand: selectedValue
            }
            setIsLoading(true);
            await axios.patch(`/api/inserat/${params.inseratId}/transport`, values);
            toast.success("Transporter Marke gespeichert");
            router.refresh();
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
            <div className="w-full">
                <Label>Transporter Marke</Label>
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
                    <SelectGroup>
                            <SelectLabel>
                                Häufigsten
                            </SelectLabel>
                            <SelectItem value="Fiat">Fiat</SelectItem>
                            <SelectItem value="Iveco">Iveco</SelectItem>
                            <SelectItem value="Mercedes-Benz">Mercedes-Benz</SelectItem>
                            <SelectItem value="Volkswagen">Volkswagen</SelectItem>
                            <SelectLabel>
                                <Separator className="w-full"/>
                            </SelectLabel>
                        </SelectGroup>
                        
                        <SelectItem value={null}>Beliebig</SelectItem>
                        {Object.values(TransportBrandEnumRender).map((brand, index) => (
                                (brand !== "Fiat" && brand !== "Iveco" && brand !== "Mercedes_Benz" && brand !== "Volkswagen") && (
                                    <SelectItem key={index} value={brand}>
                                {removeUnderscore(brand)}
                            </SelectItem>
                                )

                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default TransportBrandForm;