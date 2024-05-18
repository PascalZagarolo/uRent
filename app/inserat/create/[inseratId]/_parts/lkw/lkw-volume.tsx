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



interface LkwLoadingVolumeFormProps {
    thisVolume: number;
}

const LkwLoadingVolumeForm: React.FC<LkwLoadingVolumeFormProps> = ({
    thisVolume
}) => {


    const router = useRouter();

    const params = useParams();

    const [usesPS, setUsesPS] = useState(true);

    const [currentLiter, setCurrentLiter] = useState<number | string | null>(thisVolume || null);
    const [currentMeter, setCurrentMeter] = useState<number | string | null>(thisVolume * 0.001 || null);
    const [isLoading, setIsLoading] = useState(false);




    const onSubmit = () => {
        try {
            //@ts-ignore
            if (!(isNaN((Number(Math.round(currentLiter))) && (isNaN((Number(Math.round(currentLiter)))))))) {
                const values = {
                    loading_volume: currentLiter
                }
                setIsLoading(true);
                axios.patch(`/api/inserat/${params.inseratId}/lkw`, values);
                toast.success("Ladevolumen gespeichert: " + values.loading_volume);
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
            <FaBoxOpen className="w-4 h-4 mr-2" />     Ladevolumen
                </Label>

            <div className="flex mt-4 w-full">
                
                <div className="  items-center  ">
                    <Label className="flex justify-start items-center">
                        <PinIcon className="w-4 h-4" /> <p className="ml-2  font-semibold"> Liter </p>
                    </Label>

                    <Input
                        placeholder="Volumen in Liter"
                        className="p-2.5 2xl:pr-16 xl:pr-4  rounded-md input: text-sm border mt-2 
                         border-black dark:bg-[#151515] input: justify-start dark:focus-visible:ring-0"
                         onChange={(e) => {
                            const rawValue = e.currentTarget.value;


                            let cleanedValue = rawValue.replace(/[^0-9.]/g, '');
                            cleanedValue = rawValue.replace(/,/g, '.');
                            setCurrentLiter(cleanedValue)
                            if (!isNaN(parseFloat(cleanedValue))) {
                                setCurrentMeter((Math.round((parseFloat(cleanedValue))) * 0.001).toFixed(2))
                            }
                        }}
                        disabled={!usesPS}
                        value={currentLiter || ''}
                    />
                </div>
                <div className="ml-4">
                    <Label className="flex justify-start items-center">
                        <PinIcon className="w-4 h-4" /> <p className="ml-2  font-semibold"> Kubikmeter </p>
                    </Label>

                    <Input
                        placeholder="Volumen in m³"
                        className="p-2.5 2xl:pr-16 xl:pr-4  rounded-md input: text-sm border mt-2 
                         border-black dark:bg-[#151515] input: justify-start dark:focus-visible:ring-0"
                        type="decimal"
                        onChange={(e) => {
                            const rawValue = e.currentTarget.value;


                            let cleanedValue = rawValue.replace(/[^0-9.]/g, '');
                            cleanedValue = rawValue.replace(/,/g, '.');
                            setCurrentMeter(cleanedValue)
                            if (!isNaN(parseFloat(cleanedValue))) {
                                setCurrentLiter(parseFloat(cleanedValue) * 1000);
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
            
            <Button onClick={onSubmit} className="mt-2 dark:bg-[#000000] dark:hover:bg-[#0c0c0c] dark:text-gray-100"

                disabled={!currentLiter || currentLiter == thisVolume || currentLiter == 0
                    //@ts-ignore 
                     || !!isNaN(Number(Math.round(currentLiter))) || !!isNaN(Number(Math.round(currentMeter)))}
            >
                <span className="">Volumen angeben</span>
            </Button>
        </div>
    );
};
export default LkwLoadingVolumeForm;