'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";




import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

interface CarTypeProps {
  thisAxis : number;
}

const TrailerAxis: React.FC<CarTypeProps> = ({
  thisAxis
}) => {

    const [currentAxis, setCurrentAxis] = useState<number | null>(thisAxis);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const params = useParams();

    const onSubmit = (selectedValue: string) => {
        try {
    
            setCurrentAxis(Number(selectedValue));
    
          const values = {
            axis: Number(selectedValue)
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
        <Label>Anz. Achsen</Label>
        <Select
          onValueChange={(axis : string) => {
            onSubmit(axis);
          }}
          
          
          disabled={isLoading}
          value={thisAxis ? String(thisAxis) : null}
        >

          <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md " 
          disabled={isLoading}  >
            <SelectValue
              placeholder="Wähle die Kategorie aus"
              
              
            />
          </SelectTrigger>

          <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="5">{'>'} 4</SelectItem>
            <SelectItem value={null}>Beliebig</SelectItem>
          </SelectContent>
        </Select>
      </div>
        </div>
     );
}









export default TrailerAxis;