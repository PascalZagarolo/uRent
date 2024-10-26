'use client';

import { inserat, userSubscription } from "@/db/schema";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRightCircleIcon, CircleIcon, ClipboardCopy, CopyCheckIcon, Link2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { HiLockClosed } from "react-icons/hi";
import { LockOpen1Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { checkIfValid } from "@/hooks/subscription/useCheckSubscription";
import { BsCircleFill } from "react-icons/bs";
import SectionOverviewTotal from "./_components/section-overview-total";

interface ReleaseSectionProps {
    thisInserat: typeof inserat.$inferSelect | any;
    existingSubscription: typeof userSubscription.$inferSelect;
    currentSection: number;
    changeSection: (value: number) => void;
    publishedLength: number;
}

const ReleaseSection = ({ thisInserat, currentSection, changeSection, existingSubscription, publishedLength }: ReleaseSectionProps) => {
    const onPrevious = () => {
        changeSection(currentSection - 1);
    }

    const [error, setError] = useState<{ errorField: string; errorText: string } | null>(null);
    const [currentPrivacy, setCurrentPrivacy] = useState<boolean>(thisInserat?.isPublished);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const handlePrivacyChange = (privacy: boolean) => {
        setCurrentPrivacy(privacy);
    }

    const router = useRouter();

    //....

    const canPublish = () => {
        if (!thisInserat?.title || !thisInserat?.description || !thisInserat?.category || !thisInserat?.price || thisInserat?.price == 0
            || thisInserat?.images?.length < 1 || !thisInserat?.address?.postalCode || !thisInserat?.address?.locationString || thisInserat?.locationString?.trim() == "" || thisInserat?.postalCode?.length !== 5
        ) {
            return false;
        } else {
            return true;
        }
    }


    const unfinishedSections = []

    if(!thisInserat?.title || !thisInserat?.description) {
        unfinishedSections.push(1)
    }

    if(thisInserat?.images?.length < 1) {
        unfinishedSections.push(3)
    }

    if(!thisInserat?.price || thisInserat?.price == 0) {
        unfinishedSections.push(4)
    }

    if(!thisInserat?.address?.postalCode?.length || !thisInserat?.locationString || thisInserat?.locationString.trim() == "" || thisInserat?.address?.postalCode?.length !== 5) {
        unfinishedSections.push(10)
    }

    

    const onSave = async () => {
        try {

            if (currentPrivacy && !checkIfValid(publishedLength, existingSubscription)) {
                return router.push("/pricing")
            }

            setIsLoading(false);
            const values = {
                isPublished: currentPrivacy
            }
            await axios.patch(`/api/inserat/${thisInserat?.id}`, values)
            if (currentPrivacy) {
                toast.success("Inserat wurde erfolgreich veröffentlicht.");
                router.push(`/inserat/${thisInserat?.id}`);
            } else {
                toast.success("Inserat wurde als Entwurf gespeichert.");
                router.push(`/dashboard/${thisInserat?.userId}`);
            }

        } catch (e: any) {
            console.log(e);
            toast.error("Etwas ist schief gelaufen. Bitte versuche es erneut.");
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`www.urent-rental.de/inserat/${thisInserat?.id}`);
        toast.success("Link wurde in die Zwischenablage kopiert.");
    }

    return (
        <div className="flex flex-col w-full h-full items-center justify-center">
            <h3 className="text-xl font-semibold text-gray-100 ">
                Inserat veröffentlichen
            </h3>
            <p className="text-xs text-gray-200/60 text-center">
                Hier kannst du entscheiden, ob dein Inserat öffentlich oder privat sein soll. <br />
                Öffentliche Inserate sind für alle Nutzer sichtbar und können von jedem eingesehen werden. <br />
                Private Inserate sind nur für dich sichtbar und können nicht von anderen Nutzern eingesehen werden. <br />
                Du kannst die Sichtbarkeit sowie alle Angaben jederzeit ändern.
            </p>
            <div className="flex justify-start font-semibold text-base mt-4">
                Sichtbarkeit anpassen
            </div>
            <div className="w-full bg-[#191919] p-1 rounded-lg flex justify-between items-center">
                <Button
                    variant="ghost"
                    className={`w-1/2 mr-2 ${!currentPrivacy ? 'bg-[#212121] hover:bg-[#212121] font-bold' : 'bg-[#191919] hover:bg-[#191919]'} text-gray-200`}
                    onClick={() => handlePrivacyChange(false)}
                >
                    <HiLockClosed className="w-4 h-4 mr-2" /> Privat
                </Button>
                <Button
                    className={`w-1/2 ${currentPrivacy ? 'bg-[#212121] hover:bg-[#212121] font-bold' : 'bg-[#191919] hover:bg-[#191919]'}  text-gray-200`}

                    onClick={() => handlePrivacyChange(true)}
                >
                    <LockOpen1Icon className="w-4 h-4 mr-2" /> Öffentlich
                </Button>
            </div>
            <div className="flex flex-col items-center  ">
                <a className="hover:underline flex flex-row items-center text-sm text-gray-200 mt-4" href={`/inserat/${thisInserat?.id}`} target="_blank" rel="noReferrer">
                    <Link2 className="w-4 h-4 mr-2" /> Zu deiner Inserats-Vorschau
                </a>
                <span className="text-xs text-gray-200/60 flex flex-row items-center hover:underline hover:text-gray-200/80" onClick={copyToClipboard}>
                    <ClipboardCopy className="w-4 h-4 mr-2 text-gray-200 hover:cursor-pointer" /> www.urent-rental.de/inserat/{thisInserat?.id}
                </span>
            </div>
            <div>
                {!canPublish() && (
                    <div className="">
                        <div className="text-base font-semibold text-gray-200 mt-4">
                            Du kannst dein Inserat als Entwurf speichern & jederzeit bearbeiten. <br/>
                            Um das Inserat zu veröffentlichen, müssen jedoch alle Pflichtfelder ausgefüllt sein.
                        </div>
                        <div>
                            <div>
                                {(!thisInserat?.title  || thisInserat?.title?.trim() == "") &&  
                                <div className="text-sm text-red-500 mt-2 flex flex-row items-center space-x-2 hover:underline"
                                onClick={() => changeSection(1)}
                                > <BsCircleFill className="w-2 h-2 mr-2 text-rose-600" /> Keinen Titel angegeben 
                                <span className="text-gray-200/60"> (Abschnitt 1) </span>
                                </div>}
                                {(!thisInserat?.description  || thisInserat?.description?.trim() == "") && 
                                <div className="text-sm text-red-500 mt-2 flex flex-row items-center space-x-2 hover:underline"
                                onClick={() => changeSection(1)}
                                > <BsCircleFill className="w-2 h-2 mr-2 text-rose-600" /> Keine Beschreibung angegeben
                                <span className="text-gray-200/60"> (Abschnitt 1) </span>
                                </div>}
                                {thisInserat?.category ? null : 
                                <div className="text-sm text-red-500 mt-2 flex flex-row items-center space-x-2 hover:underline"
                                onClick={() => changeSection(2)}
                                > <BsCircleFill className="w-2 h-2 mr-2 text-rose-600" /> Keine Kategorie angegeben
                                <span className="text-gray-200/60"> (Abschnitt 2) </span>
                                </div>}
                                {thisInserat?.images?.length > 0 ? null : 
                                <div className="text-sm text-red-500 mt-2 flex flex-row items-center space-x-2 hover:underline"
                                onClick={() => changeSection(3)}
                                > <BsCircleFill className="w-2 h-2 mr-2 text-rose-600" /> Keine Bilder angegeben
                                <span className="text-gray-200/60"> (Abschnitt 3) </span>
                                </div>}
                                {(!thisInserat?.price || thisInserat?.price == 0) &&
                                 <div className="text-sm text-red-500 mt-2 flex flex-row items-center space-x-2 hover:underline"
                                 onClick={() => changeSection(4)}
                                 > <BsCircleFill className="w-2 h-2 mr-2 text-rose-600" /> Keinen Preis angegeben
                                <span className="text-gray-200/60"> (Abschnitt 4) </span>
                                 </div>}
                               
                                
                                {(!thisInserat?.address?.postalCode || thisInserat?.address?.postalCode?.length !== 5) && 
                                <div className="text-sm text-red-500 mt-2 flex flex-row items-center space-x-2 hover:underline"
                                onClick={() => changeSection(10)}
                                > <BsCircleFill className="w-2 h-2 mr-2 text-rose-600" /> Keine Postleitzahl angegeben
                                <span className="text-gray-200/60"> (Abschnitt 10) </span>
                                </div>}
                                {(!thisInserat?.address?.locationString || thisInserat?.address?.locationString?.trim() === "")  &&  
                                <div className="text-sm text-red-500 mt-2 flex flex-row items-center space-x-2 hover:underline"
                                onClick={() => changeSection(10)}>
                                 <BsCircleFill className="w-2 h-2 mr-2 text-rose-600" /> Keine Addresse angegeben
                                <span className="text-gray-200/60"> (Abschnitt 10) </span>
                                </div>}

                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex flex-col w-full mt-16">
                <Button className={cn("bg-indigo-800 hover:bg-indigo-900 text-gray-200 py-3 w-full rounded-lg shadow-lg transition-all duration-200",
                    !currentPrivacy ? 'bg-[#222222] hover:bg-[#232323] text-gray-200/80 hover:text-gray-200' : 'bg-indigo-800 hover:bg-indigo-900')}
                    onClick={onSave}
                    disabled={isLoading || !canPublish() && currentPrivacy}
                >
                    Inserat  {currentPrivacy ? 'veröffentlichen' : 'als Entwurf speichern'}
                </Button>
                <Button className="flex items-center justify-center w-full text-gray-400 hover:text-gray-200 transition-all mt-2" variant="ghost"
                    onClick={onPrevious} disabled={isLoading}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Zurück
                </Button>
            </div>
            <div className="mt-4">
                <SectionOverviewTotal 
                currentCategory = {thisInserat?.category}
                unfinishedSections = {unfinishedSections}
                />
            </div>
        </div>
    );
}

export default ReleaseSection;
