'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoadingEnumRender } from "@/db/schema";



import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

interface LoadingFormProps {
    thisLoading : typeof LoadingEnumRender;
}

const LoadingForm: React.FC<LoadingFormProps> = ({
  thisLoading
}) => {

    const [currentLoading, setCurrentloading] = useState<typeof LoadingEnumRender | null>(thisLoading || null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const params = useParams();

    const onSubmit = (selectedValue: typeof LoadingEnumRender) => {
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
          //@ts-ignore
          onValueChange={(loading : typeof LoadingEnumRender) => {
            onSubmit(loading);
          }}
           //@ts-ignore
          value={currentLoading}
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
            <SelectItem value="AUFFAHRRAMPE">Auffahrrampe</SelectItem>
            <SelectItem value="LADERAMPE">Laderampe</SelectItem>
            <SelectItem value="LADEBORDWAND">Ladebordwand</SelectItem>
            <SelectItem value="KRAN">Kran</SelectItem>
          </SelectContent>
        </Select>
      </div>
        </div>
     );
}
 
export default LoadingForm;