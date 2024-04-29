'use client'


import { PinIcon } from "lucide-react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";

import axios from "axios";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FaBoxOpen } from "react-icons/fa";
import qs from "query-string"
import { getSearchParamsFunction } from "@/actions/getSearchParams";
import { MdCancel } from "react-icons/md";
import { useSavedSearchParams } from "@/store";



const LoadingVolumeBar = () => {


    const router = useRouter();

    const params = getSearchParamsFunction("volume");
    const volume = useSearchParams().get("volume");
    const [usesPS, setUsesPS] = useState(true);

    const [currentLiter, setCurrentLiter] = useState<number | string | null>(parseFloat(volume));
    const [currentMeter, setCurrentMeter] = useState<number | string | null>(volume ? parseFloat(volume) * 0.001 : null);
    
    

    const pathname = usePathname();


    useEffect(() => {
        if(volume && volume !== "0") {
          changeSearchParams("volume", volume);
          setCurrentLiter(parseFloat(volume));
          setCurrentMeter(parseFloat(volume) * 0.001)
        } else {
            setCurrentLiter(0);
            setCurrentMeter(0)
        }
      }, [])

      
  
      
      const currentObject = useSavedSearchParams((state) => state.searchParams)
  
      const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();
  
      useEffect(() => {
        changeSearchParams("volume", currentLiter);
        if(!currentLiter || Number(currentLiter) === 0 || !currentMeter || Number(currentMeter) === 0){
            setCurrentLiter(null);
            setCurrentMeter(0)
            deleteSearchParams("volume")
        }
      },[currentLiter, currentMeter])

      


    const onClear = () => {
        const url = qs.stringifyUrl({
            url : pathname,
            query : {
                volume : null,
                ...params
            }
        }, { skipEmptyString: true, skipNull: true })
        setCurrentLiter(null);
        setCurrentMeter(0);

        router.push(url) 
    }



    return (
        <div className="items-center w-full">
            

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
                                setCurrentMeter(parseFloat(cleanedValue) * 0.001);
                            }
                        }}
                        disabled={!usesPS}
                        value={currentLiter || ''}
                    />
                </div>
                <div className="ml-4">
                    <Label className="flex justify-start items-center">
                        <PinIcon className="w-4 h-4" /> <p className="ml-2  font-semibold"> Kubikmeter </p>
                        <MdCancel className="w-4 h-4 text-rose-600 ml-auto cursor-pointer" onClick={onClear} />
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
            
            <Button onClick={() => {}} className="mt-2 bg-[#1B1F2C] hover:bg-[#222738] w-full dark:text-gray-100"

                disabled={!currentLiter  || currentLiter == 0
                    //@ts-ignore 
                     || !!isNaN(Number(Math.round(currentLiter))) || !!isNaN(Number(Math.round(currentMeter)))}
            >
                <span className="">Volumen angeben</span>
            </Button>
        </div>
    );
};
export default LoadingVolumeBar;