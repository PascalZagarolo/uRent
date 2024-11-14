'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

interface LkwWeightClassCreationProps {
  currentValue : number;
  setCurrentValue : (value) => void;
}

const LkwWeightClassCreation: React.FC<LkwWeightClassCreationProps> = ({
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
          onValueChange={(weightClass) => {
            setCurrentValue(Number(weightClass));
          }}
          value={currentValue ? String(currentValue) : null}
          disabled={isLoading}
        >

          <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md "
            disabled={isLoading}>
            <SelectValue
              placeholder="Wähle die Kategorie aus"
            />
          </SelectTrigger>

          <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
          <SelectItem value={null}>Beliebig</SelectItem>
            <SelectItem value="550">5,5 t</SelectItem>
            <SelectItem value="750">7,5 t</SelectItem>
            <SelectItem value="1200">12 t</SelectItem>
            <SelectItem value="1800">18 t</SelectItem>
            <SelectItem value="2600">26 t</SelectItem>
            <SelectItem value="3200">32 t</SelectItem>
            <SelectItem value="3400">34 t</SelectItem>
            <SelectItem value="3900">39 t</SelectItem>
            <SelectItem value="5000">{'>'} 39 t</SelectItem>

          </SelectContent>
        </Select>

      </div>
    </div>
  );
}

export default LkwWeightClassCreation;