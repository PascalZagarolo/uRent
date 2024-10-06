'use client'

import { inserat, pkwAttribute } from "@/db/schema";

import { useEffect, useState } from "react";


import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRightCircleIcon } from "lucide-react";
import toast from "react-hot-toast";

import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";

import { RenderErrorMessage } from "../../_components/render-messages";
import PkwLoadingVolumeCreation from "../pkw/pkw-loading-volume";
import PowerFormCreation from "../pkw/pkw-power";
import InitialFormCreation from "../pkw/pkw-initial";
import { lkwAttribute } from '../../../../../../../db/schema';







interface LkwSection3Props {
    lkwAttribute: typeof lkwAttribute.$inferSelect;
    currentSection: number;
    changeSection: (value: number) => void;
}

const LkwSection3 = ({ lkwAttribute, currentSection, changeSection }: LkwSection3Props) => {



    const [currentPower, setCurrentPower] = useState<string | number>(lkwAttribute?.power ? lkwAttribute?.power : null);
    const [currentInitial, setCurrentInitial] = useState<string | number>(lkwAttribute?.initial ? lkwAttribute?.initial.getFullYear() : null);
    const [currentVolume, setCurrentVolume] = useState<string | number>(lkwAttribute?.loading_volume ? lkwAttribute?.loading_volume : undefined);

    const [error, setError] = useState< {errorField : string; errorText : string}|null>(null);

    const inseratId = useParams()?.inseratId;


    useEffect(() => {

        const parsedVolume = parseFloat(currentVolume as string);
        const parsedPower = parseFloat(currentPower as string);

        if((currentPower !== undefined && currentPower != "") && (isNaN(parsedPower) || parsedPower <= 0)) {
            setError({errorField: "power", errorText: "Bitte gib eine gültige Fahrzeugleistung an"});
        } else if(currentInitial !== undefined && Number.isNaN(currentInitial)) {
            setError({errorField: "initial", errorText: "Bitte gib ein gültiges Baujahr an"});
        }  else if ((currentVolume !== undefined && currentVolume != "") && (isNaN(parsedVolume) || parsedVolume <= 0)) {
            setError({ errorField: "volume", errorText: "Bitte gib ein gültiges Ladevolumen an" });
        } else {
            setError(null);
        }

    },[currentPower, currentInitial, currentVolume]);
    const onSave = async () => {
        try {

            if(currentPower !== undefined && Number.isNaN(currentPower)) {
                toast.error("Bitte gib eine gültige Fahrzeugleistung an");
                return;
            }

            const values = {
                power: currentPower,
                initial: currentInitial,
                loading_volume: currentVolume
            }
            await axios.patch(`/api/inserat/${inseratId}/lkw`, values);
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
                    LKW - Eigenschaften (3/3)
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
                        currentValue={currentPower}
                        setCurrentValue={(value) => setCurrentPower(value)}
                    />
                    {error?.errorField === "power" ? <RenderErrorMessage error={error.errorText as string}/> : <div className="py-4"/>} 
                </div>
                <div className="mt-4">
                <PkwLoadingVolumeCreation
                currentValue={currentVolume}
                setCurrentValue={(value) => setCurrentVolume(value)} 
                />
                {error?.errorField === "volume" ? <RenderErrorMessage error={error.errorText as string}/> : <div className="py-4"/>}

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
                        disabled={error !== undefined}
                    >
                        Fortfahren <ArrowRightCircleIcon className="text-gray-200 w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
        </>

    );
}

export default LkwSection3;