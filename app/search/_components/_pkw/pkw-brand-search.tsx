'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BrandEnumRender } from "@/db/schema";
import { useSavedSearchParams } from "@/store";



import axios from "axios";
import { User2Icon } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";



const PkwBrandSearch = () => {

  const currentObject : any = useSavedSearchParams((state) => state.searchParams)

  const [currentAge, setCurrentAge] = useState(currentObject["thisBrand"] ? currentObject["thisBrand"] : null);
  const [isLoading, setIsLoading] = useState(false);

  const thisSearchParams = useSearchParams();
  const existingBrand = thisSearchParams.get("thisBrand");

  const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

  

  const onSubmit = (selectedValue: string) => {
    setCurrentAge(selectedValue);
      changeSearchParams("thisBrand" , selectedValue);
      console.log(selectedValue)
  }

  const deleteBrand = () => {
    setCurrentAge(null);
    deleteSearchParams("thisBrand")
  }

  useEffect(() => {
    if(existingBrand) {
      setCurrentAge(existingBrand);
      changeSearchParams("thisBrand" , existingBrand);
    }
  },[])

  function removeUnderscore(inputString: string): string {
    const outputString = inputString.replace(/_/g, ' ');
    return outputString;
}



  return (
    <div className="w-full">
      <div className="w-full">
        <Label className="flex justify-start items-center ">
          <p className="ml-2 font-semibold">Marke </p>
        </Label>

        <Select
          onValueChange={(brand) => {
            !brand ? deleteBrand() : onSubmit(brand)
          }}
          value={currentAge}
          disabled={isLoading}
        >

          <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md "
            disabled={isLoading}  >
            <SelectValue



            />
          </SelectTrigger>

          <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
            <SelectItem key="beliebig" value={null} className="font-semibold">
              Beliebig
            </SelectItem>
            {Object.values(BrandEnumRender).map((brand, index) => (

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

export default PkwBrandSearch;