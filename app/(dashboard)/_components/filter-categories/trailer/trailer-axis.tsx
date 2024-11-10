'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
import qs from "query-string";
import { getSearchParamsFunction } from "@/actions/getSearchParams";
import { useDeleteParams, useSavedSearchParams } from "@/store";


interface TrailerAxisBarProps {
    isTrailer? : boolean
}

const TrailerAxisBar = ({
    isTrailer
} : TrailerAxisBarProps) => {

    const currentState = useDeleteParams((state) => state.removeAttributes);
    
    const axis = useSearchParams().get("axis");
    const axisMax = useSearchParams().get("axisMax");
    const [currentWeight, setCurrentWeight] = useState(axis);
    const [currentWeightEnd, setCurrentWeightEnd] = useState(axisMax);
    const [isLoading, setIsLoading] = useState(false);

    const params = getSearchParamsFunction("axis")

    const pathname = usePathname();

    const router = useRouter();


    useEffect(() => {
        if(axis && !currentState) {
          changeSearchParams("axis", axis);
          setCurrentWeight(axis);
        }

        if(axisMax && !currentState) {
          changeSearchParams("axisMax", axisMax);
          setCurrentWeightEnd(axisMax);
        }
    },[])

    
  
      
  
      
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

      const setEnd = (application : string) => {
        if(!application) {
         deleteSearchParams("axisMax");
         setCurrentWeightEnd(null);
        } else {
          //@ts-ignore
          changeSearchParams("axisMax", application);
          setCurrentWeightEnd(application);
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

                <div className="flex items-center gap-x-2">
                    <div className="w-1/2">
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
                        {isTrailer && (
                            <SelectItem value="1">1</SelectItem>
                        )}
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">{'>'} 4 </SelectItem>
                        

                    </SelectContent>
                </Select>
                    </div>
                    <div className="w-1/2">
                    <Select
                    onValueChange={(brand) => {
                        setEnd(brand)
                    }}
                    value={currentWeightEnd}
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
                        {isTrailer && (
                            <SelectItem value="1">1</SelectItem>
                        )}
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">{'>'} 4 </SelectItem>
                        

                    </SelectContent>
                </Select>
                    </div>
                
                </div>
            </div>
        </div>
    );
}

export default TrailerAxisBar;