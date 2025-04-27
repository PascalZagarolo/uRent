'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSavedSearchParams } from "@/store";
import { cn } from "@/lib/utils";
import { User2Icon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const RequiredAgeSearch = () => {
  const currentObject: any = useSavedSearchParams((state) => state.searchParams);
  const [currentAge, setCurrentAge] = useState(currentObject["reqAge"] ? currentObject["reqAge"] : 0);
  const [isLoading, setIsLoading] = useState(false);
  const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();
  const router = useRouter();
  const params = useParams();

  const onSubmit = (selectedValue: number) => {
    setCurrentAge(selectedValue);
    changeSearchParams("reqAge", selectedValue);
  }

  const deleteAge = () => {
    setCurrentAge(0);
    deleteSearchParams("reqAge");
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-indigo-900/20 text-indigo-400">
          <User2Icon className="w-4 h-4" />
        </div>
        <h3 className="font-medium text-sm text-gray-100">Mindestalter</h3>
      </div>
      
      <div className="group">
        <Select
          onValueChange={(reqAge) => {
            Number(reqAge) === 0 ? deleteAge() : onSubmit(Number(reqAge));
          }}
          value={String(currentAge)}
          disabled={isLoading}
        >
          <SelectTrigger 
            className={cn(
              "h-10 transition-all duration-200 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500 border-0 bg-[#1e1e2a] text-gray-200 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24]",
              currentAge === 0 && "text-gray-500"
            )} 
            disabled={isLoading}
          >
            <SelectValue placeholder="Alter wählen" />
          </SelectTrigger>

          <SelectContent className="bg-[#1e1e2a] border border-indigo-900/30 rounded-md">
            <SelectItem value="0" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">Beliebig</SelectItem>
            {[16, 17, 18, 19, 20, 21, 23, 24, 25, 26, 27, 28, 29, 30].map((age) => (
              <SelectItem 
                key={age} 
                value={String(age)}
                className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer"
              >
                {age} Jahre
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${currentAge !== 0 ? 'w-full' : 'w-0'}`}></div>
      </div>
    </div>
  );
}
 
export default RequiredAgeSearch;