'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendSupportConfirm, sendSupportToUrent } from "@/lib/mail";
import { useState } from "react";
import toast from "react-hot-toast";


const SupportContactFormular = () => {

    const [currentEmail, setCurrentEmail] = useState("");
    const [currentTitle, setCurrentTitle] = useState("");
    const [currentContent, setCurrentContent] = useState("");

    const onSend = async () => {
        try {
            const values = {
                title : currentTitle,
                email : currentEmail,
                content : currentContent
            }
            
            await sendSupportToUrent(values);
            
            await sendSupportConfirm(currentEmail);
            
            setCurrentEmail("");
            setCurrentTitle("");
            setCurrentContent("");
            toast.success("Deine Anfrage wurde erfolgreich versendet. Wir melden uns so schnell wie möglich bei dir.", {
                duration: 10000
            });
        } catch(e : any) {
            console.log(e);
            toast.error("Es ist ein Fehler aufgetreten. Bitte versuche es erneut.");
        }
    }

    return ( 
        <div className="flex flex-col space-y-8 px-4">
            <div>
                <Label className="text-sm">
                    Deine Email-Adresse*
                </Label>
                <Input 
                className="w-full bg-[#191919] rounded-md dark:border-none"
                value={currentEmail}
                onChange={(e) => setCurrentEmail(e.target.value)}
                maxLength={100}
                />
            </div>
            <div>
                <Label className="text-sm">
                    Thema*
                </Label>
                <Input 
                className="w-full bg-[#191919] rounded-md dark:border-none"
                value={currentTitle}
                onChange={(e) => setCurrentTitle(e.target.value)}
                maxLength={100}
                />
            </div>
            <div>
                <Label>
                    Nachricht*
                </Label>
                <Textarea className="bg-[#191919] rounded-md dark:border-none h-[400px]"
                value={currentContent}
                onChange={(e) => setCurrentContent(e.target.value)}
                maxLength={2000} />
            </div>
            <div className="mt-4 ml-auto">
                <Button className="bg-indigo-800 hover:bg-indigo-900 hover:text-gray-300 text-gray-200" disabled={!currentContent || !currentEmail || !currentTitle}
                onClick={onSend}
                >
                    Supportanfrage schicken
                </Button>
            </div>
            <div className="text-xs text-gray-200/60 whitespace-nowrap">
                * Alle Angaben werden vertraulich behandelt und nicht an Dritte weitergegeben.
                Nach Prüfung deiner Anfrage werden, wir uns so schnell wie möglich bei dir melden.
            </div>
        </div>
     );
}
 
export default SupportContactFormular;