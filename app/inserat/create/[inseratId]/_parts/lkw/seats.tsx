'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

interface SeatsProps {
    seats : number;
}

const Seats: React.FC<SeatsProps> = ({
    seats
}) => {

    const [currentSeats, setCurrentSeats] = useState(seats);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const params = useParams();

    const onSubmit = (selectedValue: number) => {
        try {
    
          setCurrentSeats(selectedValue);
    
          const values = {
            seats: selectedValue
          }
    
          setIsLoading(true);
          axios.patch(`/api/inserat/${params.inseratId}/lkw`, values);
          toast.success("Anzahl Türen erfolgreich gespeichert : " + values.seats);
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
        <Label>Anzahl der Sitze</Label>
        <Select
          onValueChange={(seats) => {
            onSubmit(Number(seats));
          }}
          defaultValue={String(seats) || "4"}
          disabled={isLoading}
        >

          <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md " 
          disabled={isLoading} defaultValue={seats} >
            <SelectValue
              placeholder="Wähle die Kategorie aus"
              defaultValue={seats}
              
            />
          </SelectTrigger>

          <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="6">6</SelectItem>
            <SelectItem value="7">7</SelectItem>
          </SelectContent>
        </Select>
      </div>
        </div>
     );
}
 
export default Seats;