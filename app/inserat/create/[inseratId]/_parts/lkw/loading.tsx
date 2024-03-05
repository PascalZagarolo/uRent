'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoadingType,  Transmission } from "@prisma/client";


import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

interface LoadingFormProps {
    loading : LoadingType;
}

const LoadingForm: React.FC<LoadingFormProps> = ({
    loading
}) => {

    const [currentloading, setCurrentloading] = useState<LoadingType | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const params = useParams();

    const onSubmit = (selectedValue: LoadingType) => {
        try {
    
            setCurrentloading(selectedValue);
    
          const values = {
            loading: selectedValue
          }
    
          setIsLoading(true);
          axios.patch(`/api/inserat/${params.inseratId}/lkw`, values);
          toast.success("Anzahl Türen erfolgreich gespeichert : " + values.loading);
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
        <Label>Ladevorrichtung</Label>
        <Select
          onValueChange={(loading : LoadingType) => {
            onSubmit(loading);
          }}
          defaultValue={loading || null}
          disabled={isLoading}
        >

          <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md " 
          disabled={isLoading} defaultValue={loading || null} >
            <SelectValue
              placeholder="Wähle die Kategorie aus"
              defaultValue={loading || null}
              
            />
          </SelectTrigger>

          <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
            <SelectItem value="AUFFAHRRAMPE">Auffahrrampe</SelectItem>
            <SelectItem value="LADERAMPE">Laderampe</SelectItem>
            <SelectItem value="KRAN">Kran</SelectItem>
            
          </SelectContent>
        </Select>
      </div>
        </div>
     );
}
 
export default LoadingForm;