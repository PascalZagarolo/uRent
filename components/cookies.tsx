'use client'

import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CookiesDialog = () => {

    const router = useRouter()

    const cAccepted = JSON.parse(localStorage.getItem("cookiesAccepted"));

    const [accepted, setAccepted] = useState(cAccepted || false);
    
    localStorage.setItem('cookiesAccepted', accepted.toString());

    const onClick = () => {
        setAccepted(true);
        toast.success("Einstellungen gespeichert!");
        router.refresh();
    }


    return (
        <Dialog open={!cAccepted}>
            <DialogContent className="dark:bg-[#0F0F0F] dark:border-none">
                <DialogHeader>
                    <DialogTitle className="flex text-lg font-medium">
                        Bevor sie zu <p className="font-semibold px-1">uRent</p> fortfahren
                    </DialogTitle>
                </DialogHeader>
                <div className="h-[320px] overflow-auto whitespace-pre-wrap text-sm">
                    Willkommen bei uRent! <br/> <br/>
                    Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern und Ihnen personalisierte 
                    Inhalte und Anzeigen bereitzustellen. <br/>
                    Cookies sind kleine Textdateien, die auf Ihrem Computer oder Mobilgerät 
                    gespeichert werden, wenn Sie unsere Website besuchen.<br/> 
                    Indem Sie auf &quot;Akzeptieren&quot; klicken, stimmen Sie der 
                    Verwendung von Cookies gemäß unserer Cookie-Richtlinie zu. Sie können Ihre Cookie-Einstellungen jederzeit ändern, 
                    indem Sie die Einstellungen Ihres Browsers anpassen.
                    <br/>
                    <br/>
                    Hier sind die Arten von Cookies, die wir verwenden: <br/> <br/>

                    Notwendige Cookies: Diese Cookies sind für das reibungslose Funktionieren unserer Website unerlässlich. 
                    Sie ermöglichen grundlegende Funktionen wie die Navigation auf der Website und den Zugriff auf geschützte Bereiche. <br/> <br/>

                    Leistungs-Cookies: Diese Cookies sammeln Informationen darüber, wie Besucher unsere Website nutzen, 
                    z. B. welche Seiten sie am häufigsten besuchen und ob sie Fehlermeldungen von Webseiten erhalten. 
                    Diese Cookies sammeln keine Informationen, die einen Besucher identifizieren. Alle Informationen, die diese Cookies sammeln, 
                    sind aggregiert und daher anonym. <br/> <br/>

                    Funktionalitäts-Cookies: Diese Cookies ermöglichen es unserer Website, sich an von Ihnen getroffene Entscheidungen 
                    (wie z. B. Benutzernamen, Sprache oder Region, in der Sie sich befinden) 
                    zu erinnern und erweiterte, personalisierte Funktionen bereitzustellen. <br/> <br/>

                    Targeting-/Werbungs-Cookies: Diese Cookies werden verwendet, um Werbung zu schalten, die für Sie relevanter ist. 
                    Sie werden auch verwendet, um die Anzahl der Anzeigenaufrufe und die Effektivität von Werbekampagnen zu messen. 
                    Diese Cookies werden normalerweise von Werbenetzwerken mit unserer Erlaubnis platziert.

                    Durch die Nutzung unserer Website erklären Sie sich mit der Verwendung von Cookies gemäß dieser Cookie-Richtlinie einverstanden.
                     Wenn Sie nicht möchten, dass Cookies auf Ihrem Gerät gespeichert werden, können Sie Ihre Browsereinstellungen entsprechend anpassen.
                      Bitte beachten Sie jedoch, dass das Deaktivieren von Cookies die Funktionalität unserer Website beeinträchtigen kann. <br/> <br/>

                    Vielen Dank für Ihr Verständnis und Ihre Zustimmung zur Verwendung von Cookies. <br/> <br/>

                    Bei Fragen oder Bedenken kontaktieren Sie uns bitte unter <br/> support@urent-rental.de
                </div>
                <div className="space-x-2 w-full flex">
                    <Button className="bg-blue-800 hover:bg-blue-600 text-gray-100 font-semibold w-1/4" onClick={onClick}>
                        Akzeptieren
                    </Button>
                    <Button variant="ghost" className="w-3/4">
                        Weitere Informationen zum Datenschutz
                    </Button>
                </div>
                <div className="w-full flex justify-evenly text-xs">
                    <a href="/impressum" className="hover:underline">
                        Impressum
                    </a>
                    <a href="/data-privacy" className="hover:underline">
                        Datenschutz
                    </a>
                    <a href="/" className="hover:underline">
                        AGBs
                    </a>
                    
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default CookiesDialog;