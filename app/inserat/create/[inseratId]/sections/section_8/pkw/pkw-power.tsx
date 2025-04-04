'use client'


import { PinIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";

import axios from "axios";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";



interface PowerFormCreationProps {
    currentValue: any;
    setCurrentValue: (value : string) => void;
}

const PowerFormCreation: React.FC<PowerFormCreationProps> = ({
    currentValue,
    setCurrentValue
}) => {


    

    const [usesPS, setUsesPS] = useState(true);
    
    const [currentKW, setCurrentKW] = useState<string | number>(Math.round(currentValue * 0.735499) || undefined);
    
    const [isLoading, setIsLoading] = useState(false);





    useEffect(() => {
        // Convert PS to KW if using PS
        if (usesPS && currentValue) {
            setCurrentKW((Number(currentValue) * 0.735499).toFixed(0));
        } else if (!usesPS && currentKW) {
            // Convert KW to PS if using KW
            setCurrentValue((Number(currentKW) / 0.735499).toFixed(0));
        }
    }, [currentValue, currentKW, usesPS, setCurrentValue]);




    return (
        <div className="items-center w-full">
            <Label className="font-semibold flex">
                Fahrzeugleistung
            </Label>

            <div className="flex mt-4 w-full flex-row items-center space-x-8">
                <div className="w-1/2 items-center  ">
                    <Label className="flex justify-start items-center">
                        <PinIcon className="w-4 h-4" /> <p className="ml-2 font-semibold"> PS </p>
                    </Label>

                    <Input
                        placeholder="Leistung in PS"
                        className="p-2.5 2xl:pr-16 xl:pr-4  rounded-md input: text-sm border mt-2  border-black dark:bg-[#151515] input: justify-start dark:focus-visible:ring-0"
                        onChange={(e) => setCurrentValue(e.target.value)}
                        
                        maxLength={5}
                        disabled={!usesPS}
                        value={currentValue}
                    />
                </div>
                <div className="w-1/2">
                    <Label className="flex justify-start items-center">
                        <PinIcon className="w-4 h-4" /> <p className="ml-2  font-semibold"> KW </p>
                    </Label>

                    <Input
                        placeholder="Leistung in KW"
                        className="p-2.5 2xl:pr-16 xl:pr-4  rounded-md input: text-sm border mt-2  border-black dark:bg-[#151515] input: justify-start dark:focus-visible:ring-0"
                        onChange={(e) => {
                            setCurrentKW(Number(e.target.value));

                        }}
                        maxLength={4}
                        disabled={usesPS}
                        value={currentKW}
                    />
                </div>
            </div>
            <RadioGroup className="mt-2" defaultValue="PS">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="PS" id="PS" className="h-2 w-2" onClick={() => { setUsesPS(true) }} />
                    <Label htmlFor="PS" className="text-sm"><p className="text-sm"> PS </p></Label>
                    <RadioGroupItem value="KW" id="KW" className="h-2 w-2" onClick={() => { setUsesPS(false) }} />
                    <Label htmlFor="KW" className="text-sm"><p className="text-sm"> KW </p></Label>
                </div>
            </RadioGroup>

        </div>
    );
};
export default PowerFormCreation;