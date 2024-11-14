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



const Payload = () => {


    const router = useRouter();

    const params = getSearchParamsFunction("volume");
    const volume = useSearchParams().get("volume");
  

    const [currentWeight, setCurrentWeight] = useState<string | null>(null);
    const [currentWeightEnd, setCurrentWeightEnd] = useState<string | null>(null);



   



    const onClear = () => {
        console.log("...")
        setCurrentWeight("");
        setCurrentWeightEnd("");
    }



    const currentObject = useSavedSearchParams((state) => state.searchParams)

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

useEffect(() => {   
    if(currentWeight) {
        changeSearchParams("payload", currentWeight)
    } else {
        deleteSearchParams("payload")
    }

    if(currentWeightEnd) {
        changeSearchParams("payloadMax", currentWeightEnd)
    } else {
        deleteSearchParams("payloadMax")
    }
},[currentWeight, currentWeightEnd])








    return (
        <div className="items-center w-full">


            <div className="flex mt-4 w-full">

                <div className="  items-center  ">
                    <Label className="flex justify-start items-center font-semibold">
                        Von
                    </Label>

                    <Input

                        value={currentWeight}
                        
                        maxLength={5}
                        
                        max={1_000_000}
                        className=" dark:bg-[#151515] dark:border-none mt-2 w-full"
                        placeholder="Von"

                        pattern="^[0-9]*$"

                        onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
                        onChange={(e) => {
                            const value = e.target.value;

                            if (/^[0-9]*$/.test(value)) {
                                setCurrentWeight(value);
                            }
                        }}

                    />
                </div>
                <div className="ml-4">
                    <Label className="flex justify-start items-center">
                        <p className="ml-2  font-semibold"> Bis </p>
                        <MdCancel className="w-4 h-4 text-rose-600 ml-auto cursor-pointer"  onClick={onClear}/>
                    </Label>

                    <Input

                        value={currentWeightEnd}
                        
                        maxLength={5}
                        max={1_000_000}
                        className=" dark:bg-[#151515] dark:border-none mt-2 w-full"
                        placeholder="Bis"

                        pattern="^[0-9]*$"

                        onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
                        onChange={(e) => {
                            const value = e.target.value;

                            if (/^[0-9]*$/.test(value)) {
                                setCurrentWeightEnd(value);
                            }
                        }}

                    />
                </div>
            </div>


        </div>
    );
};
export default Payload;