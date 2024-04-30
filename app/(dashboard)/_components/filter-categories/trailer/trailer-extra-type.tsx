'use client';

import { getSearchParamsFunction } from "@/actions/getSearchParams";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import qs from "query-string";
import { useSavedSearchParams } from "@/store";




const TrailerExtraTypeBar = () => {
    const extraType = useSearchParams().get("extraType");
    const [currentType, setCurrentType] = useState(extraType);
    const [isLoading, setIsLoading] = useState(false);

    
    const pathname = usePathname();

    const router = useRouter();

    const params = getSearchParamsFunction("extraType");

    useEffect(() => {
        if(extraType) {
          changeSearchParams("extraType", extraType);
          setCurrentType(extraType);
        }
      }, [])

      
  
      
      const currentObject = useSavedSearchParams((state) => state.searchParams)
  
      const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();
  
      const setStart = (extraType : string) => {
        
         if(!extraType) {
          deleteSearchParams("extraType");
          setCurrentType(null);
         } else {
           //@ts-ignore
           changeSearchParams("extraType", extraType);
           setCurrentType(extraType);
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
                    <p className="ml-2 font-semibold"> Erw. Kategorie </p>
                </Label>

                <Select
                    onValueChange={(brand) => {
                        setStart(brand)
                    }}
                    value={currentType}
                    disabled={isLoading}
                >

                    <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md "
                        disabled={isLoading}  >
                        <SelectValue
                            placeholder="Welcher Autotyp?"


                        />
                    </SelectTrigger>

                    <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
                        <SelectItem key="beliebig" value={null} className="font-semibold">
                            Beliebig
                        </SelectItem>


                        <SelectItem value="CONTAINERTRANSPORT">Containertransport</SelectItem>
                        <SelectItem value="FAHRZEUGTRANSPORT">Fahrzeugtransport</SelectItem>
                        <SelectItem value="FLUESSIGKEITSTRANSPORT">Fluessigkeitstransport</SelectItem>
                        <SelectItem value="KASTENWAGEN">Kastenwagen</SelectItem>
                        <SelectItem value="KOFFERAUFBAU">Kofferaufbau</SelectItem>
                        <SelectItem value="KUEHLAUFBAU">Kuehlaufbau</SelectItem>
                        <SelectItem value="MOEBELTRANSPORT">Moebeltransport</SelectItem>
                        <SelectItem value="MULDENKIPPER">Muldenkipper</SelectItem>
                        <SelectItem value="PERSONENTRANSPORT">Personentransport</SelectItem>
                        <SelectItem value="PLANE">Plane</SelectItem>
                        <SelectItem value="PRITSCHE">Pritsche</SelectItem>
                        
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default TrailerExtraTypeBar;
