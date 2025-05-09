'use client';

import { getSearchParamsFunction } from "@/actions/getSearchParams";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import qs from "query-string";
import { useDeleteParams, useSavedSearchParams } from "@/store";




const TrailerCouplingBar = () => {
    const coupling = useSearchParams().get("coupling");
    const [currentType, setCurrentType] = useState(coupling);
    const [isLoading, setIsLoading] = useState(false);


    const pathname = usePathname();

    const router = useRouter();

    const params = getSearchParamsFunction("coupling");

    const currentState = useDeleteParams((state) => state.removeAttributes);

    useEffect(() => {
        if(coupling && !currentState) {
          changeSearchParams("coupling", coupling);
          setCurrentType(coupling);
        }
      }, [])

      
  
      
      const currentObject = useSavedSearchParams((state) => state.searchParams)
  
      const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();
  
      const setStart = (coupling : string) => {
        
         if(!coupling) {
          deleteSearchParams("coupling");
          setCurrentType(null);
         } else {
           //@ts-ignore
           changeSearchParams("coupling", coupling);
           setCurrentType(coupling);
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
                    <p className="ml-2 font-semibold"> Kupplungsart </p>
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


                        <SelectItem value="KUGELKOPFKUPPLUNG">Kugelkopfkupplung</SelectItem>
                        <SelectItem value="MAULKUPPLUNG">Maulkupplung</SelectItem>
                        <SelectItem value="SATTELKUPPLUNG">Sattelkupplung</SelectItem>

                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default TrailerCouplingBar;
