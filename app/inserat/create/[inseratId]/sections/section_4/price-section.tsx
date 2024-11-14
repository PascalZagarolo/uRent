'use client'

import { inserat, priceprofile } from "@/db/schema";

import { useState } from "react";
import DescriptionInserat from "../../../_components/input-fields/description-inserat";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRightCircleIcon } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import SelectPriceCreation from "./_components/price";
import PriceProfilesCreation from "./_components/price-profiles";
import { previousPage, switchSectionOverview } from "@/hooks/inserat-creation/useRouterHistory";
import { useRouter } from "next/navigation";
import SaveChangesDialog from "../_components/save-changes-dialog";
import SaveChangesPrevious from "../_components/save-changes-previous";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import RenderContinue from "../_components/render-continue";
import ShowPrivatizeDialog from "../_components/show-privatize-dialog";

interface PriceSectionProps {
    thisInserat: typeof inserat.$inferSelect | any;
    currentSection: number;
    changeSection: (value: number) => void;
}

const PriceSection = ({ thisInserat, currentSection, changeSection }: PriceSectionProps) => {


    const [currentPrice, setCurrentPrice] = useState(thisInserat?.price);
    const usedList = thisInserat?.priceprofiles?.sort((a, b) => a.position - b.position) || [];
    const [currentPriceProfiles, setCurrentPriceProfiles] = useState<typeof priceprofile.$inferSelect[] | undefined>(usedList);

    const [isLoading, setIsLoading] = useState(false);


    // Check if there is any difference in currentPriceProfiles or currentPrice
    const hasChanged = (currentPrice != thisInserat?.price || JSON.stringify(currentPriceProfiles) != JSON.stringify(thisInserat?.priceprofiles));


    const router = useRouter();
    const [showDialog, setShowDialog] = useState(false);
    const [showDialogPrevious, setShowDialogPrevious] = useState(false);
    const [showPrivate, setShowPrivate] = useState(false);

    const showPrivateDialog = (currentPrice == 0 || currentPrice == null || !currentPrice);


    const onSave = async (redirect?: boolean, previous?: boolean, confirmDelete? : boolean) => {
        try {
            setIsLoading(true);

            if(showPrivateDialog && !confirmDelete && thisInserat?.isPublished) {
                setShowPrivate(true);
                return
            }

            if ((currentPrice != thisInserat?.price && currentPrice) || confirmDelete) {

                const values = {
                    price: currentPrice ?? null
                }
                await axios.patch(`/api/inserat/${thisInserat?.id}`, values)
                router.refresh();
                
            }

            if (JSON.stringify(currentPriceProfiles) != JSON.stringify(thisInserat?.priceprofiles)) {

                const values = {
                    newPriceProfiles: currentPriceProfiles
                }

                await axios.post(`/api/inserat/${thisInserat?.id}/price-profiles/bulkUpdate`, values)
                router.refresh();
            }
            if (redirect) {
                router.push(`/inserat/create/${thisInserat.id}`);
                router.refresh();
            } else if (previous) {
                const params = new URLSearchParams("")
                params.set('sectionId', String(3))
                window.history.pushState(null, '', `?${params.toString()}`)
            } else {
                changeSection(usedNumber + 1);
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


    const usedNumber = thisInserat?.category == "PKW" ? 5 : 4;
    

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
                <div className="mt-4 mb-4">
                    <PriceProfilesCreation thisInserat={thisInserat} currentPriceProfiles={currentPriceProfiles} setCurrentPriceProfiles={setCurrentPriceProfiles} />
                </div>


            </div>
            <div className="mt-auto flex flex-col">
                <div className="flex flex-row items-center">
                    <span className="text-xs text-gray-200/60 flex flex-row items-center hover:underline cursor-pointer" onClick={() => switchSectionOverview(hasChanged, (show) => setShowDialog(show))}>
                        <ArrowLeft className="w-4 h-4 mr-2" /> Zu deiner Inseratsübersicht
                    </span>
                    <span className="text-xs text-gray-200/60 flex flex-row items-center hover:underline cursor-pointer ml-auto" onClick={() => previousPage(hasChanged, (show) => setShowDialogPrevious(show), 13)}>
                        Zur Ende springen <MdOutlineKeyboardDoubleArrowRight className="w-4 h-4 mr-2" />
                    </span>
                </div>
                <div className="grid grid-cols-2 mt-2">
                    <Button className="" variant="ghost" onClick={() => previousPage(hasChanged, (show) => setShowDialogPrevious(show), 4)}>
                        Zurück
                    </Button>
                    <RenderContinue isLoading={isLoading} disabled={isLoading} onClick={() => onSave()} hasChanged={hasChanged} />
                </div>
            </div>
            {showDialog && <SaveChangesDialog open={showDialog} onChange={setShowDialog} onSave={onSave} />}
            {showDialogPrevious && <SaveChangesPrevious open={showDialogPrevious} onChange={setShowDialogPrevious} onSave={onSave} currentIndex={4} />}
            {showPrivate && <ShowPrivatizeDialog  open={showPrivate} onChange={setShowPrivate} onSave={() => onSave(undefined, undefined, true)}
                                text={"Du hast keinen Preis, oder einen ungültigen Preis festgelegt."}
                />}
        </>
    );
}

export default PriceSection;