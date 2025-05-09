'use client'

import { inserat } from "@/db/schema";

import { useEffect, useState } from "react";


import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRightCircleIcon } from "lucide-react";
import toast from "react-hot-toast";


import axios from "axios";
import { RenderErrorMessage } from "../_components/render-messages";
import SelectMinTimeCreation from "./min-time";
import { previousPage, switchSectionOverview } from "@/hooks/inserat-creation/useRouterHistory";
import { useRouter } from "next/navigation";
import SaveChangesDialog from "../_components/save-changes-dialog";
import SaveChangesPrevious from "../_components/save-changes-previous";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import RenderContinue from "../_components/render-continue";


interface TimeSectionProps {
    thisInserat: typeof inserat.$inferSelect;
    currentSection: number;
    changeSection: (value: number) => void;
}

const TimeSection = ({ thisInserat, currentSection, changeSection }: TimeSectionProps) => {





    const [currentMinTime, setCurrentMinTime] = useState<string | null>(thisInserat.minTime ? String(thisInserat.minTime) : null);
    

    const [isLoading, setIsLoading] = useState(false);

    const [showDialog, setShowDialog] = useState(false);
    const [showDialogPrevious, setShowDialogPrevious] = useState(false);

    const router = useRouter();

    const onSave = async (redirect?: boolean, previous?: boolean) => {
        try {
            setIsLoading(true);
           if(hasChanged) {
            console.log("...")
            const values = {
                minTime: currentMinTime ? Number(currentMinTime) : null,
            }
            await axios.patch(`/api/inserat/${thisInserat.id}`, values);
            router.refresh();
           }
            if (redirect) {
                router.push(`/inserat/create/${thisInserat.id}`);
                router.refresh();
            } else if (previous) {
                
                const params = new URLSearchParams("")
                params.set('sectionId', String(9))
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

    const [error, setError] = useState<{ errorField: string; errorText: string } | null>(null);




    const hasChanged = (
        Number(currentMinTime ?? 0) != Number(thisInserat.minTime ?? 0)
    );



    return (
        <>
            <div className="flex flex-col h-full">
                <h3 className="text-lg font-semibold">
                    Mietdauer
                    <p className="text-xs text-gray-200/60 font-medium text-left">
                        Gebe deine Mindestmietdauer an, also den Zeitraum die der Mieter mindestens mieten muss. <br />
                        Falls du keine Mindestmietdauer hast, lasse das Feld einfach leer oder klicke auf {`"`}Beliebig{`"`}.
                    </p>
                </h3>
                <div className="mt-4">
                    <SelectMinTimeCreation currentValue={currentMinTime} setCurrentValue={setCurrentMinTime}  />

                </div>


            </div>
            <div className="mt-auto flex flex-col">
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
                    <Button className="" variant="ghost" onClick={() => previousPage(hasChanged, (show) => setShowDialogPrevious(show), 10)}>
                        Zurück
                    </Button>
                    <RenderContinue isLoading={isLoading} disabled={isLoading} onClick={() => onSave()} hasChanged={hasChanged} />
                </div>
            </div>
            {showDialog && <SaveChangesDialog  open={showDialog} onChange={setShowDialog} onSave={onSave}/>}
            {showDialogPrevious && <SaveChangesPrevious open={showDialogPrevious} onChange={setShowDialogPrevious} onSave={onSave} currentIndex={10}/>}
        </>
    );
}

export default TimeSection;