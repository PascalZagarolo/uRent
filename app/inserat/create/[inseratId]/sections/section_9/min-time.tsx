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

interface SelectMinTimeCreationProps {
  currentValue: string;
  setCurrentValue: (value) => void;
  currentDateType: string;
  setCurrentDateType: (value) => void;
}

const SelectMinTimeCreation: React.FC<SelectMinTimeCreationProps> = ({
  currentValue,
  setCurrentValue,
  currentDateType,
  setCurrentDateType
}) => {


  const [isLoading, setIsLoading] = useState(false);

 



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
                setCurrentValue(value);
              }}

              value={currentValue ? String(currentValue) : undefined}
              disabled={isLoading}
            >

              <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md "
                disabled={isLoading} defaultValue={currentValue} >
                <SelectValue
                  placeholder="Wähle die Mindestmietdauer aus"
                  defaultValue={currentValue}

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
          {/* <div className="w-1/2">
            <Select
              onValueChange={(value) => {
                
                setCurrentDateType(value);
                setCurrentValue(null);
              }}
              value={currentDateType ? String(currentDateType) : null}
              disabled={isLoading}
            >

              <SelectTrigger className={
                cn("dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md ", !currentValue && "text-gray-200/60")
              }
                disabled={isLoading}>
                <SelectValue
                  placeholder="Wähle die Kategorie aus"


                />
              </SelectTrigger>

              <SelectContent className={
                cn("dark:bg-[#000000] border-white dark:border-none w-full", !currentValue && "text-gray-200/60")
              }>
                <SelectItem value="h">Stunden</SelectItem>
                <SelectItem value="d">Tag(e)</SelectItem>
                <SelectItem value="w">Woche(n)</SelectItem>
                <SelectItem value="m">Monat(e)</SelectItem>
                <SelectItem value="y">Jahr(e)</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default SelectMinTimeCreation;