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







interface PkwSection3Props {
    pkwAttribute: typeof pkwAttribute.$inferSelect;
    currentSection: number;
    changeSection: (value: number) => void;
}

const PkwSection3 = ({ pkwAttribute, currentSection, changeSection }: PkwSection3Props) => {



    const [currentPower, setCurrentPower] = useState<string | number>(pkwAttribute?.power ? pkwAttribute?.power : undefined);
    const [currentInitial, setCurrentInitial] = useState<string | number>(pkwAttribute?.initial ? pkwAttribute?.initial.getFullYear() : undefined);
    const [currentVolume, setCurrentVolume] = useState<string | number>(pkwAttribute?.loading_volume ? pkwAttribute?.loading_volume : undefined);

    const [showDialog, setShowDialog] = useState(false);
    const [showDialogPrevious, setShowDialogPrevious] = useState(false);

    const [error, setError] = useState<{ errorField: string; errorText: string } | null>(null);

    const router = useRouter();

    const inseratId = useParams()?.inseratId;


    useEffect(() => {

        const parsedVolume = parseFloat(currentVolume as string);
        const parsedPower = parseFloat(currentPower as string);

        if ((currentPower !== undefined && currentPower != "") && (isNaN(parsedPower) || parsedPower <= 0)) {
            setError({ errorField: "power", errorText: "Bitte gib eine gültige Fahrzeugleistung an" });
        } else if (currentInitial !== undefined && Number.isNaN(currentInitial)) {
            setError({ errorField: "initial", errorText: "Bitte gib ein gültiges Baujahr an" });
        } else if ((currentVolume !== undefined && currentVolume != "") && (isNaN(parsedVolume) || parsedVolume <= 0)) {
            setError({ errorField: "volume", errorText: "Bitte gib ein gültiges Ladevolumen an" });
        } else {
            setError(undefined);
        }

    }, [currentPower, currentInitial, currentVolume]);

    const onSave = async (redirect?: boolean, previous?: boolean) => {
        try {

            if (currentPower !== undefined && Number.isNaN(currentPower)) {
                toast.error("Bitte gib eine gültige Fahrzeugleistung an");
                return;
            }

            const values = {
                power: currentPower ? currentPower : null,
                initial: currentInitial ? currentInitial : null,
                loading_volume: currentVolume ? currentVolume : null
            }
            await axios.patch(`/api/inserat/${inseratId}/pkw`, values);
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
                    {error?.errorField === "power" ? <RenderErrorMessage error={error.errorText as string} /> : <div className="py-4" />}
                </div>
                <div className="mt-4">
                    <PkwLoadingVolumeCreation
                        currentValue={currentVolume}
                        setCurrentValue={(value) => setCurrentVolume(value)}
                    />
                    {error?.errorField === "volume" ? <RenderErrorMessage error={error.errorText as string} /> : <div className="py-4" />}

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

export default PkwSection3;