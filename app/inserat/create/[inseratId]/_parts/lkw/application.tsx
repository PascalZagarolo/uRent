'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ApplicationEnumRender } from "@/db/schema";



import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

interface ApplicationFormProps {
    thisApplication : typeof ApplicationEnumRender;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  thisApplication
}) => {

    const [currentApplication, setCurrentApplication] = useState<typeof ApplicationEnumRender | null>(thisApplication || null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const params = useParams();

    const onSubmit = (selectedValue: typeof ApplicationEnumRender) => {
        try {
    
            setCurrentApplication(selectedValue);
    
          const values = {
            application: selectedValue
          }
    
          setIsLoading(true);
          axios.patch(`/api/inserat/${params.inseratId}/lkw`, values);
          toast.success("Anzahl Türen erfolgreich gespeichert : " + values.application);
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
        <Label>Erw. Fahrzeugkategorie</Label>
        <Select
        //@ts-ignore
          onValueChange={(application : typeof ApplicationEnumRender) => {
            onSubmit(application);
          }}
          //@ts-ignore
          value = {currentApplication}
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
          <SelectItem value="CONTAINERTRANSPORT">Containertransport</SelectItem>
          <SelectItem value="FAHRZEUGTRANSPORT">Fahrzeugtransport</SelectItem>
            <SelectItem value="FAHRZEUGTRANSPORT">Fahrzeugtransport</SelectItem>
            <SelectItem value="FLUESSIGKEITSTRANSPORT">Flüssigkeitstransport</SelectItem>

            
            <SelectItem value="KOFFERAUFBAU">Kofferaufbau</SelectItem>
            <SelectItem value="KUEHLWAGEN">Kühlwagen</SelectItem>

            <SelectItem value="MOEBELTRANSPORT">Moebeltransport</SelectItem>

            <SelectItem value="PERSONENTRANSPORT">Personentransport</SelectItem>
            <SelectItem value="PLANWAGEN">Planwagen</SelectItem>
            <SelectItem value="PRITSCHENWAGEN">Pritschenwagen</SelectItem>
            
            <SelectItem value="SATTELSCHLEPPER">Sattelschlepper</SelectItem>

          </SelectContent>
        </Select>
      </div>
        </div>
     );
}
 
export default ApplicationForm;