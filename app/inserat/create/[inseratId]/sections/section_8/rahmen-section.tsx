'use client'

import { inserat } from "@/db/schema";

import { useEffect, useState } from "react";


import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRightCircleIcon } from "lucide-react";
import toast from "react-hot-toast";

import SelectCautionCreation from "./caution";
import SelectLicenseCreation from "./license";
import RequiredAgeCreation from "./reqAge";
import axios from "axios";
import { RenderErrorMessage } from "../_components/render-messages";


interface RahmenSectionProps {
    thisInserat : typeof inserat.$inferSelect;
    currentSection : number;
    changeSection : (value : number) => void;
}

const RahmenSection = ({ thisInserat, currentSection, changeSection } : RahmenSectionProps) => {

    
    


    const [currentCaution, setCurrentCaution] = useState(thisInserat?.caution);
    const [currentReqAge, setCurrentReqAge] = useState(thisInserat?.reqAge);
    const [currentLicense, setCurrentLicense] = useState(thisInserat?.license);

    

    const onSave = async () => {
        try {
          
            const values = {
                caution : currentCaution,
                reqAge : currentReqAge,
                license : currentLicense
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

    


    useEffect(() => {
        // Check if the value contains any non-numeric characters
        const cautionRegex = /^[0-9]+(\.[0-9]{2})?$/ // This allows only numbers and optionally one dot for decimals
        const parsedCaution = parseFloat(currentCaution as string);
    
        if (currentCaution !== undefined && currentCaution !== "") {
            // If it doesn't match the regex or is not a positive number
            if (!cautionRegex.test(currentCaution) || isNaN(parsedCaution) || parsedCaution <= 0) {
                setError({ errorField: "caution", errorText: "Bitte gebe eine gültige Kaution an." });
            } else {
                setError(null);
            }
        }
    }, [currentCaution]);

    

    return ( 
        <>
            <div className="flex flex-col h-full">
                <h3 className="text-lg font-semibold">
                    Rahmenbedingungen
                    <p className="text-xs text-gray-200/60 font-medium text-left">
                        Gebe die Rahmenbedingungen für dein Inserat an, wie bspw. die Mindestmietdauer oder die maximale Anzahl an Kilometern.
                    </p>
                </h3>
                <div className="mt-4">
                  <SelectCautionCreation currentValue={currentCaution} setCurrentValue={setCurrentCaution} />
                  {error?.errorField === "caution" &&  <RenderErrorMessage error={error.errorText as string}/>}
                </div>
                <div className="mt-4">
                <RequiredAgeCreation currentValue={currentReqAge as any} setCurrentValue={setCurrentReqAge} />
               </div>
                <div className="mt-4">
                  <SelectLicenseCreation currentValue={currentLicense} setCurrentValue={setCurrentLicense} category={thisInserat?.category} />
                </div>
               
                
            </div>
            <div className="mt-auto flex flex-col">
                    <span className="text-xs text-gray-200/60 flex flex-row items-center hover:underline cursor-pointer">
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
 
export default RahmenSection;