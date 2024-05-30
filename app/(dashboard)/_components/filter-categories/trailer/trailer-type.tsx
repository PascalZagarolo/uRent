'use client';

import { getSearchParamsFunction } from "@/actions/getSearchParams";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import qs from "query-string";
import { useDeleteParams, useSavedSearchParams } from "@/store";




const TrailerTypeBar = () => {
    const type = useSearchParams().get("type");
    const [currentType, setCurrentType] = useState(type);
    const [isLoading, setIsLoading] = useState(false);

    
    const pathname = usePathname();

    const router = useRouter();

    const params = getSearchParamsFunction("type");

    const currentState = useDeleteParams((state) => state.removeAttributes);
    
    useEffect(() => {
        if(type && !currentState) {
          changeSearchParams("type", type);
          setCurrentType(type);
        }
      }, [])
      
  
      
      const currentObject = useSavedSearchParams((state) => state.searchParams)
      
      
  
      const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();
  
      const setStart = (type : string) => {
        
         if(!type) {
          deleteSearchParams("type");
          setCurrentType(null);
         } else {
           //@ts-ignore
           changeSearchParams("type", type);
           setCurrentType(type);
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
                    <p className="ml-2 font-semibold"> Anhängertyp </p>
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


                        <SelectItem value="SATTELZUG">Sattelzug</SelectItem>
                        <SelectItem value="ANHAENGER">Anhänger</SelectItem>
                        <SelectItem value="KLEIN">Kleinanhänger</SelectItem>
                        
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default TrailerTypeBar;
