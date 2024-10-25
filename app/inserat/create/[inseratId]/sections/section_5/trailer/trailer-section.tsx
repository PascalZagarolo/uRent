'use client'

import {  trailerAttribute } from "@/db/schema";

import { useState } from "react";


import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRightCircleIcon } from "lucide-react";
import toast from "react-hot-toast";

import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import SeatsCreation from "../pkw/pkw-seats";
import TrailerTypeCreation from "./trailer-type";
import TrailerWeightClassCreation from "./trailer-weight-class";
import LkwAxisCreation from "../lkw/lkw-axis";
import TrailerBrakeCreation from "./trailer-brake";
import { switchSectionOverview } from "@/hooks/inserat-creation/useRouterHistory";
import SaveChangesDialog from "../../_components/save-changes-dialog";








interface TrailerSectionProps {
    trailerAttribute: typeof trailerAttribute.$inferSelect;
    currentSection: number;
    changeSection: (value: number) => void;
}

const TrailerSection = ({ trailerAttribute, currentSection, changeSection }: TrailerSectionProps) => {



    const [currentType, setCurrentType] = useState(trailerAttribute?.type ? trailerAttribute?.type : null);
    const [currentWeight, setCurrentWeight] = useState(trailerAttribute?.weightClass ? trailerAttribute?.weightClass : null);
    const [currentAxis, setCurrentAxis] = useState(trailerAttribute?.axis ? trailerAttribute?.axis : null);
    const [currentBrake, setCurrentBrake] = useState(trailerAttribute?.brake ? trailerAttribute?.brake : undefined);
    const [showDialog, setShowDialog] = useState(false);

    const inseratId = useParams()?.inseratId;

    const router = useRouter();

    const onSave = async (redirect? : boolean) => {
        try {
            const values = {
                type: currentType,
                weightClass: currentWeight,
                axis: currentAxis,
                brake: currentBrake
            }
            await axios.patch(`/api/inserat/${inseratId}/trailer`, values);
            if(redirect) {
                router.push(`/inserat/create/${inseratId}`);
                router.refresh();
              } else {
                changeSection(currentSection + 1);
              }
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
                    Anhänger - Eigenschaften (1/3)
                    <p className="text-xs text-gray-200/60 font-medium text-left">
                        Hier kannst du weitere Kategorie abhängige Attribute deines Fahrzeuges angeben. <br />
                        Diese Informationen helfen potentiellen Käufern, schneller das passende Fahrzeug zu finden.
                    </p>
                </h3>
                <div className="mt-4">
                   <TrailerTypeCreation currentValue={currentType} setCurrentValue={setCurrentType} />
                </div>
                <div className="mt-4">
                  <TrailerWeightClassCreation currentValue={currentWeight} setCurrentValue={setCurrentWeight} />
                </div>
                <div className="mt-4">
                    <LkwAxisCreation currentValue={currentAxis} setCurrentValue={setCurrentAxis} />
                </div>
                <div className="mt-4">
                    <TrailerBrakeCreation currentValue={currentBrake as any} setCurrentValue={setCurrentBrake} />
                </div>

            </div>
            <div className=" flex flex-col mt-auto ">
                <span className="text-xs text-gray-200/60 flex flex-row items-center hover:underline cursor-pointer mt-2" onClick={() => switchSectionOverview(hasChanged, (show) => setShowDialog(show))}
>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Zu deiner Inseratsübersicht
                </span>
                <div className="grid grid-cols-2 mt-2">
                    <Button className="" variant="ghost" onClick={onPrevious}>
                        Zurück
                    </Button>
                    <Button className="bg-indigo-800 text-gray-200 w-full  hover:bg-indigo-900 hover:text-gray-300"
                        onClick={() => onSave()}
                    >
                        Speichern & Fortfahren <ArrowRightCircleIcon className="text-gray-200 w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>

            {showDialog && <SaveChangesDialog  open={showDialog} onChange={setShowDialog} onSave={onSave}/>}
        </>

    );
}

export default TrailerSection;