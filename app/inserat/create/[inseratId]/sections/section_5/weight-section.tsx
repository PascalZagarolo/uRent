'use client'

import { inserat, pkwAttribute } from "@/db/schema";

import { useEffect, useState } from "react";


import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRightCircleIcon } from "lucide-react";
import toast from "react-hot-toast";

import { useParams, useRouter } from "next/navigation";

import { previousPage, switchSectionOverview } from "@/hooks/inserat-creation/useRouterHistory";

import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import RenderContinue from "../_components/render-continue";
import SaveChangesDialog from "../_components/save-changes-dialog";
import SaveChangesPrevious from "../_components/save-changes-previous";
import Payload from "./payload";
import WeightClass from "./weightClass";
import axios from "axios";









interface WeightSectionProps {
    thisInserat: typeof inserat.$inferSelect;
    currentSection: number;
    changeSection: (value: number) => void;
}

const WeightSection = ({ thisInserat, currentSection, changeSection }: WeightSectionProps) => {







    const [isLoading, setIsLoading] = useState(false);

    const [showDialog, setShowDialog] = useState(false);
    const [showDialogPrevious, setShowDialogPrevious] = useState(false);

    const router = useRouter();

    const inseratId = useParams()?.inseratId;



    let startingPayload;
    let startingWeight;



    useEffect(() => {
        if (!thisInserat?.category) return; // Early return if category is undefined

        let initialPayload;
        let initialWeight;

        switch (thisInserat.category) {
            case "LKW":
                initialPayload = thisInserat.lkwAttribute?.payload;
                initialWeight = thisInserat.lkwAttribute?.weightClass;
                break;
            case "TRAILER":
                initialPayload = thisInserat.trailerAttribute?.payload;
                initialWeight = thisInserat.trailerAttribute?.weightClass;
                break;
            case "TRANSPORT":
                initialPayload = thisInserat.transportAttribute?.payload;
                initialWeight = thisInserat.transportAttribute?.weightClass;
                break;
            default:
                return; // Handle unexpected categories if needed
        }
        setInitialPayload(initialPayload);
        setInitialWeight(initialWeight);
        setCurrentPayload(initialPayload);
        setCurrentWeight(initialWeight);
    }, []);




    const [currentPayload, setCurrentPayload] = useState(startingPayload);
    const [initialPayload, setInitialPayload] = useState(startingPayload);
    const [currentWeight, setCurrentWeight] = useState(startingWeight);
    const [initialWeight, setInitialWeight] = useState(startingWeight);

    const onSave = async (redirect?: boolean, previous?: boolean) => {
        try {
            setIsLoading(true);
            if (hasChanged) {
                const values = {
                    weightClass: currentWeight ? Number(currentWeight) : null,
                    payload: currentPayload ? Number(currentPayload) : null,
                }

                await axios.patch(`/api/inserat/${thisInserat?.id}/${thisInserat?.category?.toLowerCase()}`, values);
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



    const hasChanged = (
        Number(initialPayload ?? 0) !== Number(currentPayload ?? 0) ||
        Number(initialWeight ?? 0) !== Number(currentWeight ?? 0)
    );



    return (
        <>
            <div className="h-full flex flex-col">
                <h3 className="text-lg font-semibold">
                    Gewichtsdaten
                    <p className="text-xs text-gray-200/60 font-medium text-left">
                        Hier kannst du Gewichtsdaten zu deinem Fahrzeug angeben. <br />
                        Diese Informationen helfen potentiellen Käufern, schneller das passende Fahrzeug zu finden.
                    </p>
                </h3>
                <div className="mt-4 flex flex-row items-center w-full space-x-4">


                    <div className="mt-4 w-1/2">
                        <WeightClass currentValue={currentWeight} setCurrentValue={setCurrentWeight} />
                    </div>
                    <div className="mt-4 w-1/2">
                        <Payload currentValue={currentPayload} setCurrentValue={setCurrentPayload} />
                    </div>

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
                    <Button className="" variant="ghost" onClick={() => previousPage(hasChanged, (show) => setShowDialogPrevious(show), 5)}>
                        Zurück
                    </Button>
                    <RenderContinue isLoading={isLoading} disabled={isLoading} onClick={() => onSave()} hasChanged={hasChanged} />
                </div>
            </div>

            {showDialog && <SaveChangesDialog open={showDialog} onChange={setShowDialog} onSave={onSave} />}
            {showDialogPrevious && <SaveChangesPrevious open={showDialogPrevious} onChange={setShowDialogPrevious} onSave={onSave} currentIndex={5} />}
        </>

    );
}

export default WeightSection;