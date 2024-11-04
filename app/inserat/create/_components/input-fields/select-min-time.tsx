'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { inserat } from "@/db/schema";
import { minTimeValues } from "@/hooks/min-time/useMinTime";
import { cn } from "@/lib/utils";



import axios from "axios";
import { User2Icon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface SelectMinTimeProps {
  thisInserat: typeof inserat.$inferSelect;
}

const SelectMinTime: React.FC<SelectMinTimeProps> = ({
  thisInserat
}) => {

  const [currentValue, setCurrentValue] = useState<string | null>(thisInserat.minTime ? String(thisInserat.minTime ?? "") : null);
  const [isLoading, setIsLoading] = useState(false);
  

  const router = useRouter();

  const params = useParams();

  const renderCorresponding = (value: number) => {
    switch (value) {
      case 1: return (
        <SelectLabel className="pl-4 font-semibold mb-4">
          Stunden
        </SelectLabel>
      );
      case 24 : return (
        <SelectLabel className="pl-4 font-semibold mb-4 mt-4">
          Tag(e)
        </SelectLabel>
      );
      case 168: return (
        <SelectLabel className="pl-4 font-semibold mb-4 mt-4 ">
          Woche(n)
        </SelectLabel>
      );
      case 720: return (
        <SelectLabel className="pl-4 font-semibold mb-4  mt-4">
          Monat(e)
        </SelectLabel>
      );
      case 8760: return (
        <SelectLabel className="pl-4 font-semibold mb-4  mt-4">
          Jahr(e)
        </SelectLabel>
      )
    }
  }



  const onSubmit = async (selectedValue: string) => {
    try {
      setCurrentValue(selectedValue);

      const values = {
        minTime: selectedValue
      }
      console.log(values);
      setIsLoading(true);
      await axios.patch(`/api/inserat/${params.inseratId}`, values);
      toast.success("Mindestmietdauer gespeichert");
      router.refresh();
    } catch {
      toast.error("Fehler beim Speichern der Mindestmietdauer");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full">
      <div className="w-full">
        <Label className="flex justify-start items-center ">
          <User2Icon className="w-4 h-4" /><p className="ml-2 font-semibold"> Mindestmietdauer </p>
        </Label>
        <p className="font-semibold text-gray-800/50 text-xs dark:text-gray-100/80  truncate"> Wie lange müssen Kunden das Fahrzeug mindestens mieten? </p>
        <div className="w-full flex items-center gap-x-4">
          <div className="w-full">
            <Select
              onValueChange={(value) => {
                onSubmit(value);
              }}
              value={currentValue ? String(currentValue) : null}
              disabled={isLoading}
            >

              <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md "
                disabled={isLoading} defaultValue={thisInserat.reqAge} >
                <SelectValue
                  placeholder="Wähle die Kategorie aus"
                  defaultValue={inserat.reqAge as any}

                />
              </SelectTrigger>
              <SelectContent className="bg-[#191919] border-none">
              <SelectGroup>
                <SelectItem value={null} className="mb-4">
                  Keine Mindestmietdauer
                </SelectItem>
                {minTimeValues.map((item) => (
                  <>
                    {renderCorresponding(item.value)}
                    <SelectItem key={item.value} value={String(item.value)} className="px-16">
                      {item.label}
                    </SelectItem>
                  </>
                ))}
              </SelectGroup>
              </SelectContent>

            </Select>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SelectMinTime;