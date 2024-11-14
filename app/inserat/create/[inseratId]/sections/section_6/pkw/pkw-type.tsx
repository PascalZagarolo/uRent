'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CarTypeEnumRender } from "@/db/schema";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

interface CarTypeProps {
    currentValue : string;
    setCurrentValue : (value) => void;
}

const CarTypeCreation: React.FC<CarTypeProps> = ({
  currentValue,
  setCurrentValue
}) => {


    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const params = useParams();

    

    return ( 
        <div className="w-full">
            <div className="w-full">
        <Label>Fahrzeugtyp</Label>
        <Select
        //@ts-ignore
          onValueChange={(carType : typeof CarTypeEnumRender) => {
            setCurrentValue(carType);
          }}
          
          disabled={isLoading}
          //@ts-ignore
          value={currentValue}
        >

          <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md " 
          disabled={isLoading}  >
            <SelectValue
            />
          </SelectTrigger>

          <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
            <SelectItem value={null}>Beliebig</SelectItem>
            <SelectItem value="CABRIO">Cabrio</SelectItem>
            <SelectItem value="COUPE">Coupe</SelectItem>
            <SelectItem value="PICKUP">Geländewagen/Pickup</SelectItem>
            
            <SelectItem value="KASTENWAGEN">Kastenwagen</SelectItem>
            <SelectItem value="KLEINBUS">Kleinbus</SelectItem>
            <SelectItem value="KLEIN">Kleinwagen</SelectItem>
            <SelectItem value="KOMBI">Kombi</SelectItem>

            <SelectItem value="LIMOUSINE">Limousine</SelectItem>
            
            <SelectItem value="SPORT">Sportwagen</SelectItem>
            <SelectItem value="SUPERSPORT">Supersportwagen</SelectItem>
            <SelectItem value="SUV">SUV</SelectItem>

            <SelectItem value="VAN">Van</SelectItem>
          </SelectContent>
        </Select>
      </div>
        </div>
     );
}









export default CarTypeCreation;