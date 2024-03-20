'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FuelTypeEnumRender } from "@/db/schema";




import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

interface TransportFuelProps {
  thisFuel : typeof FuelTypeEnumRender;
}

const TransportFuel: React.FC<TransportFuelProps> = ({
  thisFuel
}) => {

    const [currentFuel, setCurrentFuel] = useState<typeof FuelTypeEnumRender | null>(thisFuel);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const params = useParams();

    const onSubmit = (selectedValue: typeof FuelTypeEnumRender) => {
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
        //@ts-ignore
          onValueChange={(fuel : typeof FuelTypeEnumRender) => {
            onSubmit(fuel);
          }}
          
          disabled={isLoading}
          //@ts-ignore
          value={currentFuel}
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