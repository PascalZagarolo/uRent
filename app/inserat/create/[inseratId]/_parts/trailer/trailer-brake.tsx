'use client'

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CarTypeProps {
  thisBrake: boolean;
}

const TrailerBrake: React.FC<CarTypeProps> = ({ thisBrake }) => {
  const [currentCoupling, setCurrentCoupling] = useState<boolean | null>(thisBrake || null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const params = useParams();

  const onSubmit = (selectedValue: string | null) => {
    try {
      if (selectedValue) {
        setCurrentCoupling(selectedValue === "true" ? true : false); 
      } else {
        setCurrentCoupling(null);
      }

      const values = {
        brake: selectedValue ? (selectedValue.toLowerCase() == 'true') : null,
      };

      setIsLoading(true);
      axios.patch(`/api/inserat/${params.inseratId}/trailer`, values);
      toast.success("Anzahl Türen erfolgreich gespeichert : " + values);
      setTimeout(() => {
        router.refresh();
      }, 400);
    } catch {
      toast.error("Fehler beim Speichern der Kategorie");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full">
        <Label>Bremsvorrichtung</Label>
        <Select
          onValueChange={(coupling) => {
            onSubmit(coupling);
          }}
          disabled={isLoading}
          value={thisBrake !== null ? String(thisBrake) : "false"}
          
          
        >
          <SelectTrigger
          
            className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md "
            disabled={isLoading}
          >
            <SelectValue placeholder="Wähle die Kategorie aus" />
            <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
            <SelectItem value="true">gebremst</SelectItem>
            <SelectItem value="false">ungebremst</SelectItem>   
          </SelectContent>
          </SelectTrigger>
          
        </Select>
      </div>
      
    </div>
  );
};

export default TrailerBrake;
