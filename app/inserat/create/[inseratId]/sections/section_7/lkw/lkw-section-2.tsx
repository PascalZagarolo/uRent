'use client'

import { inserat, lkwAttribute, pkwAttribute } from "@/db/schema";

import { useState } from "react";


import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRightCircleIcon } from "lucide-react";
import toast from "react-hot-toast";

import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";


import FuelFormCreation from "../pkw/pkw-fuel";
import LoadingFormCreation from "./lkw-loading";
import DriveFormCreation from "./lkw-drive";
import { previousPage, switchSectionOverview } from "@/hooks/inserat-creation/useRouterHistory";
import SaveChangesDialog from "../../_components/save-changes-dialog";
import SaveChangesPrevious from "../../_components/save-changes-previous";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import RenderContinue from "../../_components/render-continue";
import PkwAhkCreation from "../pkw/pkw-ahk";
import TransmissionFormCreation from "../../section_6/pkw/pkw-transmission";







interface LkwSection2Props {
    lkwAttribute: typeof lkwAttribute.$inferSelect;
    currentSection: number;
    changeSection: (value: number) => void;
}

const LkwSection2 = ({ lkwAttribute, currentSection, changeSection }: LkwSection2Props) => {



    
    const [currentDrive, setCurrentDrive] = useState(lkwAttribute?.drive);
    const [currentFuel, setCurrentFuel] = useState(lkwAttribute?.fuel ? lkwAttribute?.fuel : null);
    const [currentLoading, setCurrentLoading] = useState(lkwAttribute?.loading ? lkwAttribute?.loading : null);
    const [currentAhk, setCurrentAhk] = useState(lkwAttribute?.ahk ? lkwAttribute?.ahk : undefined);

    const [isLoading, setIsLoading] = useState(false);

    const [showDialog, setShowDialog] = useState(false);
    const [showDialogPrevious, setShowDialogPrevious] = useState(false);

    const inseratId = useParams()?.inseratId;

    const router = useRouter();

    const onSave = async (redirect?: boolean, previous?: boolean) => {
        try {
            setIsLoading(true);
            if (hasChanged) {
                const values = {
                   
                    drive: currentDrive,
                    fuel: currentFuel,
                    loading: currentLoading,
                    ahk : currentAhk
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
            }
            else {
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
        
        currentDrive !== lkwAttribute?.drive ||
        currentFuel !== lkwAttribute?.fuel ||
        currentLoading !== lkwAttribute?.loading || 
        currentAhk !== lkwAttribute?.ahk
    );



    return (

        <>
            <div className="h-full flex flex-col">
                <h3 className="text-lg font-semibold">
                    LKW - Eigenschaften (2/3)
                    <p className="text-xs text-gray-200/60 font-medium text-left">
                        Hier kannst du weitere Kategorie abhängige Attribute deines Fahrzeuges angeben. <br />
                        Diese Informationen helfen potentiellen Käufern, schneller das passende Fahrzeug zu finden.
                    </p>
                </h3>
                
                <div className="mt-4">
                    <DriveFormCreation
                        currentValue={currentDrive as any}
                        setCurrentValue={setCurrentDrive}
                    />
                </div>
                <div className="mt-4">
                    <FuelFormCreation
                        currentValue={currentFuel as any}
                        setCurrentValue={setCurrentFuel}
                    />
                </div>
                <div className="mt-4">
                    <LoadingFormCreation
                        currentValue={currentLoading as any}
                        setCurrentValue={setCurrentLoading}
                    />
                </div>
                <div className="mt-4">
                    <PkwAhkCreation currentValue={currentAhk as any} setCurrentValue={setCurrentAhk} />
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
                    <RenderContinue isLoading={isLoading} disabled={isLoading} onClick={() => onSave()} hasChanged={hasChanged} />
                </div>
            </div>
            {showDialog && <SaveChangesDialog open={showDialog} onChange={setShowDialog} onSave={onSave} />}
            {showDialogPrevious && <SaveChangesPrevious open={showDialogPrevious} onChange={setShowDialogPrevious} onSave={onSave} currentIndex={7} />}
        </>

    );
}

export default LkwSection2;