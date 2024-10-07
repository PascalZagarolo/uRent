'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { inserat } from "@/db/schema";
import { cn } from "@/lib/utils";



import axios from "axios";
import { User2Icon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface SelectMinTimeCreationProps {
  currentValue : string;
  setCurrentValue : (value) => void;
  currentDateType : string;
  setCurrentDateType : (value) => void;
}

const SelectMinTimeCreation: React.FC<SelectMinTimeCreationProps> = ({
  currentValue,
  setCurrentValue,
  currentDateType,
  setCurrentDateType
}) => {

 
  const [isLoading, setIsLoading] = useState(false);
 
  
  const router = useRouter();

  const params = useParams();

  // useEffect(() => {
  //   let usedSuffix
    
  //   switch(currentDateType) {
  //     case "h":
  //       usedSuffix = "h";
  //       break;
  //     case "d":
  //       usedSuffix = "d";
  //       break;
  //     case "w":
  //       usedSuffix = "w";
  //       break;
  //     case "m":
  //       usedSuffix = "m";
  //       break;
  //     case "y":
  //       usedSuffix = "y";
  //       break;
  //   }

  //   currentValue ? setCurrentValue(currentValue + usedSuffix) : null;
  // },[currentDateType])

  const onHours = () => {
    return (
      <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
        <SelectItem value={null}>
          Keine Mindestdauer
        </SelectItem>
        <SelectItem value="1h">1</SelectItem>
        <SelectItem value="2h">2</SelectItem>
        <SelectItem value="3h">3</SelectItem>
        <SelectItem value="4h">4</SelectItem>
        <SelectItem value="5h">5</SelectItem>
        <SelectItem value="6h">6</SelectItem>
        <SelectItem value="7h">7</SelectItem>
        <SelectItem value="8h">8</SelectItem>
        <SelectItem value="9h">9</SelectItem>
        <SelectItem value="10h">10</SelectItem>
        <SelectItem value="11h">11</SelectItem>
        <SelectItem value="12h">12</SelectItem>s
      </SelectContent>
    )
  }

  const onDays = () => {
    return (
      <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
        <SelectItem value={null}>
          Keine Mindestdauer
        </SelectItem>
        <SelectItem value="1d">1</SelectItem>
        <SelectItem value="2d">2</SelectItem>
        <SelectItem value="3d">3</SelectItem>
        <SelectItem value="4d">4</SelectItem>
        <SelectItem value="5d">5</SelectItem>
        <SelectItem value="6d">6</SelectItem>
      </SelectContent>
    )
  }

  const onWeeks = () => {
    return (
      <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
        <SelectItem value={null}>
          Keine Mindestdauer
        </SelectItem>
        <SelectItem value="1w">1</SelectItem>
        <SelectItem value="2w">2</SelectItem>
        <SelectItem value="3w">3</SelectItem>
        <SelectItem value="4w">4</SelectItem>

      </SelectContent>
    )
  }



  const onMonths = () => {
    return (
      <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
        <SelectItem value={null}>
          Keine Mindestdauer
        </SelectItem>
        <SelectItem value="1m">1</SelectItem>
        <SelectItem value="2m">2</SelectItem>
        <SelectItem value="3m">3</SelectItem>
        <SelectItem value="4m">4</SelectItem>
        <SelectItem value="5m">5</SelectItem>
        <SelectItem value="6m">6</SelectItem>
        <SelectItem value="7m">7</SelectItem>
        <SelectItem value="8m">8</SelectItem>
        <SelectItem value="9m">9</SelectItem>
        <SelectItem value="10m">10</SelectItem>
        <SelectItem value="11m">11</SelectItem>


      </SelectContent>
    )
  }

  const onYears = () => {
    return (
      <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
        <SelectItem value={null}>
          Keine Mindestdauer
        </SelectItem>
        <SelectItem value="1y">1</SelectItem>
        <SelectItem value="2y">2</SelectItem>
        <SelectItem value="3y">3</SelectItem>

      </SelectContent>
    )
  }

  

  return (
    <div className="w-full">
      <div className="w-full">
        <Label className="flex justify-start items-center ">
          <User2Icon className="w-4 h-4" /><p className="ml-2 font-semibold"> Mindestmietdauer </p>
        </Label>
        <p className="font-semibold text-gray-800/50 text-xs dark:text-gray-100/80  truncate"> Wie lange müssen Kunden das Fahrzeug mindestens mieten? </p>
        <div className="w-full flex items-center gap-x-4">
          <div className="w-1/2">
            <Select
              onValueChange={(value) => {
                setCurrentValue(value);
              }}
              value={currentValue ? String(currentValue) : null}
              disabled={isLoading}
            >

              <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md "
                disabled={isLoading} defaultValue={currentValue} >
                <SelectValue
                  placeholder="Wähle die Kategorie aus"
                  defaultValue={inserat.reqAge as any}

                />
              </SelectTrigger>

              {
                {
                  "h": onHours(),
                  "d": onDays(),
                  "w": onWeeks(),
                  "m": onMonths(),
                  "y": onYears()
                }[currentDateType]
              }
            </Select>
          </div>
          <div className="w-1/2">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectMinTimeCreation;