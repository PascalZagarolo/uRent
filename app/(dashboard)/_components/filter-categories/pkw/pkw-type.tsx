'use client';

import { getSearchParamsFunction } from "@/actions/getSearchParams";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import qs from "query-string";
import { useSavedSearchParams } from "@/store";




const PkwTypeBar = () => {
    const type = useSearchParams().get("type");
    const [currentType, setCurrentType] = useState(type);
    const [isLoading, setIsLoading] = useState(false);

    
    const pathname = usePathname();

    const router = useRouter();

    const params = getSearchParamsFunction("type");

    useEffect(() => {
        if(type) {
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
                    <p className="ml-2 font-semibold"> Fahrzeugtyp </p>
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

                        <SelectItem value="CABRIO">Cabrio</SelectItem>
                        <SelectItem value="COUPE">Coupe</SelectItem>

                        
                        <SelectItem value="KLEINBUS">Kleinbus</SelectItem>
                        <SelectItem value="KLEIN">Kleinwagen</SelectItem>
                        <SelectItem value="KOMBI">Kombi</SelectItem>

                        <SelectItem value="LIMOUSINE">Limousine</SelectItem>

                        <SelectItem value="VAN">Van</SelectItem>
                        
                        <SelectItem value="SPORT">Sportwagen</SelectItem>
                        <SelectItem value="SUPERSPORT">Supersportwagen</SelectItem>
                        <SelectItem value="SUV">SUV</SelectItem>
                        
                        
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default PkwTypeBar;
