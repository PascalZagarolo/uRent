'use client'


import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSavedSearchParams } from "@/store";




import { Banknote } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";





const CautionSearch = () => {

    const currentObject: any = useSavedSearchParams((state) => state.searchParams)

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [currentMin, setCurrentMin] = useState<string| number>(currentObject["start"] ? Number(currentObject["start"]) : null);
    const [currentMax, setCurrentMax] = useState<string| number>(currentObject["end"] ? Number(currentObject["end"]) : null);





    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    useEffect(() => {
        
        const setAmount = async () => {
            await changeSearchParams("start", currentMin);
        }
        setAmount();
    }, [currentMin])

    useEffect(() => {
        const setAmount = async () => {
            await changeSearchParams("end", currentMax);
        }
        setAmount();
    }, [currentMax])





    return (
        <div className=" ">


            <div className="w-full flex gap-x-2">
                <div className="w-1/2">
                    <Label className="flex justify-start items-center">
                        <Banknote className="w-4 h-4" /><div className="ml-2 font-semibold flex"> Min. <p className="sm:block hidden px-1"> Preis </p> </div>
                    </Label>

                </div>
                <div className="w-1/2">
                    <Label className="flex justify-start items-center">
                        <Banknote className="w-4 h-4" /><div className="ml-2 font-semibold flex"> Max. <p className="sm:block hidden px-1"> Preis </p> </div>
                    </Label>
                </div>
            </div>
            <div className="flex w-full gap-x-2 mt-3">


                <Input

                    value={currentMin}

                    className=" dark:bg-[#151515] dark:border-none"
                    placeholder="Min. Preis"
                    onChange={(e) => {
                        const newValue = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                        setCurrentMin(newValue);
                    }}

                />




                <Input

                    value={currentMax}
                    onChange={(e) => {
                        const newValue = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                        setCurrentMax(newValue);
                    }}
                    className=" dark:bg-[#151515] dark:border-none"
                    placeholder="Max. Preis"

                />



            </div>




        </div>
    );
}

export default CautionSearch;