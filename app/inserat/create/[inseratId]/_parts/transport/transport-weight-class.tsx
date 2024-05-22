'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";




import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

interface CarTypeProps {
  thisWeightClass : number;
}

const TransportWeightClass: React.FC<CarTypeProps> = ({
  thisWeightClass
}) => {

    const [currentWeight, setCurrentWeight] = useState<number | null>(thisWeightClass);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const params = useParams();

    const onSubmit = (selectedValue: string) => {
        try {
    
            setCurrentWeight(Number(selectedValue));
    
          const values = {
            weightClass: Number(selectedValue)
          }
    
          setIsLoading(true);
          axios.patch(`/api/inserat/${params.inseratId}/transport`, values);
          toast.success("Gewichtsklasse gespeichert");
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
        <Label>zul. Gesamtgewicht</Label>
        <Select
          onValueChange={(axis : string) => {
            onSubmit(axis);
          }}
          
          
          disabled={isLoading}
          value={thisWeightClass ? String(thisWeightClass) : null}
        >

          <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md " 
          disabled={isLoading}  >
            <SelectValue
              placeholder="Wähle die Kategorie aus"
              
              
            />
          </SelectTrigger>

          <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
            <SelectItem value="75">0,75 t</SelectItem>
            <SelectItem value="150">1,5 t</SelectItem>
            <SelectItem value="280">2,8 t</SelectItem>
            <SelectItem value="350">3,5 t</SelectItem>
            <SelectItem value="350">5,5 t</SelectItem>
            <SelectItem value={null}>Beliebig</SelectItem>
          </SelectContent>
        </Select>
      </div>
        </div>
     );
}









export default TransportWeightClass;