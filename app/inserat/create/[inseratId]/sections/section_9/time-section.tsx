'use client'

import { inserat } from "@/db/schema";

import { useEffect, useState } from "react";


import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRightCircleIcon } from "lucide-react";
import toast from "react-hot-toast";


import axios from "axios";
import { RenderErrorMessage } from "../_components/render-messages";
import SelectMinTimeCreation from "./min-time";
import { switchSectionOverview } from "@/hooks/inserat-creation/useRouterHistory";


interface TimeSectionProps {
    thisInserat : typeof inserat.$inferSelect;
    currentSection : number;
    changeSection : (value : number) => void;
}

const TimeSection = ({ thisInserat, currentSection, changeSection } : TimeSectionProps) => {

    
    


    const [currentMinTime, setCurrentMinTime] = useState<string | null>(thisInserat.minTime ? thisInserat.minTime : null);
    const [currentDateType, setCurrentDateType] = useState<string>(thisInserat.minTime ? thisInserat.minTime.slice(-1) : "d");
    

    const onSave = async () => {
        try {
            const values = {
                minTime : currentMinTime,
            }
          await axios.patch(`/api/inserat/${thisInserat.id}`, values);
          changeSection(currentSection + 1);
        } catch(e : any) {
            console.log(e);
            toast.error("Fehler beim Speichern der Änderungen");
        }
    }

    const onPrevious = () => {
        changeSection(currentSection - 1);
    }

    const [error, setError] = useState< {errorField : string; errorText : string}|null>(null);

    


    const hasChanged = false;

    

    return ( 
        <>
            <div className="flex flex-col h-full">
                <h3 className="text-lg font-semibold">
                    Mietdauer 
                    <p className="text-xs text-gray-200/60 font-medium text-left">
                        Gebe deine Mindestmietdauer an, also den Zeitraum die der Mieter mindestens mieten muss. <br/>
                        Falls du keine Mindestmietdauer hast, lasse das Feld einfach leer oder klicke auf {`"`}Beliebig{`"`}.
                    </p>
                </h3>
                <div className="mt-4">
                    <SelectMinTimeCreation currentValue={currentMinTime} setCurrentValue={setCurrentMinTime} currentDateType={currentDateType} setCurrentDateType={setCurrentDateType}/>
                 
                </div>
              

            </div>
            <div className="mt-auto flex flex-col">
                    <span className="text-xs text-gray-200/60 flex flex-row items-center hover:underline cursor-pointer" onClick={() => switchSectionOverview(hasChanged)}>
                       <ArrowLeft className="w-4 h-4 mr-2" /> Zu deiner Inseratsübersicht
                    </span>
                    <div className="grid grid-cols-2 mt-2">
                    <Button className="" variant="ghost" onClick={onPrevious}>
                        Zurück
                    </Button>
                    <Button className="bg-indigo-800 text-gray-200 w-full  hover:bg-indigo-900 hover:text-gray-300"
                    onClick={onSave}
                    disabled={error != undefined}
                    >
                        Fortfahren <ArrowRightCircleIcon className="text-gray-200 w-4 h-4 ml-2" />
                    </Button>
                    </div>
                </div>
            </>
     );
}
 
export default TimeSection;