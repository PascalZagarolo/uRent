'use client'

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CarType, CouplingType, FuelType } from "@prisma/client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CarTypeProps {
  brake: boolean;
}

const TrailerBrake: React.FC<CarTypeProps> = ({ brake }) => {
  const [currentCoupling, setCurrentCoupling] = useState<boolean | null>(brake);
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
        <Label>Auflaufbremse?</Label>
        <Select
          onValueChange={(coupling: CouplingType) => {
            onSubmit(coupling);
          }}
          disabled={isLoading}
          value={brake !== null ? String(brake) : null}
        >
          <SelectTrigger
            className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md "
            disabled={isLoading}
          >
            <SelectValue placeholder="Wähle die Kategorie aus" />
          </SelectTrigger>
          <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
            <SelectItem value="true">ja</SelectItem>
            <SelectItem value="false">nein</SelectItem>
            <SelectItem value={null}>Beliebig</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
    </div>
  );
};

export default TrailerBrake;