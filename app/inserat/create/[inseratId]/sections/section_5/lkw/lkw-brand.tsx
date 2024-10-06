'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { LkwBrandEnumRender } from "@/db/schema";




import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";


interface LkwBrandCreationProps {
    currentValue : string;
    setCurrentValue : (value) => void;
}

const LkwBrandCreation: React.FC<LkwBrandCreationProps> = ({
    currentValue,
    setCurrentValue
}) => {


    const [isLoading, setIsLoading] = useState(false);



    const router = useRouter();

    const params = useParams();


    

    function removeUnderscore(inputString: string): string {
        const outputString = inputString.replace(/_/g, ' ');
        return outputString;
    }

    return (
        <div className="w-full">
            <div className="w-full">
                <Label>Lkw-Marke</Label>
                <Select
                //@ts-ignore
                    onValueChange={(brand: typeof LkwBrandEnumRender) => {
                        setCurrentValue(brand);
                    }}
                    disabled={isLoading}
                    //@ts-ignore
                    value={currentValue}
                    
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
                            <SelectItem value="MAN">MAN</SelectItem>
                            <SelectItem value="Mercedes-Benz">Mercedes-Benz</SelectItem>
                            <SelectItem value="Scania">Scania</SelectItem>
                            <SelectItem value="Volvo">Volvo</SelectItem>
                            <SelectLabel>
                                <Separator className="w-full"/>
                            </SelectLabel>
                        </SelectGroup>
                        <SelectItem value={null}>
                                Beliebig
                            </SelectItem>
                        {Object.values(LkwBrandEnumRender).map((brand, index) => (
                            !(brand === "MAN" || brand.trim() === "Scania" || brand === "Mercedes-Benz" || brand === "Volvo") 
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

export default LkwBrandCreation;