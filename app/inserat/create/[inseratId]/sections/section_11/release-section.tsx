'use client';

import { inserat } from "@/db/schema";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRightCircleIcon } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { HiLockClosed } from "react-icons/hi";
import { LockOpen1Icon } from "@radix-ui/react-icons";

interface ReleaseSectionProps {
    thisInserat: typeof inserat.$inferSelect | any;
    currentSection: number;
    changeSection: (value: number) => void;
}

const ReleaseSection = ({ thisInserat, currentSection, changeSection }: ReleaseSectionProps) => {
    const onPrevious = () => {
        changeSection(currentSection - 1);
    }

    const [error, setError] = useState<{ errorField: string; errorText: string } | null>(null);
    const [currentPrivacy, setCurrentPrivacy] = useState<boolean>(thisInserat?.isPublic ? thisInserat?.isPublic : false);

    const handlePrivacyChange = (privacy: boolean) => {
        setCurrentPrivacy(privacy);
    }

    return (
        <div className="flex flex-col w-full h-full items-center justify-center">
            <h3 className="text-xl font-semibold text-gray-100 ">
                Inserat veröffentlichen
            </h3>
            <p className="text-xs text-gray-200/60 text-center">
                Hier kannst du entscheiden, ob dein Inserat öffentlich oder privat sein soll. <br/>
                Öffentliche Inserate sind für alle Nutzer sichtbar und können von jedem eingesehen werden. <br/>
                Private Inserate sind nur für dich sichtbar und können nicht von anderen Nutzern eingesehen werden. <br/>
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
                    <LockOpen1Icon className="w-4 h-4 mr-2"/> Öffentlich
                </Button>
            </div>

            <div className="flex flex-col w-full mt-8">
                <Button className="bg-indigo-800 hover:bg-indigo-900 text-gray-100 py-3 w-full rounded-lg shadow-lg transition-all duration-200">
                    Inserat speichern & zum Dashboard
                </Button>
                <Button className="flex items-center justify-center w-full text-gray-400 hover:text-gray-200 transition-all" variant="ghost" onClick={onPrevious}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Zurück
                </Button>
            </div>

        </div>
    );
}

export default ReleaseSection;
