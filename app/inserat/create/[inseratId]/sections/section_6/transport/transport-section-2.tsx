'use client'


import { useState } from "react";


import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRightCircleIcon } from "lucide-react";
import toast from "react-hot-toast";

import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { transportAttribute } from '../../../../../../../db/schema';
import FuelFormCreation from "../pkw/pkw-fuel";
import DoorsCreation from "../pkw/pkw-doors";
import LoadingFormCreation from "../lkw/lkw-loading";
import { switchSectionOverview } from "@/hooks/inserat-creation/useRouterHistory";
import SaveChangesDialog from "../../_components/save-changes-dialog";










interface TransportSection2Props {
    transportAttribute: typeof transportAttribute.$inferSelect;
    currentSection: number;
    changeSection: (value: number) => void;
}

const TransportSection2 = ({ transportAttribute, currentSection, changeSection }: TransportSection2Props) => {



    const [currentFuel, setCurrentFuel] = useState(transportAttribute?.fuel ? transportAttribute?.fuel : null);

    const [currentDoors, setCurrentDoors] = useState(transportAttribute?.doors ? transportAttribute?.doors : null);
    const [currentLoading, setCurrentLoading] = useState(transportAttribute?.loading ? transportAttribute?.loading : null);

    const [showDialog, setShowDialog] = useState(false);

    const router = useRouter();

    const inseratId = useParams()?.inseratId;


    const onSave = async (redirect?: boolean) => {
        try {
            const values = {
                fuel: currentFuel,
                doors: currentDoors,
                loading: currentLoading
            }
            await axios.patch(`/api/inserat/${inseratId}/transport`, values);
            if (redirect) {
                router.push(`/inserat/create/${inseratId}`);
                router.refresh();
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


    const hasChanged = false;


    return (

        <>
            <div className="h-full flex flex-col">
                <h3 className="text-lg font-semibold">
                    Transport - Eigenschaften (2/3)
                    <p className="text-xs text-gray-200/60 font-medium text-left">
                        Hier kannst du weitere Kategorie abhängige Attribute deines Fahrzeuges angeben. <br />
                        Diese Informationen helfen potentiellen Käufern, schneller das passende Fahrzeug zu finden.
                    </p>
                </h3>
                <div className="mt-4">
                    <FuelFormCreation currentValue={currentFuel} setCurrentValue={setCurrentFuel} />
                </div>
                <div className="mt-4">
                    <DoorsCreation currentValue={currentDoors as any} setCurrentValue={setCurrentDoors} />
                </div>
                <div className="mt-4">
                    <LoadingFormCreation currentValue={currentLoading as any} setCurrentValue={setCurrentLoading} />
                </div>
                <div className="mt-4">

                </div>

            </div>
            <div className=" flex flex-col mt-auto ">
                <span className="text-xs text-gray-200/60 flex flex-row items-center hover:underline cursor-pointer mt-2" onClick={() => switchSectionOverview(hasChanged, (show) => setShowDialog(show))}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Zu deiner Inseratsübersicht
                </span>
                <div className="grid grid-cols-2 mt-2">
                    <Button className="" variant="ghost" onClick={onPrevious}>
                        Zurück
                    </Button>
                    <Button className="bg-indigo-800 text-gray-200 w-full  hover:bg-indigo-900 hover:text-gray-300"
                        onClick={() => onSave()}
                    >
                        Speichern & Fortfahren <ArrowRightCircleIcon className="text-gray-200 w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
            {showDialog && <SaveChangesDialog  open={showDialog} onChange={setShowDialog} onSave={onSave}/>}
        </>

    );
}

export default TransportSection2;