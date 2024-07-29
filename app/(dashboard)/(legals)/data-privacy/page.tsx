
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
                                <div >
                                    Die uRent UG  ist Betreiber des Services und der Produkte und
                                    verantwortlich im Sinne der Datenschutzgrundverordnung (DSGVO).
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


                                    <h1 className="font-semibold text-lg underline mt-4">
                                        4. Rechtsgrundlage und Zweck der Datenverarbeitung   Rechtsgrundlage und Zweck der Datenverarbeitung
                                    </h1>
                                    <div className="">
                                        Wir verarbeiten Ihre personenbezogenen Daten aus verschiedenen Gründen
                                        und basierend auf unterschiedlichen Rechtsgrundlagen, die eine solche Verarbeitung zulassen.
                                        Ihre Daten werden unter anderem genutzt, um unsere Dienstleistungen bereitzustellen und zu verbessern,
                                        Ihnen ein personalisiertes Nutzungserlebnis auf unserer Website zu bieten, Sie bezüglich Ihres uRent-Kontos
                                        und unserer Dienstleistungen zu kontaktieren, Kundensupport zu leisten, Ihnen maßgeschneiderte Werbung und
                                        Marketingmitteilungen zu schicken sowie betrügerische oder illegale Aktivitäten zu erkennen, zu verhindern,
                                        zu begrenzen und zu untersuchen. Zu diesen Zwecken teilen wir
                                        Ihre Daten auch mit Dritten (einschließlich unserer Auftragsverarbeiter)

                                        <div className="mt-2">
                                            Wir verarbeiten Ihre personenbezogenen Daten, um den Vertrag, den wir mit Ihnen geschlossen haben, zu erfüllen und Ihnen
                                            unsere Dienstleistungen bereitzustellen (Art. 6 Abs. 1 lit. b) DSGVO). Dies umfasst folgende Zwecke:

                                            <div className="p-4 space-y-2">
                                                <div>
                                                    - Bereitstellung und Nutzung unserer Dienstleistungen (einschließlich Abrechnung),
                                                    insbesondere zur Veröffentlichung und zum Teilen von Anzeigen, Profilen und anderen
                                                    Inhalten des Nutzers. Zudem umfasst dies die Vermittlung des Kontakts zu anderen Nutzern
                                                    mit passenden Angeboten, die Messung und Verbesserung der Qualität und des Erfolgs unserer
                                                    Dienstleistungen, die Sicherstellung der Sicherheit und Einsatzbereitschaft unserer Services
                                                    sowie die
                                                    Anpassung des Website- und Service-Inhalts basierend auf Ihren Aktivitäten, um Ihnen relevante Inhalte zu bieten.
                                                </div>
                                                <div>
                                                    - Bereitstellung und Nutzung unserer Dienstleistungen (inklusive Abrechnung),
                                                    insbesondere zur Veröffentlichung und zum Teilen von Anzeigen, Profilen und anderen
                                                    Inhalten der Nutzer. Zudem umfasst dies die Vermittlung des Kontakts zu anderen Nutzern
                                                    mit passenden Angeboten, die Messung und Verbesserung der Qualität und des Erfolgs unserer Dienstleistungen,
                                                    die Sicherstellung der Sicherheit und Einsatzbereitschaft unserer Dienstleistungen
                                                    sowie die Anpassung des Inhalts der Website und Services basierend auf Ihren Aktivitäten,
                                                    um Ihnen relevante Inhalte präsentieren zu können.
                                                </div>
                                                <div>
                                                    - Die Zahlung über uRent wird durch unseren kooperierenden Zahlungsdienstleister
                                                    „Stripe“ geleistet. Diese verarbeiten Ihre Daten zur Erfüllung des mit Ihnen geschlossenen
                                                    Vertrags sowie zur Erfüllung ihrer gesetzlichen Verpflichtungen. Die entsprechende Datenschutzerklärung finden sie hier.
                                                </div>
                                                <div>
                                                    - Verhinderung, Erkennung, Eindämmung und Untersuchung von rechtswidrigen Handlungen,
                                                    die Ihre lebenswichtigen Interessen oder die lebenswichtigen Interessen einer
                                                    anderen natürlichen Person gefährden könnten, sofern keine entsprechende gesetzliche Verpflichtung bereits besteht
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <h1 className="font-semibold text-lg underline mt-4">
                                        5. Löschung und Speicherdauer von Daten
                                    </h1>
                                    <div>
                                        Wir und unsere Dienstleister speichern Ihre personenbezogenen Daten gemäß den geltenden Datenschutzgesetzen, solange dies für die in dieser Datenschutzerklärung genannten Zwecke erforderlich ist. Weitere Informationen zu den Verarbeitungszwecken finden
                                        Sie unter {`"`}Zwecke und Rechtsgrundlagen der Datenverarbeitung{`"`}.
                                        Nach Ablauf dieser Zeiträume löschen wir Ihre personenbezogenen Daten gemäß
                                        unseren Richtlinien zur Datenaufbewahrung und -löschung oder anonymisieren sie ordnungsgemäß.
                                        Eine Ausnahme gilt, wenn wir gesetzlich verpflichtet sind, Ihre personenbezogenen Daten länger aufzubewahren (z.B. zur Erfüllung rechtlicher Pflichten oder für Steuer-, Buchhaltungs- und Prüfzwecke). In Europa betragen die üblichen Aufbewahrungsfristen zwischen 6 und 10 Jahren (z.B. für Verträge, Mitteilungen und Geschäftsbriefe). Wenn gesetzlich zulässig oder erforderlich, schränken wir die Verarbeitung Ihrer Daten ein, anstatt sie zu löschen (z.B. durch Sperrung). Dies gilt insbesondere, wenn wir die betreffenden Daten noch für die weitere Vertragsabwicklung, Rechtsverfolgung oder Rechtsverteidigung benötigen oder ihre Aufbewahrung anderweitig gesetzlich vorgeschrieben oder erlaubt ist. Die maßgeblichen Kriterien für die Dauer der Einschränkung der Verarbeitung sind dann die gesetzlichen Verjährungs- bzw. Aufbewahrungsfristen. Nach Ablauf dieser Fristen werden die betreffenden Daten gelöscht.
                                        Die spezifischen Aufbewahrungsfristen für personenbezogene Daten sind in unseren Richtlinien zur Datenaufbewahrung dokumentiert.
                                        Die Dauer der Speicherung personenbezogener Daten kann je nach den von uns angebotenen Services und unseren gesetzlichen Verpflichtungen
                                        gemäß dem jeweiligen nationalen Recht variieren. Die folgenden Faktoren beeinflussen typischerweise die Speicherdauer:
                                        <div className="p-4 space-y-2">
                                            <div>
                                                <div className="font-semibold">
                                                    1. Erforderlichkeit für die Bereitstellung unserer Services:
                                                </div>
                                                <div>
                                                    Dazu zählen die Durchführung des Nutzungsvertrags mit Ihnen,
                                                    die Aufrechterhaltung und Verbesserung der Leistungsfähigkeit unserer Services, die Gewährleistung
                                                    der Sicherheit unserer Systeme und die Pflege korrekter Geschäfts-
                                                    und Finanzdokumente. Auf dieser Grundlage werden die meisten unserer Aufbewahrungsfristen festgelegt.
                                                </div>
                                            </div>

                                            <div>
                                                <div className="font-semibold">
                                                    2. Besondere Kategorien personenbezogener Daten:
                                                </div>
                                                <div>
                                                2. Bei der Speicherung besonderer Kategorien personenbezogener Daten 
                                                (z.B. rassische und ethnische Herkunft, politische Meinungen, religiöse Überzeugungen, Gewerkschaftszugehörigkeit, genetische Daten, 
                                                biometrische Daten, Gesundheitsdaten oder Daten zum Sexualleben oder der sexuellen Orientierung) 
                                                ist eine verkürzte Aufbewahrungsfrist in der Regel angemessen.
                                                </div>
                                            </div>

                                            <div>
                                                <div className="font-semibold">
                                                3. Einwilligungsbasierte Verarbeitung personenbezogener Daten:
                                                </div>
                                                <div>
                                                Verarbeiten wir personenbezogene Daten auf Basis einer Einwilligung 
                                                (einschließlich Einwilligung in die verlängerte Speicherung), speichern wir die Daten für den Zeitraum, der 
                                                für die Verarbeitung entsprechend Ihrer Einwilligung erforderlich ist.
                                                </div>
                                            </div>

                                            <div>
                                                <div className="font-semibold">
                                                4. Gesetzliche, vertragliche oder andere Verpflichtungen:
                                                </div>
                                                <div>
                                                Entsprechende Aufbewahrungspflichten können sich aus Gesetzen oder behördlichen Anordnungen 
                                                ergeben. Zudem kann es notwendig sein, personenbezogene Daten im Hinblick auf laufende oder zukünftige 
                                                Rechtsstreitigkeiten zu speichern. Personenbezogene Daten, die in Verträgen, Mitteilungen und Geschäftsbriefen enthalten sind,
                                                 können je nach nationalem Recht gesetzlichen Aufbewahrungspflichten unterliegen.
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
        </div>

    );
}

export default DataPrivacy;