'use client'

import { inserat, pkwAttribute } from "@/db/schema";

import { useState } from "react";


import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRightCircleIcon } from "lucide-react";
import toast from "react-hot-toast";

import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import PowerFormCreation from "./pkw-power";
import InitialFormCreationn from "./pkw-initial";
import InitialFormCreation from "./pkw-initial";
import PkwLoadingVolumeCreation from "./pkw-loading-volume";







interface PkwSection3Props {
    pkwAttribute: typeof pkwAttribute.$inferSelect;
    currentSection: number;
    changeSection: (value: number) => void;
}

const PkwSection3 = ({ pkwAttribute, currentSection, changeSection }: PkwSection3Props) => {



    const [currentPower, setCurrentPower] = useState(pkwAttribute?.power ? pkwAttribute?.power : null);
    const [currentInitial, setCurrentInitial] = useState<string | number>(pkwAttribute?.initial ? pkwAttribute?.initial.getFullYear() : null);
    const [currentVolume, setCurrentVolume] = useState<string | number | null>(pkwAttribute?.loading_volume ? pkwAttribute?.loading_volume : undefined);

    const inseratId = useParams()?.inseratId;


    const onSave = async () => {
        try {
            const values = {
                power: currentPower,
                initial: currentInitial,
                loading_volume: currentVolume
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
                    PKW - Eigenschaften (3/3)
                    <p className="text-xs text-gray-200/60 font-medium text-left">
                        Hier kannst du weitere Kategorie abhängige Attribute deines Fahrzeuges angeben. <br />
                        Diese Informationen helfen potentiellen Käufern, schneller das passende Fahrzeug zu finden.
                    </p>
                </h3>
                <div className="mt-4">
                    <InitialFormCreation
                        currentValue={currentInitial as string}
                        setCurrentValue={(value) => setCurrentInitial(value)}
                    />
                </div>
                <div className="mt-8">
                    <PowerFormCreation
                        currentValue={pkwAttribute?.power}
                        setCurrentValue={(value) => setCurrentPower(value)}
                    />
                </div>
                
                <div className="mt-8">
                <PkwLoadingVolumeCreation
                currentValue={currentVolume as number}
                setCurrentValue={(value) => setCurrentVolume(value)} 
                />
                </div>


            </div>
            <div className=" flex flex-col mt-auto ">
                <span className="text-xs text-gray-200/60 flex flex-row items-center hover:underline cursor-pointer mt-2">
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

export default PkwSection3;