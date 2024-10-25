'use client'

import { inserat, pkwAttribute } from "@/db/schema";

import { useState } from "react";


import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRightCircleIcon } from "lucide-react";
import toast from "react-hot-toast";
import CarBrandCreation from "./pkw-brand";
import SeatsCreation from "./pkw-seats";
import CarTypeCreation from "./pkw-type";
import { brand } from '../../../../../../../drizzle/schema';
import TransmissionFormCreation from "./pkw-transmission";
import axios from "axios";
import { useParams, useSearchParams, redirect, useRouter } from 'next/navigation';
import { switchSectionOverview } from "@/hooks/inserat-creation/useRouterHistory";
import SaveChangesDialog from "../../_components/save-changes-dialog";







interface PkwSectionProps {
    pkwAttribute: typeof pkwAttribute.$inferSelect;
    currentSection: number;
    changeSection: (value: number) => void;
}

const PkwSection = ({ pkwAttribute, currentSection, changeSection }: PkwSectionProps) => {

    

   const [currentBrand, setCurrentBrand] = useState(pkwAttribute?.brand ? pkwAttribute?.brand : null);
   const [currentSeats, setCurrentSeats] = useState(pkwAttribute?.seats);
   const [currentType, setCurrentType] = useState(pkwAttribute?.type ? pkwAttribute?.type : null);
   const [currentTransmission, setCurrentTransmission] = useState(pkwAttribute?.transmission ? pkwAttribute?.transmission : null);
   const [showDialog, setShowDialog] = useState(false);

   const router = useRouter();

    const inseratId = useParams()?.inseratId;
    

    const onSave = async (redirect? : boolean) => {
        try {
            const values = {
                brand: currentBrand,
                seats: currentSeats,
                type: currentType,
                transmission: currentTransmission
            }
            await axios.patch(`/api/inserat/${inseratId}/pkw`, values); 
            if(redirect) {
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

    const hasChanged = true;



    return (

        <>
        <div className="h-full flex flex-col">
            <h3 className="text-lg font-semibold">
                PKW - Eigenschaften (1/3)
                <p className="text-xs text-gray-200/60 font-medium text-left">
                    Hier kannst du weitere Kategorie abhängige Attribute deines Fahrzeuges angeben. <br />
                    Diese Informationen helfen potentiellen Käufern, schneller das passende Fahrzeug zu finden.
                </p>
            </h3>
            <div className="mt-4">
                <CarBrandCreation currentValue={currentBrand} setCurrentValue={setCurrentBrand} />
            </div>
            <div className="mt-4">
                <SeatsCreation currentValue={currentSeats as any} setCurrentValue={setCurrentSeats} />
            </div>
            <div className="mt-4">
                <CarTypeCreation currentValue={currentType as any} setCurrentValue={setCurrentType} />
            </div>
            <div className="mt-4">
                <TransmissionFormCreation currentValue={currentTransmission as any} setCurrentValue={setCurrentTransmission} />
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

export default PkwSection;