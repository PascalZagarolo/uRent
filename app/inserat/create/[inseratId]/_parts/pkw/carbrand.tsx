'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
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


    const onSubmit = async (selectedValue: typeof BrandEnumRender) => {
        try {
            setCurrentBrand(selectedValue);
            const values = {
                brand: selectedValue
            }
            setIsLoading(true);
            await axios.patch(`/api/inserat/${params.inseratId}/pkw`, values);
            toast.success("Automarke gespeichert");
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
                        
                        <SelectGroup>
                            <SelectLabel>
                                Häufigsten
                            </SelectLabel>
                            <SelectItem value="Audi">Audi</SelectItem>
                            <SelectItem value="BMW">Bmw</SelectItem>
                            <SelectItem value="Ford">Ford</SelectItem>
                            <SelectItem value="Mercedes_Benz">Mercedes Benz</SelectItem>
                            <SelectItem value="Opel">Opel</SelectItem>
                            
                            <SelectItem value="Seat">Seat</SelectItem>
                            <SelectItem value="Skoda">Skoda</SelectItem>
                            <SelectItem value="Toyota">Toyota</SelectItem>
                            <SelectItem value="Volkswagen">Volkswagen</SelectItem>
                            <SelectLabel>
                                <Separator className="w-full"/>
                            </SelectLabel>
                        </SelectGroup>
                        <SelectItem value={null}>Beliebig</SelectItem>
                        {Object.values(BrandEnumRender).map((brand, index) => (
                            //@ts-ignore
                            !(brand === "Audi" || brand === "BMW" || brand === "Ford" || brand === "Mercedes_Benz" || brand === "Opel" || brand === "Seat" || brand === "Skoda" || brand === "Toyota" || brand ==="Volkswagen") && 
                            (
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

export default CarBrandForm;