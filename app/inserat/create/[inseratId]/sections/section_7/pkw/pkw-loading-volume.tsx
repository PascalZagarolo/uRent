'use client'


import { PinIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";

import axios from "axios";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FaBoxOpen } from "react-icons/fa";



interface PkwLoadingVolumeCreationProps {
    currentValue : number | string | any;
    setCurrentValue : (value) => void;
}

const PkwLoadingVolumeCreation: React.FC<PkwLoadingVolumeCreationProps> = ({
    currentValue,
    setCurrentValue
}) => {


    const router = useRouter();

    const params = useParams();

    const [usesPS, setUsesPS] = useState(true);

    
    const [currentMeter, setCurrentMeter] = useState<number | string | null>(currentValue * 0.001 || null);
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false);




    





    return (
        <div className="items-center w-full">
            <Label className="font-semibold flex">
             Kofferraumvolumen
                </Label>

            <div className="flex mt-4 w-full flex-row items-center space-x-8">
                
                <div className="  items-center  w-1/2">
                    <Label className="flex justify-start items-center">
                        <PinIcon className="w-4 h-4" /> <p className="ml-2  font-semibold"> Liter </p>
                    </Label>

                    <Input
                        placeholder="Volumen in Liter"
                        className="p-2.5 2xl:pr-16 xl:pr-4  rounded-md input: text-sm border mt-2 
                         border-black dark:bg-[#151515] input: justify-start dark:focus-visible:ring-0"
                         maxLength={8}
                         onChange={(e) => {
                            const rawValue = e.currentTarget.value;


                            let cleanedValue = rawValue.replace(/[^0-9.]/g, '');
                            cleanedValue = rawValue.replace(/,/g, '.');
                            setCurrentValue(cleanedValue)
                            if (!isNaN(parseFloat(cleanedValue))) {
                                setCurrentMeter((Math.round((parseFloat(cleanedValue))) * 0.001).toFixed(2))
                            }
                        }}
                        disabled={!usesPS}
                        value={currentValue || ''}
                    />
                </div>
                <div className="w-1/2">
                    <Label className="flex justify-start items-center">
                        <PinIcon className="w-4 h-4" /> <p className="ml-2  font-semibold"> Kubikmeter </p>
                    </Label>

                    <Input
                        placeholder="Volumen in m³"
                        className="p-2.5 2xl:pr-16 xl:pr-4  rounded-md input: text-sm border mt-2 
                         border-black dark:bg-[#151515] input: justify-start dark:focus-visible:ring-0"
                        type="decimal"
                        maxLength={5}
                        onChange={(e) => {
                            const rawValue = e.currentTarget.value;


                            let cleanedValue = rawValue.replace(/[^0-9.]/g, '');
                            cleanedValue = rawValue.replace(/,/g, '.');
                            setCurrentMeter(cleanedValue)
                            if (!isNaN(parseFloat(cleanedValue))) {
                                setCurrentValue(parseFloat(cleanedValue) * 1000);
                            }
                        }}
                        disabled={usesPS}
                        value={currentMeter}
                    />
                </div>
            </div>
            <RadioGroup className="mt-2" defaultValue="PS">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="PS" id="PS" className="h-2 w-2" onClick={() => { setUsesPS(true) }} />
                    <Label htmlFor="PS" className="text-sm"><p className="text-sm"> Liter </p></Label>
                    <RadioGroupItem value="KW" id="KW" className="h-2 w-2" onClick={() => { setUsesPS(false) }} />
                    <Label htmlFor="KW" className="text-sm"><p className="text-sm"> m³ </p></Label>
                </div>
            </RadioGroup>
            
           
        </div>
    );
};
export default PkwLoadingVolumeCreation;