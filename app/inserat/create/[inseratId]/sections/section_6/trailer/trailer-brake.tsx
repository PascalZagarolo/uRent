'use client'

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CarTypeProps {
  currentValue : string | number;
  setCurrentValue : (value) => void;
}

const TrailerBrakeCreation: React.FC<CarTypeProps> = ({ currentValue, setCurrentValue }) => {
  
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const params = useParams();

  

  console.log()

  return (
    <div className="w-full">
      <div className="w-full">
        <Label>Bremsvorrichtung</Label>
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
            <SelectValue placeholder="Wähle die Kategorie aus" />
            <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
            <SelectItem value="true">Gebremst</SelectItem>
            <SelectItem value="false">Ungebremst</SelectItem>   
          </SelectContent>
          </SelectTrigger>
          
        </Select>
      </div>
      
    </div>
  );
};

export default TrailerBrakeCreation;
