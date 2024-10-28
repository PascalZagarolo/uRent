'use client'

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { LinkIcon, XIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Warning = () => {

    const router = useRouter();

    const hideAlert = localStorage.getItem('hideAlert');

    const inseratId = useParams().inseratId;

    const onSwitch = () => {
        router.push(`/inserat/create/${inseratId}?sectionId=1`)
    }

    const onHide = () => {
        localStorage.setItem('hideAlert', JSON.stringify(true));
        
    }

    if (hideAlert) return null;

    return (
        <Alert className="border border-indigo-800 bg-[#222222] shadow-lg p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-semibold text-gray-100">
                    Achtung!
                </span>
                <Button className="bg-transparent hover:bg-[#333333] p-1" size="sm" variant="ghost" onClick={onHide}>
                    <XIcon className="w-4 h-4 text-gray-400 hover:text-gray-200 transition-colors duration-200" />
                </Button>
            </div>
            <div className="text-sm text-gray-300 leading-relaxed space-y-3">
                <p>
                    Falls du dein Inserat veröffentlicht hast und Daten änderst, bleibt dein Inserat weiterhin veröffentlicht und gibt sofort die geänderten Daten wieder.
                </p>
                <p>
                    Diese Erstellungsansicht dient zur optimalen Bearbeitung deines Inserates, damit du alle Informationen auf einen Blick hast und diese schneller ändern kannst.
                </p>
                <span className="">
                    Falls du dein Inserat gerade erstellst oder noch nicht wirklich vertraut bist mit dem Ökosystem von uRent,  empfehlen  wir, <br/> 
                    <span className="underline hover:text-gray-200/80 hover:cursor-pointer" onClick={onSwitch}> die Erstellungsansicht zu wechseln.</span>
                </span>
            </div>
        </Alert>

    );
}

export default Warning;