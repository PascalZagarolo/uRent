'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DriveEnumRender } from "@/db/schema";



import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

interface DriveFormProps {
    thisDrive : typeof DriveEnumRender;
}

const DriveForm: React.FC<DriveFormProps> = ({
  thisDrive
}) => {

    const [currentDrive, setCurrentdrive] = useState<typeof DriveEnumRender | null>(thisDrive);
    const [isdrive, setIsdrive] = useState(false);

    const router = useRouter();

    const params = useParams();

    const onSubmit = (selectedValue: typeof DriveEnumRender) => {
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
        //@ts-ignore
          onValueChange={(drive : typeof DriveEnumRender) => {
            onSubmit(drive);
          }}
          //@ts-ignore
          value={currentDrive}
          disabled={isdrive}
        >

          <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md " 
          disabled={isdrive}>
            <SelectValue
              placeholder="Wähle die Kategorie aus"
              
              
            />
          </SelectTrigger>

          <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
            <SelectItem value={null}>Beliebig</SelectItem>
          {Object.values(DriveEnumRender).map((drive, index) => (
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