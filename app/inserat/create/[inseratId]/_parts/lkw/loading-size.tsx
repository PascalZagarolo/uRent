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



interface LkwSizeFormProps {
    
    thisLength : number;
    thisWidth : number;
    thisHeight : number;
}

const LkwSizeForm: React.FC<LkwSizeFormProps> = ({
    thisLength,
    thisWidth,
    thisHeight
}) => {


    const router = useRouter();

    const params = useParams();

    

    const [currentLength, setCurrentLength] = useState<number | string | null>(thisLength || null);
    const [currentWidth, setCurrentWidth] = useState<number | string | null>(thisWidth || null);
    const [currentHeight, setCurrentHeight] = useState<number | string | null>(thisHeight || null);
    
    
    const [isLoading, setIsLoading] = useState(false);




    const onSubmit = () => {
        try {
            //@ts-ignore
            if (!(isNaN((Number(Math.round(currentLength))) && (isNaN((Number(Math.round(currentHeight))))) &&(isNaN((Number(Math.round(currentWidth)))))))) {
                const values = {
                    loading_l : currentLength,
                    loading_b : currentWidth,
                    loading_h : currentHeight,
                }
                setIsLoading(true);
                axios.patch(`/api/inserat/${params.inseratId}/lkw`, values);
                toast.success("Laderaum gespeichert");
                setTimeout(() => {
                    router.refresh();
                }, 400)
                
            } else {
                
                console.log("keine Nummer");
                return;
            }
            

        } catch {
            toast.error("Etwas ist schief gelaufen...");
        }

    }





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
                        
                        value={currentHeight}
                    />
                </div>
            </div>
            <RadioGroup className="mt-2" defaultValue="PS">
                
            </RadioGroup>
            
            <Button onClick={onSubmit} className="mt-6 dark:bg-[#000000] dark:hover:bg-[#0c0c0c] dark:text-gray-100"

                disabled={
                    //@ts-ignore 
                      !!isNaN(Number(Math.round(currentLength))) || !!isNaN(Number(Math.round(currentWidth))) || !!isNaN(Number(Math.round(currentHeight))) 
                    || (currentLength == thisLength) && (currentWidth == thisWidth) && (currentHeight == thisHeight)
                    }
            >
                <span className="">Laderaum angeben</span>
            </Button>
        </div>
    );
};
export default LkwSizeForm;