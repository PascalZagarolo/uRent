'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CarType, FuelType } from "@prisma/client";



import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

interface CarTypeProps {
  cartype : CarType;
}

const CarTypeForm: React.FC<CarTypeProps> = ({
    cartype
}) => {

    const [currentCarType, setcurrentCarType] = useState<CarType | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const params = useParams();

    const onSubmit = (selectedValue: CarType) => {
        try {
    
            setcurrentCarType(selectedValue);
    
          const values = {
            type: selectedValue
          }
    
          setIsLoading(true);
          axios.patch(`/api/inserat/${params.inseratId}/pkw`, values);
          toast.success("Anzahl Türen erfolgreich gespeichert : " + values.type);
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
        <Label>Fahrzeugtyp</Label>
        <Select
          onValueChange={(carType : CarType) => {
            onSubmit(carType);
          }}
          defaultValue={cartype || "COUPE"}
          disabled={isLoading}
          value={cartype || currentCarType ||"COUPE"}
        >

          <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md " 
          disabled={isLoading} defaultValue={cartype || "COUPE"} >
            <SelectValue
              placeholder="Wähle die Kategorie aus"
              defaultValue={cartype || "COUPE"}
              
            />
          </SelectTrigger>

          <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
            <SelectItem value="KOMBI">Kombi</SelectItem>
            <SelectItem value="COUPE">Coupe</SelectItem>
            <SelectItem value="SUV">SUV</SelectItem>
            <SelectItem value="VAN">Van</SelectItem>
            <SelectItem value="KLEINBUS">Kleinbus</SelectItem>
            <SelectItem value="CABRIO">Cabrio</SelectItem>
            <SelectItem value="KLEIN">Kleinwagen</SelectItem>
            <SelectItem value="SPORT">Sportwagen</SelectItem>
            <SelectItem value="SUPERSPORT">Supersportwagen</SelectItem>
          </SelectContent>
        </Select>
      </div>
        </div>
     );
}









export default CarTypeForm;