'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
import qs from "query-string";
import { getSearchParamsFunction } from "@/actions/getSearchParams";
import { useSavedSearchParams } from "@/store";




const TrailerAxisBar = () => {
    const axis = useSearchParams().get("axis");
    const [currentWeight, setCurrentWeight] = useState(axis);
    const [isLoading, setIsLoading] = useState(false);

    const params = getSearchParamsFunction("axis")

    const pathname = usePathname();

    const router = useRouter();



    useEffect(() => {
        if(axis) {
          changeSearchParams("axis", axis);
          setCurrentWeight(axis);
        }
      }, [])
  
      
  
      
      const currentObject = useSavedSearchParams((state) => state.searchParams)
  
      const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();
  
      const setStart = (application : string) => {
         if(!application) {
          deleteSearchParams("axis");
          setCurrentWeight(null);
         } else {
           //@ts-ignore
           changeSearchParams("axis", application);
           setCurrentWeight(application);
         }
          
      }



    function removeUnderscore(inputString: string): string {
        const outputString = inputString.replace(/_/g, ' ');
        return outputString;
    }

    return (
        <div className="w-full">
            <div className="w-full">
                <Label className="flex justify-start items-center text-gray-200">
                    <p className="ml-2 font-semibold"> Anz. Achsen </p>
                </Label>

                <Select
                    onValueChange={(brand) => {
                        setStart(brand)
                    }}
                    value={currentWeight}
                    disabled={isLoading}
                >

                    <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md "
                        disabled={isLoading}

                    >
                        <SelectValue
                            placeholder="Wähle deinen Anwendungsbereich"


                        />
                    </SelectTrigger>

                    <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full flex justify-center">
                        <SelectItem value={null} className="font-bold">Beliebig</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">{'>'} 4 </SelectItem>
                        

                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default TrailerAxisBar;