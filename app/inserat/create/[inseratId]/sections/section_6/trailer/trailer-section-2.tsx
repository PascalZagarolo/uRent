'use client'

import { inserat, lkwAttribute, pkwAttribute, trailerAttribute } from "@/db/schema";

import { useState } from "react";


import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRightCircleIcon } from "lucide-react";
import toast from "react-hot-toast";

import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import LoadingFormCreation from "../lkw/lkw-loading";
import TrailerCouplingCreation from "./trailer-coupling";
import { previousPage, switchSectionOverview } from "@/hooks/inserat-creation/useRouterHistory";
import SaveChangesDialog from "../../_components/save-changes-dialog";
import SaveChangesPrevious from "../../_components/save-changes-previous";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";









interface TrailerSection2Props {
    trailerAttributes: typeof trailerAttribute.$inferSelect;
    currentSection: number;
    changeSection: (value: number) => void;
}

const TrailerSection2 = ({ trailerAttributes, currentSection, changeSection }: TrailerSection2Props) => {



    const [currentCoupling, setCurrentCoupling] = useState(trailerAttributes?.coupling ? trailerAttributes?.coupling : null);
    const [currentLoading, setCurrentLoading] = useState(trailerAttributes?.loading ? trailerAttributes?.loading : undefined);

    const [showDialog, setShowDialog] = useState(false);
    const [showDialogPrevious, setShowDialogPrevious] = useState(false);

    const router = useRouter();

    const inseratId = useParams()?.inseratId;


    const onSave = async (redirect?: boolean, previous?: boolean) => {
        try {
            if(hasChanged) {
                const values = {
                    coupling: currentCoupling,
                    loading: currentLoading
                }
                await axios.patch(`/api/inserat/${inseratId}/trailer`, values);
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
        currentCoupling !== trailerAttributes?.coupling ||
        currentLoading !== trailerAttributes?.loading
    );


    return (

        <>
            <div className="h-full flex flex-col">
                <h3 className="text-lg font-semibold">
                    Anhänger - Eigenschaften (2/3)
                    <p className="text-xs text-gray-200/60 font-medium text-left">
                        Hier kannst du weitere Kategorie abhängige Attribute deines Fahrzeuges angeben. <br />
                        Diese Informationen helfen potentiellen Käufern, schneller das passende Fahrzeug zu finden.
                    </p>
                </h3>
                <div className="mt-4">
                    <TrailerCouplingCreation
                        currentValue={currentCoupling as any}
                        setCurrentValue={setCurrentCoupling}
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

export default TrailerSection2;