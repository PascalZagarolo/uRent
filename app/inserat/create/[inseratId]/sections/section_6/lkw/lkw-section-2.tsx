'use client'

import { inserat, lkwAttribute, pkwAttribute } from "@/db/schema";

import { useState } from "react";


import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRightCircleIcon } from "lucide-react";
import toast from "react-hot-toast";

import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import TransmissionFormCreation from "../../section_5/pkw/pkw-transmission";
import FuelFormCreation from "../pkw/pkw-fuel";
import LoadingFormCreation from "./lkw-loading";
import DriveFormCreation from "./lkw-drive";
import { previousPage, switchSectionOverview } from "@/hooks/inserat-creation/useRouterHistory";
import SaveChangesDialog from "../../_components/save-changes-dialog";
import SaveChangesPrevious from "../../_components/save-changes-previous";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";







interface LkwSection2Props {
    lkwAttribute: typeof lkwAttribute.$inferSelect;
    currentSection: number;
    changeSection: (value: number) => void;
}

const LkwSection2 = ({ lkwAttribute, currentSection, changeSection }: LkwSection2Props) => {



    const [currentTransmission, setCurrentTransmission] = useState(lkwAttribute?.transmission ? lkwAttribute?.transmission : null);
    const [currentDrive, setCurrentDrive] = useState(lkwAttribute?.drive);
    const [currentFuel, setCurrentFuel] = useState(lkwAttribute?.fuel ? lkwAttribute?.fuel : null);
    const [currentLoading, setCurrentLoading] = useState(lkwAttribute?.loading ? lkwAttribute?.loading : null);

    const [showDialog, setShowDialog] = useState(false);
    const [showDialogPrevious, setShowDialogPrevious] = useState(false);

    const inseratId = useParams()?.inseratId;

    const router = useRouter();

    const onSave = async (redirect?: boolean, previous?: boolean) => {
        try {
            if (hasChanged) {
                const values = {
                    transmission: currentTransmission,
                    drive: currentDrive,
                    fuel: currentFuel,
                    loading: currentLoading
                }
                await axios.patch(`/api/inserat/${inseratId}/lkw`, values);
                router.refresh();
            }
            if (redirect) {
                router.push(`/inserat/create/${inseratId}`);
                router.refresh();
            } else if (previous) {

                const params = new URLSearchParams("")
                params.set('sectionId', String(5))
                window.history.pushState(null, '', `?${params.toString()}`)
            }
            else {
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
        currentTransmission !== lkwAttribute?.transmission ||
        currentDrive !== lkwAttribute?.drive ||
        currentFuel !== lkwAttribute?.fuel ||
        currentLoading !== lkwAttribute?.loading
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
                    <TransmissionFormCreation
                        currentValue={currentTransmission}
                        setCurrentValue={setCurrentTransmission}
                    />
                </div>
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
                    <Button className="" variant="ghost" onClick={() => previousPage(hasChanged, (show) => setShowDialogPrevious(show), 6)}>
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
            {showDialogPrevious && <SaveChangesPrevious open={showDialogPrevious} onChange={setShowDialogPrevious} onSave={onSave} currentIndex={6} />}
        </>

    );
}

export default LkwSection2;