'use client'

import { inserat, lkwAttribute, pkwAttribute } from "@/db/schema";

import { useState } from "react";


import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRightCircleIcon } from "lucide-react";
import toast from "react-hot-toast";

import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import SeatsCreation from "../pkw/pkw-seats";
import LkwWeightClassCreation from "./lkw-weight-class";
import LkwAxisCreation from "./lkw-axis";
import LkwBrandCreation from "./lkw-brand";
import { previousPage, switchSectionOverview } from "@/hooks/inserat-creation/useRouterHistory";
import SaveChangesDialog from "../../_components/save-changes-dialog";
import SaveChangesPrevious from "../../_components/save-changes-previous";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import RenderContinue from "../../_components/render-continue";








interface LkwSectionProps {
    lkwAttribute: typeof lkwAttribute.$inferSelect;
    currentSection: number;
    changeSection: (value: number) => void;
}

const LkwSection = ({ lkwAttribute, currentSection, changeSection }: LkwSectionProps) => {



    const [currentWeight, setCurrentWeight] = useState(lkwAttribute?.weightClass ? lkwAttribute?.weightClass : null);
    const [currentAxis, setCurrentAxis] = useState(lkwAttribute?.axis ? lkwAttribute?.axis : null);
    const [currentBrand, setCurrentBrand] = useState(lkwAttribute?.lkwBrand ? lkwAttribute?.lkwBrand : null);
    const [currentSeats, setCurrentSeats] = useState(lkwAttribute?.seats ? lkwAttribute?.seats : null);
    
    const [isLoading, setIsLoading] = useState(false);
    
    const [showDialog, setShowDialog] = useState(false);
    const [showDialogPrevious, setShowDialogPrevious] = useState(false);

    const inseratId = useParams()?.inseratId;
    const router = useRouter();


    const onSave = async (redirect?: boolean, previous?: boolean) => {
        try {
            setIsLoading(true);
            if(hasChanged) {
                const values = {
                    weightClass: currentWeight,
                    axis: currentAxis,
                    brand: currentBrand,
                    seats: currentSeats
                }
                await axios.patch(`/api/inserat/${inseratId}/trailer`, values);
                router.refresh();
            }
            if (redirect) {
                router.push(`/inserat/create/${inseratId}`);
                router.refresh();
            } else if (previous) {
                
                const params = new URLSearchParams("")
                params.set('sectionId', String(4))
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




    const onPrevious = () => {
        changeSection(currentSection - 1);
    }



    const hasChanged = (currentWeight != lkwAttribute?.weightClass 
        || currentAxis != lkwAttribute?.axis 
        || currentBrand != lkwAttribute?.lkwBrand 
        || currentSeats != lkwAttribute?.seats);

    return (

        <>
            <div className="h-full flex flex-col">
                <h3 className="text-lg font-semibold">
                    LKW - Eigenschaften (1/3)
                    <p className="text-xs text-gray-200/60 font-medium text-left">
                        Hier kannst du weitere Kategorie abhängige Attribute deines Fahrzeuges angeben. <br />
                        Diese Informationen helfen potentiellen Käufern, schneller das passende Fahrzeug zu finden.
                    </p>
                </h3>
                <div className="mt-4">
                    <LkwWeightClassCreation currentValue={currentWeight} setCurrentValue={setCurrentWeight} />
                </div>
                <div className="mt-4">
                    <LkwAxisCreation currentValue={currentAxis as any} setCurrentValue={setCurrentAxis} />
                </div>
                <div className="mt-4">
                    <LkwBrandCreation currentValue={currentBrand as any} setCurrentValue={setCurrentBrand} />
                </div>
                <div className="mt-4">
                    <SeatsCreation currentValue={currentSeats as any} setCurrentValue={setCurrentSeats} />
                </div>

            </div>
            <div className=" flex flex-col mt-auto ">
            <div className="flex flex-row items-center">
                    <span className="text-xs text-gray-200/60 flex flex-row items-center hover:underline cursor-pointer" onClick={() => switchSectionOverview(hasChanged, (show) => setShowDialog(show))}>
                        <ArrowLeft className="w-4 h-4 mr-2" /> Zu deiner Inseratsübersicht
                    </span>
                    <span className="text-xs text-gray-200/60 flex flex-row items-center hover:underline cursor-pointer ml-auto" onClick={() => previousPage(hasChanged, (show) => setShowDialogPrevious(show), 12)}>
                        Zur Ende springen <MdOutlineKeyboardDoubleArrowRight className="w-4 h-4 mr-2" />
                    </span>
                </div>
                <div className="grid grid-cols-2 mt-2">
                    <Button className="" variant="ghost" onClick={() => previousPage(hasChanged, (show) => setShowDialogPrevious(show), 5)
}>
                        Zurück
                    </Button>
                    <RenderContinue isLoading={isLoading} disabled={isLoading} onClick={() => onSave()} hasChanged={hasChanged} />
                </div>
            </div>


            {showDialog && <SaveChangesDialog open={showDialog} onChange={setShowDialog} onSave={onSave} />}
            {showDialogPrevious && <SaveChangesPrevious open={showDialogPrevious} onChange={setShowDialogPrevious} onSave={onSave} currentIndex={5}/>}
        </>

    );
}

export default LkwSection;