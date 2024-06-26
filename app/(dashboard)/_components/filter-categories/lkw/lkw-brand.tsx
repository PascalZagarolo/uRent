'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDeleteParams, useSavedSearchParams } from "@/store";


import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
import qs from "query-string";
import { getSearchParamsFunction } from "@/actions/getSearchParams";
import { LkwBrandEnumRender } from "@/db/schema";




const LkwBrandBar = () => {

  const currentState = useDeleteParams((state) => state.removeAttributes);

    const brand = useSearchParams().get("lkwBrand");
    const [currentBrand, setCurrentBrand] = useState(brand);
    const [isLoading, setIsLoading] = useState(false);

    const params = getSearchParamsFunction("lkwBrand")

    const pathname = usePathname();

    const router = useRouter();

    

    useEffect(() => {
      if(brand && !currentState) {
        changeSearchParams("lkwBrand", brand);
        setCurrentBrand(brand);
      }
    }, [])

    

    
    const currentObject = useSavedSearchParams((state) => state.searchParams)

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const setStart = (brand : string) => {
       if(!brand) {
        deleteSearchParams("lkwBrand");
        setCurrentBrand(null);
       } else {
         //@ts-ignore
         changeSearchParams("lkwBrand", brand);
         setCurrentBrand(brand);
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
                        <p className="ml-2 font-semibold"> Marke </p>
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
          
          >
            <SelectValue
              placeholder="Wähle deine gewünschte Marke"
              
              
            />
          </SelectTrigger>

          <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
          <SelectItem key="beliebig" value={null} className="font-semibold">
                                Beliebig
                            </SelectItem>
          {Object.values(LkwBrandEnumRender).map((brand, index) => (
                            <SelectItem key={index} value={brand}>
                                {removeUnderscore(brand)}
                            </SelectItem>
                        ))}
          </SelectContent>
        </Select>
      </div>
        </div>
     );
}
 
export default LkwBrandBar;