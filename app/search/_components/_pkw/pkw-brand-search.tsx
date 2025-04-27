'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BrandEnumRender } from "@/db/schema";
import { useSavedSearchParams } from "@/store";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Car } from "lucide-react";
import { cn } from "@/lib/utils";

const PkwBrandSearch = () => {
  const currentObject: any = useSavedSearchParams((state) => state.searchParams);
  const [currentBrand, setCurrentBrand] = useState(currentObject["thisBrand"] ? currentObject["thisBrand"] : null);
  const [isLoading, setIsLoading] = useState(false);

  const thisSearchParams = useSearchParams();
  const existingBrand = thisSearchParams.get("thisBrand");

  const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

  const onSubmit = (selectedValue: string) => {
    setCurrentBrand(selectedValue);
    changeSearchParams("thisBrand", selectedValue);
  }

  const deleteBrand = () => {
    setCurrentBrand(null);
    deleteSearchParams("thisBrand");
  }

  useEffect(() => {
    if (existingBrand) {
      setCurrentBrand(existingBrand);
      changeSearchParams("thisBrand", existingBrand);
    }
  }, []);

  function removeUnderscore(inputString: string): string {
    const outputString = inputString.replace(/_/g, ' ');
    return outputString;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-indigo-900/20 text-indigo-400">
          <Car className="w-4 h-4" />
        </div>
        <h3 className="font-medium text-sm text-gray-100">Marke</h3>
      </div>
      
      <div className="group">
        <Select
          onValueChange={(value) => {
            value === "BELIEBIG" ? deleteBrand() : onSubmit(value);
          }}
          value={currentBrand || "BELIEBIG"}
          disabled={isLoading}
        >
          <SelectTrigger 
            className={cn(
              "h-10 transition-all duration-200 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500 border-0 bg-[#1e1e2a] text-gray-200 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24]",
              !currentBrand && "text-gray-500"
            )}
            disabled={isLoading}
          >
            <SelectValue placeholder="Wähle eine Marke" />
          </SelectTrigger>
          
          <SelectContent className="bg-[#1e1e2a] border border-indigo-900/30 rounded-md">
            <SelectItem value="BELIEBIG" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">
              Beliebig
            </SelectItem>
            {Object.values(BrandEnumRender).map((brand, index) => (
              <SelectItem key={index} value={brand} className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">
                {removeUnderscore(brand)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${currentBrand ? 'w-full' : 'w-0'}`}></div>
      </div>
    </div>
  );
}

export default PkwBrandSearch;