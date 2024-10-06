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
import { GiResize } from "react-icons/gi";



interface LkwSizeCreationProps {
    
    currentLength : string | number;
    currentWidth : string | number;
    currentHeight : string | number;
    setCurrentLength : (value) => void;
    setCurrentWidth : (value) => void;
    setCurrentHeight : (value) => void;
}

const LkwSizeCreation: React.FC<LkwSizeCreationProps> = ({
    currentHeight,
    currentLength,
    currentWidth,
    setCurrentHeight,
    setCurrentLength,
    setCurrentWidth
}) => {


    const router = useRouter();

    const params = useParams();

    


    
    
    const [isLoading, setIsLoading] = useState(false);




   






    return (
        <div className="items-center w-full">
            <Label className="font-semibold flex">
            <GiResize className="h-4 w-4 mr-2" />    Laderaum 
                </Label>

            <div className="flex mt-4 w-full">
                
                <div className="  items-center  ">
                    <Label className="flex justify-start items-center">
                        <PinIcon className="w-4 h-4" /> <p className="ml-2  font-semibold"> Länge </p>
                    </Label>

                    <Input
                        placeholder="in Metern"
                        className="p-2.5 2xl:pr-16 xl:pr-4  rounded-md input: text-sm border mt-2 
                         border-black dark:bg-[#151515] input: justify-start dark:focus-visible:ring-0"
                         onChange={(e) => {
                            const rawValue = e.currentTarget.value;

                            let cleanedValue = rawValue.replace(/[^0-9.]/g, '');
                            cleanedValue = rawValue.replace(/,/g, '.');
                            setCurrentLength(cleanedValue)
                            
                        }}
                        maxLength={6}
                        value={currentLength}
                    />
                </div>
                
                <div className="ml-4">
                    <Label className="flex justify-start items-center">
                        <PinIcon className="w-4 h-4" /> <p className="ml-2  font-semibold"> Breite </p>
                    </Label>

                    <Input
                        placeholder="in Metern"
                        className="p-2.5 2xl:pr-16 xl:pr-4  rounded-md input: text-sm border mt-2 
                         border-black dark:bg-[#151515] input: justify-start dark:focus-visible:ring-0"
                        type="decimal"
                        onChange={(e) => {
                            const rawValue = e.currentTarget.value;


                            let cleanedValue = rawValue.replace(/[^0-9.]/g, '');
                            cleanedValue = rawValue.replace(/,/g, '.');
                            setCurrentWidth(cleanedValue)
                            
                        }}
                        maxLength={6}
                        value={currentWidth}
                    />
                </div>
                <div className="ml-4">
                    <Label className="flex justify-start items-center">
                        <PinIcon className="w-4 h-4" /> <p className="ml-2  font-semibold"> Höhe </p>
                    </Label>

                    <Input
                        placeholder="in Metern"
                        className="p-2.5 2xl:pr-16 xl:pr-4  rounded-md input: text-sm border mt-2 
                         border-black dark:bg-[#151515] input: justify-start dark:focus-visible:ring-0"
                        type="decimal"
                        onChange={(e) => {
                            const rawValue = e.currentTarget.value;


                            let cleanedValue = rawValue.replace(/[^0-9.]/g, '');
                            cleanedValue = rawValue.replace(/,/g, '.');
                            setCurrentHeight(cleanedValue)
                            
                        }}
                        maxLength={6}
                        value={currentHeight}
                    />
                </div>
            </div>
            <RadioGroup className="mt-2" defaultValue="PS">
                
            </RadioGroup>
            
           
        </div>
    );
};
export default LkwSizeCreation;