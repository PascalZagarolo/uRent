'use client'

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CarTypeProps {
  currentValue : string;
  setCurrentValue : (value) => void;
}

const PkwAhkCreation: React.FC<CarTypeProps> = ({ currentValue, setCurrentValue }) => {
 
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const params = useParams();

  

  return (
    <div className="w-full">
      <div className="w-full">
        <Label>Anhängerkupplung</Label>
        <Select
          onValueChange={(coupling) => {
            setCurrentValue(coupling);
          }}
          disabled={isLoading}
          value={typeof(currentValue) === "undefined" ? "false" : String(currentValue) }
          
          
        >
          <SelectTrigger
          
            className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md "
            disabled={isLoading}
          >
            <SelectValue placeholder="Beliebig" />
            <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">

            <SelectItem value="true">Vorhanden</SelectItem>
            <SelectItem value="false">Nicht vorhanden</SelectItem>   
          </SelectContent>
          </SelectTrigger>
          
        </Select>
      </div>
      
    </div>
  );
};

export default PkwAhkCreation;
