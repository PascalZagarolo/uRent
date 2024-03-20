'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TransmissionEnumRender } from "@/db/schema";
import { Transmission } from "@prisma/client";


import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

interface TransportTransmissionProps {
    thisTransmission : typeof TransmissionEnumRender;
}

const TransportTransmission: React.FC<TransportTransmissionProps> = ({
  thisTransmission
}) => {

    const [currentTransmission, setCurrentTransmission] = useState<typeof TransmissionEnumRender | null>(thisTransmission);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const params = useParams();

    const onSubmit = (selectedValue: typeof TransmissionEnumRender) => {
        try {
    
            setCurrentTransmission(selectedValue);
    
          const values = {
            transmission: selectedValue
          }
    
          setIsLoading(true);
          axios.patch(`/api/inserat/${params.inseratId}/transport`, values);
          toast.success("Anzahl Türen erfolgreich gespeichert : " + values.transmission);
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
        <Label>Getriebe</Label>
        <Select
        //@ts-ignore
          onValueChange={(transmission : typeof TransmissionEnumRender) => {
            onSubmit(transmission);
          }}
          //@ts-ignore
          value={currentTransmission}
          disabled={isLoading}
        >

          <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md " 
          disabled={isLoading}>
            <SelectValue
              placeholder="Wähle die Kategorie aus"
              
              
            />
          </SelectTrigger>

          <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
            <SelectItem value="MANUAL">Manuell</SelectItem>
            <SelectItem value="AUTOMATIC">Automatisch</SelectItem>
            <SelectItem value={null}>Beliebig</SelectItem>
          </SelectContent>
        </Select>
      </div>
        </div>
     );
}
 
export default TransportTransmission;