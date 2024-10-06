'use client'

import { inserat, lkwAttribute, pkwAttribute, trailerAttribute } from "@/db/schema";

import { useState } from "react";


import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRightCircleIcon } from "lucide-react";
import toast from "react-hot-toast";

import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import LoadingFormCreation from "../lkw/lkw-loading";
import TrailerCouplingCreation from "./trailer-coupling";









interface TrailerSection2Props {
    trailerAttributes: typeof trailerAttribute.$inferSelect;
    currentSection: number;
    changeSection: (value: number) => void;
}

const TrailerSection2 = ({ trailerAttributes, currentSection, changeSection }: TrailerSection2Props) => {



    const [currentCoupling, setCurrentCoupling] = useState(trailerAttributes?.coupling ? trailerAttributes?.coupling : null);
    const [currentLoading, setCurrentLoading] = useState(trailerAttributes?.loading ? trailerAttributes?.loading : undefined);


    const inseratId = useParams()?.inseratId;


    const onSave = async () => {
        try {
            const values = {
                coupling : currentCoupling,
                loading : currentLoading
            }
            await axios.patch(`/api/inserat/${inseratId}/trailer`, values);
            changeSection(currentSection + 1);
        } catch (e: any) {
            console.log(e);
            toast.error("Fehler beim Speichern der Änderungen");
        }
    };




    const onPrevious = () => {
        changeSection(currentSection - 1);
    }

    



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
                <span className="text-xs text-gray-200/60 flex flex-row items-center hover:underline cursor-pointer mt-2">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Zu deiner Inseratsübersicht
                </span>
                <div className="grid grid-cols-2 mt-2">
                    <Button className="" variant="ghost" onClick={onPrevious}>
                        Zurück
                    </Button>
                    <Button className="bg-indigo-800 text-gray-200 w-full  hover:bg-indigo-900 hover:text-gray-300"
                        onClick={onSave}
                    >
                        Fortfahren <ArrowRightCircleIcon className="text-gray-200 w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
        </>

    );
}

export default TrailerSection2;