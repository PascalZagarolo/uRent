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
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import RenderContinue from "../_components/render-continue";


interface RahmenSectionProps {
    thisInserat: typeof inserat.$inferSelect;
    currentSection: number;
    changeSection: (value: number) => void;
}

const RahmenSection = ({ thisInserat, currentSection, changeSection }: RahmenSectionProps) => {





    const [currentCaution, setCurrentCaution] = useState(thisInserat?.caution ? thisInserat?.caution : undefined);
    const [currentReqAge, setCurrentReqAge] = useState(thisInserat?.reqAge);
    const [currentLicense, setCurrentLicense] = useState(thisInserat?.license);

    const [isLoading, setIsLoading] = useState(false);

    const [showDialog, setShowDialog] = useState(false);
    const [showDialogPrevious, setShowDialogPrevious] = useState(false);

    const router = useRouter();

    const onSave = async (redirect?: boolean, previous?: boolean) => {
        try {
            
            setIsLoading(true);

            if(hasChanged) {
                const values = {
                    caution: currentCaution ? currentCaution?.trim() : null,
                    reqAge: currentReqAge ? currentReqAge : null,
                    license: currentLicense ? currentLicense : null,
                }
                await axios.patch(`/api/inserat/${thisInserat.id}`, values);
                router.refresh();
            }
            if (redirect) {
                router.push(`/inserat/create/${thisInserat.id}`);
                router.refresh();
            } else if (previous) {
                
                const params = new URLSearchParams("")
                params.set('sectionId', String(8))
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
    }

    const onPrevious = () => {
        changeSection(currentSection - 1);
    }

    const [error, setError] = useState<{ errorField: string; errorText: string } | null>(undefined);

    const hasChanged = (
        String(currentCaution ?? "").trim() != String(thisInserat?.caution ?? "").trim() ||
        currentReqAge != thisInserat?.reqAge ||
        currentLicense != thisInserat?.license
    );


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
            <div className="flex flex-row items-center">
                    <span className="text-xs text-gray-200/60 flex flex-row items-center hover:underline cursor-pointer" onClick={() => switchSectionOverview(hasChanged, (show) => setShowDialog(show))}>
                        <ArrowLeft className="w-4 h-4 mr-2" /> Zu deiner Inseratsübersicht
                    </span>
                    <span className="text-xs text-gray-200/60 flex flex-row items-center hover:underline cursor-pointer ml-auto" onClick={() => previousPage(hasChanged, (show) => setShowDialogPrevious(show), 12)}>
                    Zum Ende springen <MdOutlineKeyboardDoubleArrowRight className="w-4 h-4 mr-2" />
                    </span>
                </div>
                <div className="grid grid-cols-2 mt-2">
                    <Button className="" variant="ghost" onClick={() => previousPage(hasChanged, (show) => setShowDialogPrevious(show), 9)}>
                        Zurück
                    </Button>
                    <RenderContinue isLoading={isLoading} disabled={isLoading} onClick={() => onSave()} hasChanged={hasChanged} />
                </div>
            </div>
            {showDialog && <SaveChangesDialog  open={showDialog} onChange={setShowDialog} onSave={onSave}/>}
            {showDialogPrevious && <SaveChangesPrevious open={showDialogPrevious} onChange={setShowDialogPrevious} onSave={onSave} currentIndex={9}/>}
        </>
    );
}

export default RahmenSection;