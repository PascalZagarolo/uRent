'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { LkwBrandEnumRender } from "@/db/schema";




import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

interface LkwBrandFormProps {
    thisBrand: typeof LkwBrandEnumRender;
}

const LkwBrandForm: React.FC<LkwBrandFormProps> = ({
    thisBrand
}) => {

    const [currentBrand, setCurrentBrand] = useState<typeof LkwBrandEnumRender | null>(thisBrand || null);
    const [isLoading, setIsLoading] = useState(false);



    const router = useRouter();

    const params = useParams();


    const onSubmit = (selectedValue: typeof LkwBrandEnumRender) => {
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
                //@ts-ignore
                    onValueChange={(brand: typeof LkwBrandEnumRender) => {
                        onSubmit(brand);
                    }}
                    disabled={isLoading}
                    //@ts-ignore
                    value={currentBrand}
                    
                >

                    <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md "
                        disabled={isLoading} >
                        <SelectValue
                            placeholder="Wähle die Kategorie aus"
                            
                            className="placeholder:text-gray-100"
                        />
                    </SelectTrigger>

                    <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
                    <SelectGroup>
                            <SelectLabel>
                                Häufigsten
                            </SelectLabel>
                            <SelectItem value="MAN_Truck_Bus">MAN</SelectItem>
                            <SelectItem value="Scania">Scania</SelectItem>
                            <SelectItem value="Toyota_Trucks">Toyota</SelectItem>
                            <SelectItem value="Volvo_Trucks">Volvo</SelectItem>
                            <SelectLabel>
                                <Separator className="w-full"/>
                            </SelectLabel>
                        </SelectGroup>
                    <SelectItem value={null}>
                                Beliebig
                            </SelectItem>
                        {Object.values(LkwBrandEnumRender).map((brand, index) => (
                            !(brand === "MAN_Truck_Bus" || brand === "Scania" || brand === "Toyota_Trucks" || brand === "Volvo_Trucks") 
                            && (
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

export default LkwBrandForm;