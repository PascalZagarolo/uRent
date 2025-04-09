'use client'

import { inserat } from "@/db/schema";

import { useEffect, useState } from "react";
import DescriptionInserat from "../../../_components/input-fields/description-inserat";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRightCircleIcon } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryInseratCreation from "./_components/category";

import ExtraTypeLkwCreation from "./_components/extra-type-lkw";
import TransportExtraTypeCreation from "./_components/extra-type-transport";
import TrailerExtraTypeCreation from "./_components/extra-type-trailer";
import { previousPage, switchSectionOverview } from "@/hooks/inserat-creation/useRouterHistory";

import { useRouter } from "next/navigation";
import SaveChangesDialog from "../_components/save-changes-dialog";
import SaveChangesPrevious from "../_components/save-changes-previous";

import InseratType from "./_components/inserat-type";
import VehicleAmount from "./_components/vehicle-amount";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import RenderContinue from "../_components/render-continue";

interface BasicDetails2Props {
    thisInserat: typeof inserat.$inferSelect | any;
    currentSection: number;
    changeSection: (value: number) => void;
}

const BasicDetails2 = ({ thisInserat, currentSection, changeSection }: BasicDetails2Props) => {

    const [currentCategory, setCurrentCategory] = useState(thisInserat.category || "PKW");
    const [isMulti, setIsMulti] = useState<string>(thisInserat.multi ? "true" : "false");
    const [isLoading, setIsLoading] = useState(false);
    const [vehicleAmount, setVehicleAmount] = useState(thisInserat?.amount);


    const [showDialog, setShowDialog] = useState(false);
    const [showDialogPrevious, setShowDialogPrevious] = useState(false);

    useEffect(() => {

        if (thisInserat?.category !== "PKW") {
            switch (thisInserat?.category) {
                case "LKW":
                    setExtraType(thisInserat?.lkwAttribute?.application);
                    break;
                case "TRANSPORT":
                    setExtraType(thisInserat?.transportAttribute?.transport);
                    break;
                case "TRAILER":
                    setExtraType(thisInserat?.trailerAttribute?.trailer);
                    break;
                default:
                    setExtraType(undefined);
            }
        }
    }, [])

    const [extraType, setExtraType] = useState();

    useEffect(() => {
        if (currentCategory !== thisInserat?.category) {
            setExtraType(undefined)
        }
    }, [currentCategory])

    const router = useRouter();

    const onSave = async (redirect?: boolean, previous?: boolean) => {
        try {
            setIsLoading(true);
            if (hasChanged) {
                
                const values = {
                    category: currentCategory,
                    multi: isMulti,
                    amount: vehicleAmount
                }
                
                await axios.patch(`/api/inserat/${thisInserat?.id}`, values)
                router.refresh();

                const usedKey = currentCategory === "LKW" ? "application" : "extraType";
                const values2 = {
                    [usedKey]: extraType ? extraType : null
                };
                await axios.patch(`/api/inserat/${thisInserat?.id}/${currentCategory?.toLowerCase()}`, values2)
                router.refresh();
            }
            if (redirect) {
                console.log("redirect")
                router.push(`/inserat/create/${thisInserat.id}`);
                router.refresh();
            } else if (previous) {

                const params = new URLSearchParams("")
                params.set('sectionId', String(1))
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

    const xor = (a: boolean, b: boolean): boolean => {
        return a !== b;
    };

    const dynamicPropertyName = `${thisInserat?.currentCategory?.toLowerCase()}Attributes`;

    const hasChanged = (
        currentCategory != thisInserat.category ||
        extraType != thisInserat?.[dynamicPropertyName]?.extraType ||
        xor(isMulti == "true", thisInserat.multi) ||
        vehicleAmount != thisInserat.amount
    );

    
    

    useEffect(() => {
        if (String(isMulti) === "false") {
            setVehicleAmount(1);
        } else if(String(isMulti) === "true" && vehicleAmount < 2) {
            setVehicleAmount(2);
        }
    }, [isMulti]);

    const renderExtraType = () => {
        const extraTypes = {
            "LKW": <ExtraTypeLkwCreation currentValue={extraType} setCurrentValue={setExtraType} />,
            "TRANSPORT": <TransportExtraTypeCreation currentValue={extraType} setCurrentValue={setExtraType} />,
            "TRAILER": <TrailerExtraTypeCreation currentValue={extraType} setCurrentValue={setExtraType} />
        };

        return extraTypes[currentCategory] || null;
    }

    useEffect(() => {
        if (!hasChanged) return
        function handleBeforeUnload(event: BeforeUnloadEvent) {
            event.preventDefault();
            return (event.returnValue = '');
        }
        window.addEventListener('beforeunload', handleBeforeUnload, { capture: true });

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload, { capture: true });
        }
    }, [hasChanged])

    

    return (
        <>
            <div className="flex flex-col">
                <h3 className="text-lg font-semibold">
                    Grundlegende Angaben (2/2) 
                    <p className="text-xs text-gray-200/60 font-medium text-left">
                        Hier kannst du die grundlegenden Angaben zu deinem Inserat machen. <br />
                        Gebe anderen Nutzern einen ersten Eindruck von deinem Inserat.
                    </p>
                </h3>
                <div className="mt-4">
                    <CategoryInseratCreation
                        thisInserat={thisInserat}
                        currentCategory={currentCategory as any}
                        setCurrentCategory={setCurrentCategory}
                    />
                </div>
                <div className="mt-4">
                    {renderExtraType()}
                </div>
                <div className="mt-8">
                    <InseratType
                        thisInserat={thisInserat}
                        isMulti={isMulti}
                        setIsMulti={setIsMulti}
                    />
                </div>
                <div className="mt-4">
                    <VehicleAmount
                        thisInserat={thisInserat}
                        currentValue={vehicleAmount}
                        setCurrentValue={setVehicleAmount}
                        disabled={String(isMulti) === "false"}
                    />
                </div>
                
            </div>
            <div className=" mt-auto">
                <div className="flex flex-col mt-auto">
                    <div className="flex flex-row items-center">
                        <span className="text-xs text-gray-200/60 flex flex-row items-center hover:underline cursor-pointer" onClick={() => switchSectionOverview(hasChanged, (show) => setShowDialog(show))}>
                            <ArrowLeft className="w-4 h-4 mr-2" /> Zu deiner Inseratsübersicht
                        </span>
                        <span className="text-xs text-gray-200/60 flex flex-row items-center hover:underline cursor-pointer ml-auto" onClick={() => previousPage(hasChanged, (show) => setShowDialogPrevious(show), 12)}>
                        Zum  Ende springen <MdOutlineKeyboardDoubleArrowRight className="w-4 h-4 mr-2" />
                        </span>
                    </div>
                    <div className="grid grid-cols-2 mt-2">
                        <Button className="" variant="ghost" onClick={() => previousPage(hasChanged, (show) => setShowDialogPrevious(show), 2)}>
                            Zurück
                        </Button>
                        <RenderContinue isLoading={isLoading} disabled={isLoading} onClick={() => onSave()} hasChanged={hasChanged} />
                    </div>
                </div>

            </div>
            {showDialog && <SaveChangesDialog open={showDialog} onChange={setShowDialog} onSave={onSave} />}
            {showDialogPrevious && <SaveChangesPrevious open={showDialogPrevious} onChange={setShowDialogPrevious} onSave={onSave} currentIndex={2} />}
        </>
    );

}

export default BasicDetails2;