'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LkwBrandEnumRender } from "@/db/schema";
import { useSavedSearchParams } from "@/store";



import axios from "axios";
import { User2Icon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";



const LkwBrandSearch = () => {

  const currentObject: any = useSavedSearchParams((state) => state.searchParams)

    const [currentAge, setCurrentAge] = useState(currentObject["lkwBrand"] ? currentObject["lkwBrand"] : null);
    const [isLoading, setIsLoading] = useState(false);

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const router = useRouter();

    const params = useParams();

    const onSubmit = (selectedValue: string) => {
        changeSearchParams("lkwBrand" , selectedValue);
        setCurrentAge(selectedValue)
        console.log(selectedValue)
    }

    const deleteBrand = () => {
      deleteSearchParams("lkwBrand");
      setCurrentAge(null)
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
            !brand ? deleteBrand() : onSubmit(brand)
          }}
          value={currentAge}
          disabled={isLoading}
        >

          <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md " 
          disabled={isLoading}  >
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
 
export default LkwBrandSearch;