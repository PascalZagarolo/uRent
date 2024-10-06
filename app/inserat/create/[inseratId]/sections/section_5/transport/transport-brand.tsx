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
    currentValue : string;
    setCurrentValue : (value) => void;
}

const TransportBrandCreation: React.FC<CarBrandFormProps> = ({
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
                <Label>Transporter Marke</Label>
                <Select
                    //@ts-ignore
                    onValueChange={(brand: typeof BrandEnumRender) => {
                        setCurrentValue(brand);
                    }}
                    disabled={isLoading}
                    //@ts-ignore
                    value={currentValue}
                    
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
                                (brand !== "Fiat" && brand !== "Iveco" && brand !== "Mercedes-Benz" && brand !== "Volkswagen") && (
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

export default TransportBrandCreation;