'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoadingEnumRender } from "@/db/schema";



import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

interface LoadingFormCreationProps {
  currentValue: string;
  setCurrentValue: (value) => void;
}

const LoadingFormCreation: React.FC<LoadingFormCreationProps> = ({
  currentValue,
  setCurrentValue
}) => {


  const [isLoading, setIsLoading] = useState(false);





  return (
    <div className="w-full">
      <div className="w-full">
        <Label>Ladevorrichtung</Label>
        <Select
          //@ts-ignore
          onValueChange={(loading: typeof LoadingEnumRender) => {
            setCurrentValue(loading);
          }}
          //@ts-ignore
          value={currentValue}
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
            <SelectItem value="AUFFAHRRAMPE">Auffahrrampe</SelectItem>
            <SelectItem value="KIPPER">Kipper</SelectItem>
            <SelectItem value="KRAN">Kran</SelectItem>
            <SelectItem value="LADERAMPE">Laderampe</SelectItem>
            <SelectItem value="LADEBORDWAND">Ladebordwand</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default LoadingFormCreation;