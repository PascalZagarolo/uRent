'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CarType, CouplingType, FuelType } from "@prisma/client";



import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

interface CarTypeProps {
  coupling : CouplingType;
}

const TrailerCoupling: React.FC<CarTypeProps> = ({
    coupling
}) => {

    const [currentCoupling, setCurrentCoupling] = useState<CouplingType | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const params = useParams();

    const onSubmit = (selectedValue: CouplingType) => {
        try {
    
            setCurrentCoupling(selectedValue);
    
          const values = {
            coupling: selectedValue
          }
    
          setIsLoading(true);
          axios.patch(`/api/inserat/${params.inseratId}/trailer`, values);
          toast.success("Anzahl Türen erfolgreich gespeichert : " + values);
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
        <Label>Kupplungsart</Label>
        <Select
          onValueChange={(coupling : CouplingType) => {
            onSubmit(coupling);
          }}
          
          
          disabled={isLoading}
          value={coupling}
        >

          <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md " 
          disabled={isLoading}  >
            <SelectValue
              placeholder="Wähle die Kategorie aus"
              
              
            />
          </SelectTrigger>

          <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
            <SelectItem value="KUGELKOPFKUPPLUNG">Kugelkopfkupplung</SelectItem>
            <SelectItem value="MAULKUPPLUNG">Maulkupplung</SelectItem>
            <SelectItem value={null}>Beliebig</SelectItem>
          </SelectContent>
        </Select>
      </div>
        </div>
     );
}









export default TrailerCoupling;