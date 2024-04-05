'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CarTypeEnumRender } from "@/db/schema";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

interface CarTypeProps {
  thisCarType : typeof CarTypeEnumRender;
}

const CarTypeForm: React.FC<CarTypeProps> = ({
  thisCarType
}) => {

    const [currentCarType, setcurrentCarType] = useState<typeof CarTypeEnumRender | null>(thisCarType || null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const params = useParams();

    const onSubmit = (selectedValue: typeof CarTypeEnumRender) => {
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
        //@ts-ignore
          onValueChange={(carType : typeof CarTypeEnumRender) => {
            onSubmit(carType);
          }}
          
          disabled={isLoading}
          //@ts-ignore
          value={currentCarType}
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
            
            <SelectItem value="KASTENWAGEN">Kastenwagen</SelectItem>
            <SelectItem value="KLEINBUS">Kleinbus</SelectItem>
            <SelectItem value="KLEIN">Kleinwagen</SelectItem>
            <SelectItem value="KOMBI">Kombi</SelectItem>
            
            
            
            
           
            
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









export default CarTypeForm;