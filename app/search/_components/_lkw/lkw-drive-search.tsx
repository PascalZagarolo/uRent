'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSavedSearchParams } from "@/store";
import { DriveType, Inserat, LkwBrand } from "@prisma/client";


import axios from "axios";
import { User2Icon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";



const LkwDriveSearch = () => {

    const [currentAge, setCurrentAge] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const router = useRouter();

    const params = useParams();

    const onSubmit = (selectedValue: string) => {
        changeSearchParams("drive" , selectedValue);
        console.log(selectedValue)
    }

    const deleteDrive = () => {
      deleteSearchParams("drive")
    }

    function removeUnderscore(inputString: string): string {
      const outputString = inputString.replace(/_/g, ' ');
      return outputString;
  }

    return ( 
        <div className="w-full">
            <div className="w-full">
            <Label className="flex justify-start items-center ">
                        <p className="ml-2 font-semibold"> Antrieb </p>
                    </Label>
                    
        <Select
          onValueChange={(brand) => {
            brand === "BELIEBIG" ? deleteDrive() : onSubmit(brand)
          }}
          
          disabled={isLoading}
        >

          <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md " 
          disabled={isLoading}  >
            <SelectValue
              placeholder="Wähle deinen gewünschten Antrieb"
              
              
            />
          </SelectTrigger>

          <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
          <SelectItem key="beliebig" value="BELIEBIG" className="font-semibold">
                                Beliebig
         </SelectItem>
         {Object.values(DriveType).map((drive, index) => (
                            <SelectItem key={index} value={drive}>
                                {drive.substring(1)}
                            </SelectItem>
                        ))}
          </SelectContent>
        </Select>
      </div>
        </div>
     );
}
 
export default LkwDriveSearch;