'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DriveType,  Transmission } from "@prisma/client";


import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

interface DriveFormProps {
    drive : DriveType;
}

const DriveForm: React.FC<DriveFormProps> = ({
    drive
}) => {

    const [currentdrive, setCurrentdrive] = useState<DriveType | null>(null);
    const [isdrive, setIsdrive] = useState(false);

    const router = useRouter();

    const params = useParams();

    const onSubmit = (selectedValue: DriveType) => {
        try {
    
            setCurrentdrive(selectedValue);
    
          const values = {
            drive: selectedValue
          }
    
          setIsdrive(true);
          axios.patch(`/api/inserat/${params.inseratId}/lkw`, values);
          toast.success("Anzahl Türen erfolgreich gespeichert : " + values.drive);
          setTimeout(() => {
            router.refresh();
          }, 400)
        } catch {
          toast.error("Fehler beim Speichern der Kategorie");
        } finally {
          setIsdrive(false);
        }
      }

    return ( 
        <div className="w-full">
            <div className="w-full">
        <Label>Antrieb</Label>
        <Select
          onValueChange={(drive : DriveType) => {
            onSubmit(drive);
          }}
          defaultValue={drive || null}
          disabled={isdrive}
        >

          <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md " 
          disabled={isdrive} defaultValue={drive || null} >
            <SelectValue
              placeholder="Wähle die Kategorie aus"
              defaultValue={drive || null}
              
            />
          </SelectTrigger>

          <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
          {Object.values(DriveType).map((drive, index) => (
                            <SelectItem key={index} value={drive}>
                                {drive.substring(1)}
                            </SelectItem>
                        ))}
          </SelectContent>
        </Select>
      </div>
        </div>
     );
}
 
export default DriveForm;