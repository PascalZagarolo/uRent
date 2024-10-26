'use client'

import { inserat, pkwAttribute, trailerAttribute } from "@/db/schema";

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
import LkwSizeCreation from "../lkw/lkw-loading-size";
import { previousPage, switchSectionOverview } from "@/hooks/inserat-creation/useRouterHistory";
import SaveChangesDialog from "../../_components/save-changes-dialog";
import SaveChangesPrevious from "../../_components/save-changes-previous";








interface TrailerSection3Props {
    trailerAttribute: typeof trailerAttribute.$inferSelect;
    currentSection: number;
    changeSection: (value: number) => void;
}

const TrailerSection3 = ({ trailerAttribute, currentSection, changeSection }: TrailerSection3Props) => {




    const [currentInitial, setCurrentInitial] = useState<string | number>(trailerAttribute?.initial ? trailerAttribute?.initial.getFullYear() : null);
    const [currentVolume, setCurrentVolume] = useState<string | number>(trailerAttribute?.loading_volume ? trailerAttribute?.loading_volume : undefined);

    const [currentLength, setCurrentLength] = useState<string | number>(trailerAttribute?.loading_l ? trailerAttribute?.loading_l : undefined);
    const [currentWidth, setCurrentWidth] = useState<string | number>(trailerAttribute?.loading_b ? trailerAttribute?.loading_b : undefined);
    const [currentHeight, setCurrentHeight] = useState<string | number>(trailerAttribute?.loading_h ? trailerAttribute?.loading_h : undefined);

    const [showDialog, setShowDialog] = useState(false);
    const [showDialogPrevious, setShowDialogPrevious] = useState(false);

    const [error, setError] = useState<{ errorField: string; errorText: string } | null>(null);

    const router = useRouter();

    const inseratId = useParams()?.inseratId;


    useEffect(() => {

        const parsedVolume = parseFloat(currentVolume as string);


        if (currentInitial !== undefined && Number.isNaN(currentInitial)) {
            setError({ errorField: "initial", errorText: "Bitte gib ein gültiges Baujahr an" });
        } else if ((currentVolume !== undefined && currentVolume != "") && (isNaN(parsedVolume) || parsedVolume <= 0)) {
            setError({ errorField: "volume", errorText: "Bitte gib ein gültiges Ladevolumen an" });
        } else if (
            (currentLength !== undefined && currentLength != "") && (isNaN(parseFloat(currentLength as string)) || parseFloat(currentLength as string) <= 0) ||
            (currentWidth !== undefined && currentWidth != "") && (isNaN(parseFloat(currentWidth as string)) || parseFloat(currentWidth as string) <= 0) ||
            (currentHeight !== undefined && currentHeight != "") && (isNaN(parseFloat(currentHeight as string)) || parseFloat(currentHeight as string) <= 0)
        ) {

            setError({ errorField: "size", errorText: "Bitte gebe eine gültige Lademaße ein" });
        }
        else {
            setError(undefined);
        }

    }, [currentInitial, currentVolume, currentLength, currentWidth, currentHeight]);
    const onSave = async (redirect?: boolean, previous?: boolean) => {
        try {


            const values = {

                initial: currentInitial ? currentInitial : null,
                loading_volume: currentVolume ? currentVolume : null,
                loading_l: currentLength ? currentLength : null,
                loading_b: currentWidth ? currentWidth : null,
                loading_h: currentHeight ? currentHeight : null
            }
            await axios.patch(`/api/inserat/${inseratId}/trailer`, values);
            router.refresh();
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

    const hasChanged = true;



    return (
        <>
            <div className="h-full flex flex-col">
                <h3 className="text-lg font-semibold">
                    Anhänger - Eigenschaften (3/3)
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
                    <PkwLoadingVolumeCreation
                        currentValue={currentVolume}
                        setCurrentValue={(value) => setCurrentVolume(value)}
                    />
                    {error?.errorField === "volume" ? <RenderErrorMessage error={error.errorText as string} /> : <div className="py-4" />}

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
                {error?.errorField === "size" ? <RenderErrorMessage error={error.errorText as string} /> : <div className="py-4" />}
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
                        disabled={error !== undefined}
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

export default TrailerSection3;