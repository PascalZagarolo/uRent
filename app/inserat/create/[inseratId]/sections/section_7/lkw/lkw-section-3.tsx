'use client'

import { inserat, pkwAttribute } from "@/db/schema";

import { useEffect, useState } from "react";


import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRightCircleIcon } from "lucide-react";
import toast from "react-hot-toast";

import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { RenderErrorMessage } from "../../_components/render-messages";
import PkwLoadingVolumeCreation from "../pkw/pkw-loading-volume";
import PowerFormCreation from "../pkw/pkw-power";
import InitialFormCreation from "../pkw/pkw-initial";
import { lkwAttribute } from '../../../../../../../db/schema';
import LkwSizeCreation from "./lkw-loading-size";
import { previousPage, switchSectionOverview } from "@/hooks/inserat-creation/useRouterHistory";
import SaveChangesDialog from "../../_components/save-changes-dialog";
import SaveChangesPrevious from "../../_components/save-changes-previous";







interface LkwSection3Props {
    lkwAttribute: typeof lkwAttribute.$inferSelect;
    currentSection: number;
    changeSection: (value: number) => void;
}

const LkwSection3 = ({ lkwAttribute, currentSection, changeSection }: LkwSection3Props) => {



    const [currentPower, setCurrentPower] = useState<string | number>(lkwAttribute?.power ? lkwAttribute?.power : undefined);
    const [currentInitial, setCurrentInitial] = useState<string | number>(lkwAttribute?.initial ? lkwAttribute?.initial.getFullYear() : null);
    const [currentVolume, setCurrentVolume] = useState<string | number>(lkwAttribute?.loading_volume ? lkwAttribute?.loading_volume : undefined);

    const [currentLength, setCurrentLength] = useState<string | number>(lkwAttribute?.loading_l ? lkwAttribute?.loading_l : undefined);
    const [currentWidth, setCurrentWidth] = useState<string | number>(lkwAttribute?.loading_b ? lkwAttribute?.loading_b : undefined);
    const [currentHeight, setCurrentHeight] = useState<string | number>(lkwAttribute?.loading_h ? lkwAttribute?.loading_h : undefined);

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
                    loading_volume: currentVolume ? currentVolume : null,
                    loading_l: currentLength ? currentLength : null,
                    loading_b: currentWidth ? currentWidth : null,
                    loading_h: currentHeight ? currentHeight : null
                }

                await axios.patch(`/api/inserat/${inseratId}/lkw`, values);
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
        (String(currentPower ?? "").trim() != String(lkwAttribute?.power ?? "").trim()) ||
        (currentInitial ? new Date(currentInitial).getFullYear() : null) != (pkwAttribute?.initial ? new Date(lkwAttribute.initial).getFullYear() : null) ||
        (String(currentVolume ?? "").trim() != String(lkwAttribute?.loading_volume ?? "").trim()) ||
        (String(currentLength ?? "").trim() != String(lkwAttribute?.loading_l ?? "").trim()) ||
        (String(currentWidth ?? "").trim() != String(lkwAttribute?.loading_b ?? "").trim()) ||
        (String(currentHeight ?? "").trim() != String(lkwAttribute?.loading_h ?? "").trim())
    );



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
                    
                </div>
                <div className="mt-4">
                    <PkwLoadingVolumeCreation
                        currentValue={currentVolume}
                        setCurrentValue={(value) => setCurrentVolume(value)}
                    />
                  

                </div>
                <div>
                    <LkwSizeCreation
                        currentHeight={currentHeight}
                        currentLength={currentLength}
                        currentWidth={currentWidth}
                        setCurrentHeight={(value) => setCurrentHeight(value)}
                        setCurrentLength={(value) => setCurrentLength(value)}
                        setCurrentWidth={(value) => setCurrentWidth(value)}
                    />
                </div>
               
            </div>
            <div className=" flex flex-col mt-auto ">
                <span className="text-xs text-gray-200/60 flex flex-row items-center hover:underline cursor-pointer mt-2" onClick={() => switchSectionOverview(hasChanged, (show) => setShowDialog(show))}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Zu deiner Inseratsübersicht
                </span>
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

            {showDialog && <SaveChangesDialog open={showDialog} onChange={setShowDialog} onSave={onSave} />}
            {showDialogPrevious && <SaveChangesPrevious open={showDialogPrevious} onChange={setShowDialogPrevious} onSave={onSave} currentIndex={7}/>}
        </>

    );
}

export default LkwSection3;