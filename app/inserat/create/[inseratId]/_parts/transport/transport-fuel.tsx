'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FuelType } from "@prisma/client";



import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

interface TransportFuelProps {
  fuel : FuelType;
}

const TransportFuel: React.FC<TransportFuelProps> = ({
    fuel
}) => {

    const [currentFuel, setCurrentFuel] = useState<FuelType | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const params = useParams();

    const onSubmit = (selectedValue: FuelType) => {
        try {
    
            setCurrentFuel(selectedValue);
    
          const values = {
            fuel: selectedValue
          }
    
          setIsLoading(true);
          axios.patch(`/api/inserat/${params.inseratId}/transport`, values);
          toast.success("Anzahl Türen erfolgreich gespeichert : " + values.fuel);
          setTimeout(() => {
            router.refresh();
          }, 400)
        } catch {
          toast.error("Fehler beim Speichern der Kategorie");
        } finally {
          setIsLoading(false);
        }
      }

    return ( 
        <div className="w-full">
            <div className="w-full">
        <Label>Kraftstoff</Label>
        <Select
          onValueChange={(fuel : FuelType) => {
            onSubmit(fuel);
          }}
          
          disabled={isLoading}
          value={fuel}
        >

          <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md " 
          disabled={isLoading} >
            <SelectValue
              placeholder="Wähle die Kategorie aus"
            />
          </SelectTrigger>

          <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
            <SelectItem value="BENZIN">Benzin</SelectItem>
            <SelectItem value="DIESEL">Diesel</SelectItem>
            <SelectItem value="ELEKTRISCH">Elektrisch</SelectItem>
            <SelectItem value="HYBRID">Hybrid</SelectItem>
            <SelectItem value={null}>Beliebig</SelectItem>
          </SelectContent>
        </Select>
      </div>
        </div>
     );
}
 
export default TransportFuel;