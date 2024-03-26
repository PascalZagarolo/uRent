'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

interface DoorsProps {
  thisDoors : number;
}

const Doors: React.FC<DoorsProps> = ({
  thisDoors
}) => {

    const [currentDoors, setCurrentDoors] = useState(thisDoors);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const params = useParams();

    const onSubmit = (selectedValue: number) => {
        try {
    
          setCurrentDoors(selectedValue);
    
          const values = {
            doors: selectedValue
          }
    
          setIsLoading(true);
          axios.patch(`/api/inserat/${params.inseratId}/pkw`, values);
          toast.success("Anzahl Türen erfolgreich gespeichert : " + values.doors);
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
        <Label>Anzahl der Türen</Label>
        <Select
          onValueChange={(seats) => {
            onSubmit(Number(seats));
          }}
          value={currentDoors ? String(currentDoors) : null}
          disabled={isLoading}
        >

          <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md " 
          disabled={isLoading}>
            <SelectValue
              placeholder="Wähle die Kategorie aus"
              
              
            />
          </SelectTrigger>

          <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
            <SelectItem value={null}>Beliebig</SelectItem>
            <SelectItem value="2">2/3</SelectItem>
            <SelectItem value="4">4/5</SelectItem>
            <SelectItem value="6">6/7</SelectItem>
          </SelectContent>
        </Select>
      </div>
        </div>
     );
}
 
export default Doors;