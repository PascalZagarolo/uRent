
import db from "@/db/drizzle";
import HeaderLogo from "../../_components/header-logo";
import getCurrentUser from "@/actions/getCurrentUser";
import { notification } from "@/db/schema";
import { eq } from "drizzle-orm";
import { TruckIcon } from "lucide-react";
import MobileHeader from "../../_components/mobile-header";
import getCurrentUserWithNotifications from "@/actions/getCurrentUserWithNotifications";

const DataPrivacy = async () => {





    return (

        <div>


            <div className="flex justify-center sm:p-8 bg-[#404040]/10">

                <div className="sm:w-[1044px] w-full dark:bg-[#1c1c1c] rounded-md bg-white">
                    <div className="  min-h-screen">
                        <div className="p-4 mt-4  rounded-lg ">
                            <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center">
                                Datenschutzerklärung uRent UG <p className="ml-auto text-sm"> (15.06.2024) </p>
                            </h3>
                        </div>



                        <div className="p-8 text-sm dark:text-gray-300/90">

                            <div className="p-4">
                                <h1 className="font-semibold text-lg underline">
                                    1. Anwendungsbereich
                                </h1>
                                <div className="">
                                    Die hier aufgeführte Datenschutzerklärung ist für die Nutzung der Website
                                    und App uRent-rental.de sowie der uRent App.
                                    Unabhängig davon wie sie die Produkte (Website, App) aufrufen.
                                    Wir behalten uns das Recht vor die Datenschutzerklärung jederzeit zu ändern.
                                    Über jeweilige Änderungen werden sie über E-Mail informiert.
                                </div>

                                <h1 className="font-semibold text-lg underline mt-4">
                                    2. Verantwortliche
                                </h1>
                                <div className="">
                                    Die uRent UG  ist Betreiber des Services und der Produkte und
                                    verantwortlich im Sinne der Datenschutzgrundverordnung (DSGVO).
                                </div>


                                <h1 className="font-semibold text-lg underline mt-4">
                                    3. Welche Daten wir speichern und verarbeiten
                                </h1>
                                <div className="">
                                    Die hier aufgeführte Datenschutzerklärung ist für die Nutzung der Website
                                    und App uRent-rental.de sowie der uRent App.
                                    Unabhängig davon wie sie die Produkte (Website, App) aufrufen.
                                    Wir behalten uns das Recht vor die Datenschutzerklärung jederzeit zu ändern.
                                    Über jeweilige Änderungen werden sie über E-Mail informiert.
                                </div>

                                <h1 className="font-semibold text-lg underline mt-4">
                                    3. Welche Daten wir speichern und verarbeiten
                                </h1>
                                <div className="">
                                    Wir speichern personenbezogene Daten wenn sie unsere Produkte nutzen,
                                    Sie ein Konto erstellen, wenn sie uRent Informationen senden z.B.
                                    Webformular und wenn sie ihr Konto mit Informationen füllen.

                                    <div className="p-4">
                                        <h1 className="font-semibold text-base">
                                            3.1. Personenbezogene Datensätze welche gespeichert werden
                                        </h1>
                                        <div className="px-4 space-y-2">
                                            <div>
                                                - Daten  welche zu ihrer Identifikation führen, wie anonymisierter Benutzername,
                                                Anschrift, Telefonnummer und Email Adresse.
                                                Wobei das angeben einer Email Adresse verpflichtend ist um ihr Konto zu verifizieren.
                                            </div>
                                            <div>
                                                - Inhalte die sie über unser Chat Tool austauschen
                                            </div>
                                            <div className="flex flex-row gap-x-1">
                                                - Zahlungsdaten werden durch unseren Partner Stripe verarbeitet die entsprechende Datenschutzerklärung finden sie
                                                <a className="underline" target="_blank" href={"https://stripe.com/de/privacy"}>
                                                    hier
                                                </a>
                                            </div>
                                            <div>
                                                - Bei Meldung bezüglich einer Beschwerde werden folgende Daten an uns übermittelt:
                                                Anonymisierter Benutzername,
                                                Email Adresse sowie der Grund für die Beschwerde welcher über das Webformular von ihnen abgesendet wird.
                                            </div>
                                            <div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4">
                                        <h1 className="font-semibold text-base">
                                            3.2. Personenbezogene Datensätze welche automatisch gespeichert werden
                                        </h1>
                                        <div className="px-4 space-y-2">
                                            <div>
                                                - Daten welche durch Cookies und ähnlichen Technologien erhoben werden. 
                                                Diese Datensätze enthalten Geräte- und Nutzungsbezogene Informationen.
                                            </div>
                                            <div>
                                                - Daten zu Inseraten und Seiten welche sie aufrufen dazu zählt Dauer, Zeitpunkt und Häufigkeit. 
                                            </div>
                                            <div className="flex flex-row gap-x-1">
                                                - Daten zu ihrem persönlichen Werbeinteraktionsverhalten dazu zählt: welchen Inhalt sie sehen, wie häufig sie 
                                                damit in Verbindung gekommen 
                                                sind und wie sie damit interagieren.z.B. Transaktion über uRent als Vermittler.
                                                
                                            </div>
                                            <div>
                                                - Geräte bezogene Daten: Dazu zählt Gerät (Modell, Betriebssystem, Version, Typ.) 
                                                sowie eine individuelle Geräte ID 
                                                um diese zuordnen zu können, sowie Cookie bezogene Daten dazu zählt z.B die Cookie ID 
                                            </div>
                                            <div>
                                                - IP-Adresse von welcher das gerät auf uRent zugreifen kann.
                                            </div>
                                            <div>
                                            - Ungefähre Standortdaten durch die IP sowie genaue Standortdaten um die Suche von Inseraten einzugrenzen.
                                            </div>
                                            <div>
                                            - Daten welche Suchaufträge sie freigegeben haben und welche Inserate sie gespeichert haben.
                                            </div>
                                            <div>

                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>



                        </div>


                    </div>



                </div>


            </div>
        </div>

    );
}

export default DataPrivacy;