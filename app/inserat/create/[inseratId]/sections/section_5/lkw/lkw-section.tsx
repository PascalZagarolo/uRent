'use client'

import { inserat, lkwAttribute, pkwAttribute } from "@/db/schema";

import { useState } from "react";


import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRightCircleIcon } from "lucide-react";
import toast from "react-hot-toast";

import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import SeatsCreation from "../pkw/pkw-seats";
import LkwWeightClassCreation from "./lkw-weight-class";
import LkwAxisCreation from "./lkw-axis";
import LkwBrandCreation from "./lkw-brand";
import { brand } from '../../../../../../../drizzle/schema';







interface LkwSectionProps {
    lkwAttribute: typeof lkwAttribute.$inferSelect;
    currentSection: number;
    changeSection: (value: number) => void;
}

const LkwSection = ({ lkwAttribute, currentSection, changeSection }: LkwSectionProps) => {



    const [currentWeight, setCurrentWeight] = useState(lkwAttribute?.weightClass ? lkwAttribute?.weightClass : null);
    const [currentAxis, setCurrentAxis] = useState(lkwAttribute?.axis ? lkwAttribute?.axis : null);
    const [currentBrand, setCurrentBrand] = useState(lkwAttribute?.brand ? lkwAttribute?.brand : null);
    const [currentSeats, setCurrentSeats] = useState(lkwAttribute?.seats ? lkwAttribute?.seats : null);

    const inseratId = useParams()?.inseratId;


    const onSave = async () => {
        try {
            const values = {
                weightClass : currentWeight,
                axis : currentAxis,
                brand : currentBrand,
                seats : currentSeats
            }
            await axios.patch(`/api/inserat/${inseratId}/lkw`, values);
            changeSection(currentSection + 1);
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
                    LKW - Eigenschaften (1/3)
                    <p className="text-xs text-gray-200/60 font-medium text-left">
                        Hier kannst du weitere Kategorie abhängige Attribute deines Fahrzeuges angeben. <br />
                        Diese Informationen helfen potentiellen Käufern, schneller das passende Fahrzeug zu finden.
                    </p>
                </h3>
                <div className="mt-4">
                    <LkwWeightClassCreation currentValue={currentWeight} setCurrentValue={setCurrentWeight} />
                </div>
                <div className="mt-4">
                    <LkwAxisCreation currentValue={currentAxis as any} setCurrentValue={setCurrentAxis} />
                </div>
                <div className="mt-4">
                    <LkwBrandCreation currentValue={currentBrand as any} setCurrentValue={setCurrentBrand} />
                </div>
                <div className="mt-4">
                    <SeatsCreation currentValue={currentSeats as any} setCurrentValue={setCurrentSeats} />
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

export default LkwSection;