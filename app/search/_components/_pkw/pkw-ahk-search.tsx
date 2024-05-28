'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
import qs from "query-string";
import { getSearchParamsFunction } from "@/actions/getSearchParams";
import { useSavedSearchParams } from "@/store";




const PkwAhkSearch = () => {

    const currentObject : any = useSavedSearchParams((state) => state.searchParams)

    const brake = useSearchParams().get("ahk");
    const [currentBrand, setCurrentBrand] = useState((typeof(currentObject['ahk']) !== 'undefined' && currentObject['ahk'] !== null) 
    ? currentObject['ahk'] : null);
    const [isLoading, setIsLoading] = useState(false);

    const params = getSearchParamsFunction("ahk")

    const pathname = usePathname();

    const router = useRouter();



    useEffect(() => {
        if(typeof(brake) !== 'undefined' && brake !== null) {
          changeSearchParams("ahk", brake);
          setCurrentBrand(brake);
        }
      }, [])

      
  
      
      
  
      const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();
  
      const setStart = (brake : string) => {
        
         if(!brake) {
          deleteSearchParams("ahk");
          setCurrentBrand(null);
         } else {
           //@ts-ignore
           console.log("test")
           changeSearchParams("ahk", brake);
           setCurrentBrand(brake);
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
                    <p className="ml-2 font-semibold"> Anhängerkupplung </p>
                </Label>

                <Select
                    onValueChange={(brand) => {
                        setStart(brand)
                    }}
                    value={currentBrand}
                    disabled={isLoading}
                >

                    <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md "
                        disabled={isLoading}
                        value={currentBrand ? currentBrand : null}

                    >
                        <SelectValue
                            placeholder="Wähle deinen Anwendungsbereich"


                        />
                    </SelectTrigger>

                    <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
                        <SelectItem key="beliebig" value={null} className="font-semibold">
                            Beliebig
                        </SelectItem>
                        <SelectItem value="true">Vorhanden</SelectItem>
                        <SelectItem value="false">nicht Vorhanden</SelectItem>
                        
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default PkwAhkSearch;
