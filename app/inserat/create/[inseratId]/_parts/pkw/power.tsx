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



interface PowerFormProps {
    thisPower: number;
}

const PowerForm: React.FC<PowerFormProps> = ({
    thisPower
}) => {


    const router = useRouter();
  
    const params = useParams();

    const [usesPS, setUsesPS] = useState(true);

    const [currentKW, setCurrentKW] = useState<number | null>(Math.round(thisPower * 0.735499) || null);
    const [currentPS, setCurrentPS] = useState<number | null>(thisPower || null);
    const [isLoading, setIsLoading] = useState(false);




    const onSubmit = () => {

        const values = {
            power : currentPS
        }

        try {
            setIsLoading(true);
          axios.patch(`/api/inserat/${params.inseratId}/pkw`, values);
          toast.success("Anzahl der PS gespeichert : " + values.power);
          setTimeout(() => {
            router.refresh();
          }, 400)

        } catch {
            toast.error("Etwas ist schief gelaufen...");
        }

    }





    return (
        <div className="items-center w-full">


            <div className="flex mt-4 w-full">
                <div className="  items-center  ">
                    <Label className="flex justify-start items-center">
                        <PinIcon className="w-4 h-4" /> <p className="ml-2  font-semibold"> PS </p>
                    </Label>

                    <Input
                        placeholder="Leistung in PS"
                        className="p-2.5 2xl:pr-16 xl:pr-4  rounded-md input: text-sm border mt-2  border-black dark:bg-[#151515] input: justify-start dark:focus-visible:ring-0"
                        onChange={(e) => {
                            setCurrentPS(Number(e.target.value));
                            setCurrentKW(Math.round(Number(e.target.value) * 0.735499)); 
                        }}
                        disabled={!usesPS}
                        value={currentPS || ''}
                    />
                </div>
                <div className="ml-4">
                    <Label className="flex justify-start items-center">
                        <PinIcon className="w-4 h-4" /> <p className="ml-2  font-semibold"> KW </p>
                    </Label>

                    <Input
                        placeholder="Leistung in PS"
                        className="p-2.5 2xl:pr-16 xl:pr-4  rounded-md input: text-sm border mt-2  border-black dark:bg-[#151515] input: justify-start dark:focus-visible:ring-0"
                        onChange={(e) => {
                            setCurrentKW(Number(e.target.value));
                            setCurrentPS(Math.round(Number(e.target.value) * 1.35962)); 
                        }}
                        disabled={usesPS}
                        value={currentKW || ''}
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
            <Button onClick={onSubmit} className="mt-2 dark:bg-[#000000] dark:hover:bg-[#0c0c0c] dark:text-gray-100" //@ts-ignore
            disabled={!currentPS || currentPS === thisPower || currentPS === 0 || currentPS === NaN}
            >
                <span className="">Leistung angeben</span>
            </Button>
        </div>
    );
};
export default PowerForm;