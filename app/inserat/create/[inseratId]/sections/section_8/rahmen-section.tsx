'use client'

import { inserat } from "@/db/schema";

import { useEffect, useState } from "react";


import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRightCircleIcon } from "lucide-react";
import toast from "react-hot-toast";

import SelectCautionCreation from "./caution";
import SelectLicenseCreation from "./license";
import RequiredAgeCreation from "./reqAge";
import axios from "axios";
import { RenderErrorMessage } from "../_components/render-messages";
import { previousPage, switchSectionOverview } from "@/hooks/inserat-creation/useRouterHistory";
import { useRouter } from "next/navigation";
import SaveChangesDialog from "../_components/save-changes-dialog";
import SaveChangesPrevious from "../_components/save-changes-previous";


interface RahmenSectionProps {
    thisInserat: typeof inserat.$inferSelect;
    currentSection: number;
    changeSection: (value: number) => void;
}

const RahmenSection = ({ thisInserat, currentSection, changeSection }: RahmenSectionProps) => {





    const [currentCaution, setCurrentCaution] = useState(thisInserat?.caution ? thisInserat?.caution : undefined);
    const [currentReqAge, setCurrentReqAge] = useState(thisInserat?.reqAge);
    const [currentLicense, setCurrentLicense] = useState(thisInserat?.license);

    const [showDialog, setShowDialog] = useState(false);
    const [showDialogPrevious, setShowDialogPrevious] = useState(false);

    const router = useRouter();

    const onSave = async (redirect?: boolean, previous?: boolean) => {
        try {

            const values = {
                caution: currentCaution,
                reqAge: currentReqAge,
                license: currentLicense
            }
            await axios.patch(`/api/inserat/${thisInserat.id}`, values);
            if (redirect) {
                router.push(`/inserat/create/${thisInserat.id}`);
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
        }
    }

    const onPrevious = () => {
        changeSection(currentSection - 1);
    }

    const [error, setError] = useState<{ errorField: string; errorText: string } | null>(undefined);

    const hasChanged = false;


    useEffect(() => {
        // Check if the value contains any non-numeric characters
        const cautionRegex = /^[0-9]+(\.[0-9]{2})?$/ // This allows only numbers and optionally one dot for decimals
        const parsedCaution = parseFloat(currentCaution as string);

        if (currentCaution !== undefined && currentCaution !== "") {
            // If it doesn't match the regex or is not a positive number
            if (!cautionRegex.test(currentCaution) || isNaN(parsedCaution) || parsedCaution <= 0) {
                setError({ errorField: "caution", errorText: "Bitte gebe eine gültige Kaution an." });
            } else {
                setError(undefined);
            }
        }
    }, [currentCaution]);



    return (
        <>
            <div className="flex flex-col h-full">
                <h3 className="text-lg font-semibold">
                    Rahmenbedingungen
                    <p className="text-xs text-gray-200/60 font-medium text-left">
                        Gebe die Rahmenbedingungen für dein Inserat an, wie bspw. die Mindestmietdauer oder die maximale Anzahl an Kilometern.
                    </p>
                </h3>
                <div className="mt-4">
                    <SelectCautionCreation currentValue={currentCaution} setCurrentValue={setCurrentCaution} />
                    {error?.errorField === "caution" && <RenderErrorMessage error={error.errorText as string} />}
                </div>
                <div className="mt-4">
                    <RequiredAgeCreation currentValue={currentReqAge as any} setCurrentValue={setCurrentReqAge} />
                </div>
                <div className="mt-4">
                    <SelectLicenseCreation currentValue={currentLicense} setCurrentValue={setCurrentLicense} category={thisInserat?.category} />
                </div>


            </div>
            <div className="mt-auto flex flex-col">
                <span className="text-xs text-gray-200/60 flex flex-row items-center hover:underline cursor-pointer" onClick={() => switchSectionOverview(hasChanged, (show) => setShowDialog(show))}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Zu deiner Inseratsübersicht
                </span>
                <div className="grid grid-cols-2 mt-2">
                    <Button className="" variant="ghost" onClick={() => previousPage(hasChanged, (show) => setShowDialogPrevious(show), 8)}>
                        Zurück
                    </Button>
                    <Button className="bg-indigo-800 text-gray-200 w-full  hover:bg-indigo-900 hover:text-gray-300"
                        onClick={() => onSave()}
                        disabled={error != undefined}
                    >
                        Speichern & Fortfahren <ArrowRightCircleIcon className="text-gray-200 w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
            {showDialog && <SaveChangesDialog  open={showDialog} onChange={setShowDialog} onSave={onSave}/>}
            {showDialogPrevious && <SaveChangesPrevious open={showDialogPrevious} onChange={setShowDialogPrevious} onSave={onSave} currentIndex={8}/>}
        </>
    );
}

export default RahmenSection;