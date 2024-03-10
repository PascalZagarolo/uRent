'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSavedSearchParams } from "@/store";
import { CarBrands, Inserat, LkwBrand } from "@prisma/client";

import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";
import qs from "query-string";
import { getSearchParamsFunction } from "@/actions/getSearchParams";




const PkwBrandBar = () => {
    const brand = useSearchParams().get("brand");
    const [currentBrand, setCurrentBrand] = useState(brand);
    const [isLoading, setIsLoading] = useState(false);

    const params = getSearchParamsFunction("brand")

    const pathname = usePathname();

    const router = useRouter();

    

    const onSubmit = (selectedValue: string) => {
        setCurrentBrand(selectedValue)
        const url = qs.stringifyUrl({
            url : pathname,
            query : {
                brand : selectedValue,
                ...params
            }
        }, { skipEmptyString: true, skipNull: true })

        router.push(url)
    }

    

    function removeUnderscore(inputString: string): string {
      const outputString = inputString.replace(/_/g, ' ');
      return outputString;
  }

    return ( 
        <div className="w-full">
            <div className="w-full">
            <Label className="flex justify-start items-center ">
                        <p className="ml-2 font-semibold"> Marke </p>
                    </Label>
                    
        <Select
          onValueChange={(brand) => {
            onSubmit(brand)
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
          {Object.values(CarBrands).map((brand, index) => (
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
 
export default PkwBrandBar;