'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";




import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

interface CarTypeProps {
  currentValue : number;
  setCurrentValue : (value) => void;
}

const TransportWeightClassCreation: React.FC<CarTypeProps> = ({
    currentValue,
    setCurrentValue
}) => {


    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const params = useParams();

    

    return ( 
        <div className="w-full">
            <div className="w-full">
        <Label>zul. Gesamtgewicht</Label>
        <Select
          onValueChange={(axis : string) => {
            setCurrentValue(axis);
          }}
          
          
          disabled={isLoading}
          value={currentValue ? String(currentValue) : null}
        >

          <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md " 
          disabled={isLoading}  >
            <SelectValue
              placeholder="Wähle die Kategorie aus"
              
              
            />
          </SelectTrigger>

          <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
            <SelectItem value="280">2,8 t</SelectItem>
            <SelectItem value="350">3,5 t</SelectItem>
            <SelectItem value="550">5,5 t</SelectItem>
            <SelectItem value={null}>Beliebig</SelectItem>
          </SelectContent>
        </Select>
      </div>
        </div>
     );
}









export default TransportWeightClassCreation;