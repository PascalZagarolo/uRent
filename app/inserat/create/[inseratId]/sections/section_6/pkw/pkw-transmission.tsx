'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TransmissionEnumRender } from "@/db/schema";



import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

interface TransmissionFormCreationProps {
  currentValue : string;
  setCurrentValue : (value) => void;
}

const TransmissionFormCreation: React.FC<TransmissionFormCreationProps> = ({
  currentValue,
  setCurrentValue
}) => {


    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const params = useParams();

   

    return ( 
        <div className="w-full">
            <div className="w-full">
        <Label>Getriebe</Label>
        <Select
     
          onValueChange={(transmission) => {
            console.log(transmission)
            setCurrentValue(transmission);
          }}
          
          value={currentValue}
          disabled={isLoading}
        >

          <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md " 
          disabled={isLoading}>
            <SelectValue  

            />
          </SelectTrigger>

          <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
          <SelectItem value={null}>Beliebig</SelectItem>
            <SelectItem value="MANUAL">Manuell</SelectItem>
            <SelectItem value="AUTOMATIC">Automatisch</SelectItem>
          </SelectContent>
        </Select>
      </div>
        </div>
     );
}
 
export default TransmissionFormCreation;