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
import { previousPage, switchSectionOverview } from "@/hooks/inserat-creation/useRouterHistory";
import SaveChangesDialog from "../../_components/save-changes-dialog";
import SaveChangesPrevious from "../../_components/save-changes-previous";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import RenderContinue from "../../_components/render-continue";








interface TrailerSectionProps {
    trailerAttribute: typeof trailerAttribute.$inferSelect;
    currentSection: number;
    changeSection: (value: number) => void;
}

const TrailerSection = ({ trailerAttribute, currentSection, changeSection }: TrailerSectionProps) => {



    const [currentType, setCurrentType] = useState(trailerAttribute?.type ? trailerAttribute?.type : null);
    
    const [currentAxis, setCurrentAxis] = useState(trailerAttribute?.axis ? trailerAttribute?.axis : null);
    const [currentBrake, setCurrentBrake] = useState(trailerAttribute?.brake ? trailerAttribute?.brake : undefined);

    const [isLoading, setIsLoading] = useState(false)

    const [showDialog, setShowDialog] = useState(false);
    const [showDialogPrevious, setShowDialogPrevious] = useState(false);

    const inseratId = useParams()?.inseratId;

    const router = useRouter();

    const onSave = async (redirect? : boolean, previous?: boolean) => {
        try {
            setIsLoading(true);
           if(hasChanged) {
            const values = {
                type: currentType,
                
                axis: currentAxis,
                brake: currentBrake
            }
            await axios.patch(`/api/inserat/${inseratId}/trailer`, values);
            router.refresh();
           }
            if(redirect) {
                router.push(`/inserat/create/${inseratId}`);
                router.refresh();
              } else if (previous) {
                
                const params = new URLSearchParams("")
                params.set('sectionId', String(5))
                window.history.pushState(null, '', `?${params.toString()}`)
            } else {
                changeSection(currentSection + 1);
              }
        } catch (e: any) {
            console.log(e);
            toast.error("Fehler beim Speichern der Änderungen");
        } finally {
            setIsLoading(false);
        }
    };




    

    const hasChanged = (
        currentType != trailerAttribute?.type ||

        currentAxis != trailerAttribute?.axis ||
       Boolean(currentBrake) != Boolean(trailerAttribute?.brake)
    );



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
                    <LkwAxisCreation currentValue={currentAxis} setCurrentValue={setCurrentAxis} isTrailer={true}/>
                </div>
                <div className="mt-4">
                    <TrailerBrakeCreation currentValue={currentBrake as any} setCurrentValue={setCurrentBrake} />
                </div>

            </div>
            <div className=" flex flex-col mt-auto ">
            <div className="flex flex-row items-center">
                    <span className="text-xs text-gray-200/60 flex flex-row items-center hover:underline cursor-pointer" onClick={() => switchSectionOverview(hasChanged, (show) => setShowDialog(show))}>
                        <ArrowLeft className="w-4 h-4 mr-2" /> Zu deiner Inseratsübersicht
                    </span>
                    <span className="text-xs text-gray-200/60 flex flex-row items-center hover:underline cursor-pointer ml-auto" 
                    onClick={() => previousPage(hasChanged, (show) => setShowDialogPrevious(show), 13)}>
                    Zum Ende springen <MdOutlineKeyboardDoubleArrowRight className="w-4 h-4 mr-2" />
                    </span>
                </div>
                <div className="grid grid-cols-2 mt-2">
                    <Button className="" variant="ghost" onClick={() => previousPage(hasChanged, (show) => setShowDialogPrevious(show), 6)}>
                        Zurück
                    </Button>
                    <RenderContinue isLoading={isLoading} disabled={isLoading} onClick={() => onSave()} hasChanged={hasChanged} />
                </div>
            </div>

            {showDialog && <SaveChangesDialog  open={showDialog} onChange={setShowDialog} onSave={onSave}/>}
            {showDialogPrevious && <SaveChangesPrevious open={showDialogPrevious} onChange={setShowDialogPrevious} onSave={onSave} currentIndex={6}/>}
        </>

    );
}

export default TrailerSection;