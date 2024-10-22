'use client'

import { inserat, pkwAttribute } from "@/db/schema";

import { useState } from "react";


import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRightCircleIcon } from "lucide-react";
import toast from "react-hot-toast";

import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import FuelFormCreation from "./pkw-fuel";
import DoorsCreation from "./pkw-doors";
import PkwAhkCreation from "./pkw-ahk";
import { switchSectionOverview } from "@/hooks/inserat-creation/useRouterHistory";







interface PkwSection2Props {
    pkwAttribute: typeof pkwAttribute.$inferSelect;
    currentSection: number;
    changeSection: (value: number) => void;
}

const PkwSection2 = ({ pkwAttribute, currentSection, changeSection }: PkwSection2Props) => {

    

   const [currentFuel, setCurrentFuel] = useState(pkwAttribute?.fuel ? pkwAttribute?.fuel : null);
   const [currentDoors, setCurrentDoors] = useState(pkwAttribute?.doors);
   const [currentAhk, setCurrentAhk] = useState(pkwAttribute?.ahk ? pkwAttribute?.ahk : undefined);
  
    const inseratId = useParams()?.inseratId;
    

    const onSave = async () => {
        try {
            const values = {
                fuel: currentFuel,
                doors: currentDoors,
                ahk: currentAhk
            }
            await axios.patch(`/api/inserat/${inseratId}/pkw`, values); 
            changeSection(currentSection + 1);
        } catch (e: any) {
            console.log(e);
            toast.error("Fehler beim Speichern der Änderungen");
        }
    };
    
    const onPrevious = () => {
        changeSection(currentSection - 1);
    }

    const hasChanged = true;

    return (
        <>
        <div className="h-full flex flex-col">
            <h3 className="text-lg font-semibold">
                PKW - Eigenschaften (2/3)
                <p className="text-xs text-gray-200/60 font-medium text-left">
                    Hier kannst du weitere Kategorie abhängige Attribute deines Fahrzeuges angeben. <br />
                    Diese Informationen helfen potentiellen Käufern, schneller das passende Fahrzeug zu finden.
                </p>
            </h3>
            <div className="mt-4">
                <FuelFormCreation currentValue={currentFuel} setCurrentValue={setCurrentFuel} />
            </div>
            <div className="mt-4">
                <DoorsCreation currentValue={currentDoors as any} setCurrentValue={setCurrentDoors} />
            </div>
            <div className="mt-4">
                <PkwAhkCreation currentValue={currentAhk as any} setCurrentValue={setCurrentAhk} />
            </div>
            
            
        </div>
        <div className=" flex flex-col mt-auto ">
        <span className="text-xs text-gray-200/60 flex flex-row items-center hover:underline cursor-pointer mt-2" onClick={() => switchSectionOverview(hasChanged)}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Zu deiner Inseratsübersicht
        </span>
        <div className="grid grid-cols-2 mt-2">
            <Button className="" variant="ghost" onClick={onPrevious}>
                Zurück
            </Button>
            <Button className="bg-indigo-800 text-gray-200 w-full  hover:bg-indigo-900 hover:text-gray-300"
                onClick={onSave}
            >
                Fortfahren <ArrowRightCircleIcon className="text-gray-200 w-4 h-4 ml-2" />
            </Button>
        </div>
    </div>
    </>

    );
}

export default PkwSection2;