'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSavedSearchParams } from "@/store";
import { CarBrands, Inserat, LicenseType, LkwBrand } from "@prisma/client";

import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";
import qs from "query-string";
import { getSearchParamsFunction } from "@/actions/getSearchParams";




const LicenseBar = () => {
    const license = useSearchParams().get("license");
    const [currentLicense, setCurrentLicense] = useState(license);
    const [isLoading, setIsLoading] = useState(false);

    const params = getSearchParamsFunction("license")

    const pathname = usePathname();

    const router = useRouter();

    

    const onSubmit = (selectedValue: string) => {
        setCurrentLicense(selectedValue)
        const url = qs.stringifyUrl({
            url : pathname,
            query : {
                license : selectedValue,
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
                        <p className="ml-2 font-semibold"> Führerschein </p>
                    </Label>
                    
        <Select
          onValueChange={(brand) => {
            onSubmit(brand)
          }}
          value={currentLicense}
          disabled={isLoading}
        >

          <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md " 
          disabled={isLoading} 
          
          >
            <SelectValue
              placeholder="Wähle die Führerscheinklasse"
              
              
            />
          </SelectTrigger>

          <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
          <SelectItem key="beliebig" value={null} className="font-semibold">
                                Beliebig
                            </SelectItem>
          {Object.values(LicenseType).map((license, index) => (
                            <SelectItem key={index} value={license}>
                               {license}
                            </SelectItem>
                        ))}
          </SelectContent>
        </Select>
      </div>
        </div>
     );
}
 
export default LicenseBar;