'use client'

import { inserat, pkwAttribute } from "@/db/schema";

import { useEffect, useState } from "react";


import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRightCircleIcon } from "lucide-react";
import toast from "react-hot-toast";

import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import PowerFormCreation from "./pkw-power";
import InitialFormCreationn from "./pkw-initial";
import InitialFormCreation from "./pkw-initial";
import PkwLoadingVolumeCreation from "./pkw-loading-volume";
import { RenderErrorMessage } from "../../_components/render-messages";
import { previousPage, switchSectionOverview } from "@/hooks/inserat-creation/useRouterHistory";
import SaveChangesDialog from "../../_components/save-changes-dialog";
import SaveChangesPrevious from "../../_components/save-changes-previous";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";







interface PkwSection3Props {
    pkwAttribute: typeof pkwAttribute.$inferSelect;
    currentSection: number;
    changeSection: (value: number) => void;
}

const PkwSection3 = ({ pkwAttribute, currentSection, changeSection }: PkwSection3Props) => {



    const [currentPower, setCurrentPower] = useState<string>(pkwAttribute?.power ? String(pkwAttribute?.power) : "");
    const [currentInitial, setCurrentInitial] = useState<string | number>(pkwAttribute?.initial ? pkwAttribute?.initial.getFullYear() : undefined);
    const [currentVolume, setCurrentVolume] = useState<string | number>(pkwAttribute?.loading_volume ? pkwAttribute?.loading_volume : undefined);

    const [showDialog, setShowDialog] = useState(false);
    const [showDialogPrevious, setShowDialogPrevious] = useState(false);

    

    const router = useRouter();

    const inseratId = useParams()?.inseratId;


   

    const onSave = async (redirect?: boolean, previous?: boolean) => {
        try {
            if(hasChanged) {
                
                const values = {
                    power: currentPower ? currentPower : null,
                    initial: currentInitial ? currentInitial : null,
                    loading_volume: currentVolume ? currentVolume : null
                }
                await axios.patch(`/api/inserat/${inseratId}/pkw`, values);
                router.refresh();
            }
            if (redirect) {
                router.push(`/inserat/create/${inseratId}`);
                router.refresh();
            } else if (previous) {
                
                const params = new URLSearchParams("")
                params.set('sectionId', String(6))
                window.history.pushState(null, '', `?${params.toString()}`)
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

    const hasChanged = (
        (String(currentPower ?? "").trim() !== String(pkwAttribute?.power ?? "").trim()) ||
        (currentInitial ? new Date(currentInitial).getFullYear() : null) !== (pkwAttribute?.initial ? new Date(pkwAttribute.initial).getFullYear() : null) ||
        (String(currentVolume ?? "").trim() !== String(pkwAttribute?.loading_volume ?? "").trim())
    );
    



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
                        currentValue={currentPower}
                        setCurrentValue={(value) => setCurrentPower(value)}
                    />
                    
                </div>
                <div className="mt-4">
                    <PkwLoadingVolumeCreation
                        currentValue={currentVolume}
                        setCurrentValue={(value) => setCurrentVolume(value)}
                    />
                    

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
                    <Button className="" variant="ghost" onClick={() => previousPage(hasChanged, (show) => setShowDialogPrevious(show), 7)}>
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
            {showDialogPrevious && <SaveChangesPrevious open={showDialogPrevious} onChange={setShowDialogPrevious} onSave={onSave} currentIndex={7}/>}
        </>

    );
}

export default PkwSection3;