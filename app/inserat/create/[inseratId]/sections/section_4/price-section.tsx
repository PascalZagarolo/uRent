'use client'

import { inserat } from "@/db/schema";

import { useState } from "react";
import DescriptionInserat from "../../../_components/input-fields/description-inserat";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRightCircleIcon } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import SelectPriceCreation from "./_components/price";
import PriceProfilesCreation from "./_components/price-profiles";
import { switchSectionOverview } from "@/hooks/inserat-creation/useRouterHistory";
import { useRouter } from "next/navigation";
import SaveChangesDialog from "../_components/save-changes-dialog";

interface PriceSectionProps {
    thisInserat: typeof inserat.$inferSelect | any;
    currentSection: number;
    changeSection: (value: number) => void;
}

const PriceSection = ({ thisInserat, currentSection, changeSection }: PriceSectionProps) => {


    const [currentPrice, setCurrentPrice] = useState(thisInserat?.price);
    const [currentPriceProfiles, setCurrentPriceProfiles] = useState<
        {
            id: string;
            title: string;
            description: string;
            price: number;
            freeMiles: number;
            extraCost: number;
            position: number;
            getsDeleted?: boolean;
            getsAdded?: boolean;
            getsEdited?: boolean;
        }[]
    >(thisInserat?.priceprofiles ?? []);



    const router = useRouter();
    const [showDialog, setShowDialog] = useState(false);

    const onSave = async (redirect?: boolean) => {
        try {
            if (currentPrice !== thisInserat?.price) {
                const values = {
                    price: currentPrice
                }
                await axios.patch(`/api/inserat/${thisInserat?.id}`, values)
            }

            if (currentPriceProfiles != thisInserat?.priceProfiles) {
                const submittedValues = currentPriceProfiles.map((profile) => {
                    if (profile.getsAdded || profile.getsDeleted) {
                        return profile;
                    }

                })
                await axios.post(`/api/inserat/${thisInserat?.id}/price-profiles/bulkUpdate`, submittedValues)

            }
            if (redirect) {
                router.push(`/inserat/create/${thisInserat.id}`);
                router.refresh();
            } else {
                changeSection(currentSection + 1);
            }
        } catch (e: any) {
            console.log(e);
            toast.error("Fehler beim Speichern der Änderungen");
        }
    }

    const onPrevious = () => {
        changeSection(currentSection - 1);
    }

    const hasChanged = currentPrice !== thisInserat?.price || currentPriceProfiles !== thisInserat?.priceProfiles;

    return (
        <>
            <div className="flex flex-col h-full">
                <h3 className="text-lg font-semibold">
                    Preisdetails
                    <p className="text-xs text-gray-200/60 font-medium text-left">
                        Hier kannst du die Preisdetails zu deinem Inserat machen. <br />
                        Du kannst auch Preisprofile hinzufügen, um potentiellen Kunden eine bessere Übersicht über deine Preisgestaltung zu geben.
                    </p>
                </h3>
                <div className="mt-4">
                    <SelectPriceCreation thisInserat={thisInserat} currentValue={currentPrice} setCurrentValue={setCurrentPrice} />
                </div>
                <div className="mt-4">
                    <PriceProfilesCreation thisInserat={thisInserat} currentPriceProfiles={currentPriceProfiles} setCurrentPriceProfiles={setCurrentPriceProfiles} />
                </div>


            </div>
            <div className="mt-auto flex flex-col">
                <span className="text-xs text-gray-200/60 flex flex-row items-center hover:underline cursor-pointer" onClick={() => switchSectionOverview(hasChanged, (show) => setShowDialog(show))}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Zu deiner Inseratsübersicht
                </span>
                <div className="grid grid-cols-2 mt-2">
                    <Button className="" variant="ghost" onClick={onPrevious}>
                        Zurück
                    </Button>
                    <Button className="bg-indigo-800 text-gray-200 w-full  hover:bg-indigo-900 hover:text-gray-300"
                        onClick={() => onSave()}
                    >
                        Fortfahren <ArrowRightCircleIcon className="text-gray-200 w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
            {showDialog && <SaveChangesDialog  open={showDialog} onChange={setShowDialog} onSave={onSave}/>}
        </>
    );
}

export default PriceSection;