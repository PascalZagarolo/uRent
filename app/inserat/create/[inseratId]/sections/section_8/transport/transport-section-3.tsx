'use client'

import { inserat,  transportAttribute } from "@/db/schema";

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

import LkwSizeCreation from "../lkw/lkw-loading-size";
import { previousPage, switchSectionOverview } from "@/hooks/inserat-creation/useRouterHistory";
import SaveChangesDialog from "../../_components/save-changes-dialog";
import SaveChangesPrevious from "../../_components/save-changes-previous";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import RenderContinue from "../../_components/render-continue";








interface TransportSection3Props {
    transportAttribute: typeof transportAttribute.$inferSelect;
    currentSection: number;
    changeSection: (value: number) => void;
}

const TransportSection3 = ({ transportAttribute, currentSection, changeSection }: TransportSection3Props) => {



    const [currentPower, setCurrentPower] = useState<string | number>(transportAttribute?.power ? transportAttribute?.power : undefined);
    const [currentInitial, setCurrentInitial] = useState<string | number>(transportAttribute?.initial ? transportAttribute?.initial.getFullYear() : null);
    const [currentVolume, setCurrentVolume] = useState<string | number>(transportAttribute?.loading_volume ? transportAttribute?.loading_volume : undefined);

    const [currentLength, setCurrentLength] = useState<string | number>(transportAttribute?.loading_l ? transportAttribute?.loading_l : undefined);
    const [currentWidth, setCurrentWidth] = useState<string | number>(transportAttribute?.loading_b ? transportAttribute?.loading_b : undefined);
    const [currentHeight, setCurrentHeight] = useState<string | number>(transportAttribute?.loading_h ? transportAttribute?.loading_h : undefined);

    const [isLoading, setIsLoading] = useState(false);

    const [showDialog, setShowDialog] = useState(false);
    const [showDialogPrevious, setShowDialogPrevious] = useState(false);



    const router = useRouter();

    const inseratId = useParams()?.inseratId;


    

    const onSave = async (redirect?: boolean, previous?: boolean) => {
        try {
            setIsLoading(true);
            
            if(hasChanged) {
                const values = {
                    power: currentPower ? currentPower : null,
                    initial: currentInitial ? currentInitial : null,
                    loading_volume: currentVolume ? currentVolume : null,
                    loading_l: currentLength ? currentLength : null,
                    loading_b: currentWidth ? currentWidth : null,
                    loading_h: currentHeight ? currentHeight : null
                }
                await axios.patch(`/api/inserat/${inseratId}/transport`, values);
                router.refresh();
            }
            if (redirect) {
                router.push(`/inserat/create/${inseratId}`);
                router.refresh();
            } else if (previous) {
                
                const params = new URLSearchParams("")
                params.set('sectionId', String(7))
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

    const hasChanged = (
        (String(currentPower ?? "").trim() != String(transportAttribute?.power ?? "").trim()) ||
        (currentInitial ? new Date(currentInitial).getFullYear() : null) != (transportAttribute?.initial ? new Date(transportAttribute.initial).getFullYear() : null) ||
        (String(currentVolume ?? "").trim() != String(transportAttribute?.loading_volume ?? "").trim()) ||
        (String(currentLength ?? "").trim() != String(transportAttribute?.loading_l ?? "").trim()) ||
        (String(currentWidth ?? "").trim() != String(transportAttribute?.loading_b ?? "").trim()) ||
        (String(currentHeight ?? "").trim() != String(transportAttribute?.loading_h ?? "").trim())
    );



    return (
        <>
            <div className="h-full flex flex-col">
                <h3 className="text-lg font-semibold">
                    Transport - Eigenschaften (3/3)
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
                <div className="mt-8">
                    <PkwLoadingVolumeCreation
                        currentValue={currentVolume}
                        setCurrentValue={(value) => setCurrentVolume(value)}
                    />
                    
                </div>
                <div className="mt-8 mb-4">
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
            <div className="flex flex-row items-center">
                    <span className="text-xs text-gray-200/60 flex flex-row items-center hover:underline cursor-pointer" onClick={() => switchSectionOverview(hasChanged, (show) => setShowDialog(show))}>
                        <ArrowLeft className="w-4 h-4 mr-2" /> Zu deiner Inseratsübersicht
                    </span>
                    <span className="text-xs text-gray-200/60 flex flex-row items-center hover:underline cursor-pointer ml-auto" onClick={() => previousPage(hasChanged, (show) => setShowDialogPrevious(show), 12)}>
                    Zum Ende springen <MdOutlineKeyboardDoubleArrowRight className="w-4 h-4 mr-2" />
                    </span>
                </div>
                <div className="grid grid-cols-2 mt-2">
                    <Button className="" variant="ghost" onClick={() => previousPage(hasChanged, (show) => setShowDialogPrevious(show), 8)}>
                        Zurück
                    </Button>
                    <RenderContinue isLoading={isLoading} disabled={isLoading} onClick={() => onSave()} hasChanged={hasChanged} />
                </div>
            </div>

            {showDialog && <SaveChangesDialog  open={showDialog} onChange={setShowDialog} onSave={onSave}/>}
            {showDialogPrevious && <SaveChangesPrevious open={showDialogPrevious} onChange={setShowDialogPrevious} onSave={onSave} currentIndex={8}/>}
        </>

    );
}

export default TransportSection3;