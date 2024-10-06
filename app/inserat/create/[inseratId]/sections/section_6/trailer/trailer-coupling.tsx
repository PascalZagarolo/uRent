'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CouplingEnumRender } from "@/db/schema";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

interface CarTypeProps {
    currentValue : string | number;
    setCurrentValue : (value) => void;
}

const TrailerCouplingCreation: React.FC<CarTypeProps> = ({
  currentValue,
  setCurrentValue,
}) => {

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const params = useParams();

    

    return ( 
        <div className="w-full">
            <div className="w-full">
        <Label>Kupplungsart</Label>
        <Select
        //@ts-ignore
          onValueChange={(coupling : typeof CouplingEnumRender) => {
            setCurrentValue(coupling);
          }} 
          disabled={isLoading}
          //@ts-ignore
          value={currentValue}
        >

          <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md " 
          disabled={isLoading}  >
            <SelectValue
              placeholder="Wähle die Kategorie aus"
              
              
            />
          </SelectTrigger>

          <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
            <SelectItem value="KUGELKOPFKUPPLUNG">Kugelkopfkupplung</SelectItem>
            <SelectItem value="MAULKUPPLUNG">Maulkupplung</SelectItem>
            <SelectItem value={null}>Beliebig</SelectItem>
          </SelectContent>
        </Select>
      </div>
        </div>
     );
}









export default TrailerCouplingCreation;