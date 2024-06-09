import getCurrentUser from "@/actions/getCurrentUser";

import { eq } from "drizzle-orm";
import { notification } from "@/db/schema";
import db from "@/db/drizzle";
import { Label } from "@/components/ui/label";



const AgbsPage = async () => {

    const currentUser = await getCurrentUser();

    const foundNotifications = await db.query.notification.findMany({
        where: (
            eq(notification.userId, currentUser?.id)
        )

    })

    return (
        <div>


            <div className="flex justify-center sm:p-8 bg-[#404040]/10">

                <div className="sm:w-[1044px] w-full dark:bg-[#1c1c1c] rounded-md bg-white">
                    <div className="  min-h-screen">
                        <div className="p-4 mt-4  rounded-lg ">
                            <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center">
                                Allgemeinen Geschäftsbedingungen für uRent
                            </h3>
                            <div className="px-8 mt-4">
                                <div>
                                    <h1 className="text-md font-semibold">
                                        Geltungsbereich
                                    </h1>
                                    <div className="text-sm">
                                        Die nachfolgenden Allgemeinen Geschäftsbedingungen (AGB) <br /> regeln die Vertragsbeziehungen zwischen der uRent UG, Straße,
                                        42659 Solingen (im Folgenden "uRent"), <br />
                                        sowie den Nutzern des von uRent betriebenen Internetportals https://www.urent-rental.de (im Folgenden "Plattform").
                                    </div>
                                    <h1 className="text-md font-semibold mt-4">
                                        Kontaktdaten
                                    </h1>
                                    <div className="text-sm">
                                        Telefon: x <br />
                                        Telefax: x <br />
                                        E-Mail: support@urent-rental.de <br />
                                    </div>
                                    <div className="mt-2 text-sm">
                                        Abweichende Geschäftsbedingungen der Nutzer finden keine Anwendung.
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h1 className="text-md font-semibold">
                                        Leistungsbeschreibung
                                    </h1>
                                    <div className="text-sm mt-2">
                                        <Label className="font-semibold">
                                            1. Inserate veröffentlichen
                                        </Label>
                                        <div>
                                            Nutzer, die als Vermieter auftreten, haben die Möglichkeit, Inserate auf der uRent-Plattform zu veröffentlichen.
                                            Um Inserate zu veröffentlichen, ist der Erwerb eines uRent-Plans erforderlich. <br />
                                            Diese Pläne können durch ein kostenpflichtiges Abonnement oder durch den Einsatz eines Gutscheincodes erworben werden. <br />
                                            Die Pläne bieten zusätzliche Vorteile, wie zum Beispiel die Priorisierung von Inseraten in den Suchergebnissen
                                            oder die farbliche Hervorhebung der Inserate, um die Sichtbarkeit zu erhöhen. <br />
                                            uRent tritt dabei niemals selbst als Vermieter auf, sondern stellt lediglich die Plattform zur Verfügung.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-2">
                                        <Label className="font-semibold">
                                            2. Kommunikation
                                        </Label>
                                        <div>
                                            uRent stellt einen integrierten Chatdienst zur Verfügung, der die direkte Kommunikation zwischen Mietern und Vermietern ermöglicht.<br />
                                            Dieser Chatdienst dient dazu,
                                            Fragen zu klären und Besichtigungstermine oder Übergaben zu vereinbaren, um den Vermittlungsprozess zu erleichtern.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-2">
                                        <Label className="font-semibold">
                                            3. Personalisierung
                                        </Label>
                                        <div>
                                            Nutzer haben die Möglichkeit, ihre Profile individuell zu gestalten und anzupassen. <br />
                                            Die Personalisierung des Profils ermöglicht eine ansprechende und informative Darstellung,
                                            die potenzielle Mieter oder Vermieter anspricht und die Chancen auf eine erfolgreiche Vermittlung erhöht.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-2">
                                        <Label className="font-semibold">
                                            4. Werbung und Promotion
                                        </Label>
                                        <div>
                                            uRent veröffentlicht die Inserate der Nutzer auf der Plattform und versucht diese aktiv zu bewerben,
                                            um eine größtmögliche Reichweite zu erzielen. <br />
                                            Durch gezielte Werbung und Promotion wird die Sichtbarkeit der Inserate erhöht,
                                            wodurch eine größere Anzahl potenzieller Mieter angesprochen wird.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-2">
                                        <Label className="font-semibold">
                                            5. Suchfunktionen
                                        </Label>
                                        <div>
                                            Mieter können die Suchergebnisse auf der Plattform mithilfe einer Schlagwort- oder Titel-Suche spezifizieren und sortieren. <br />
                                            Darüber hinaus besteht die Möglichkeit,
                                            die Suche durch die Angabe spezifischer Attribute weiter zu verfeinern, um genauere und relevantere Ergebnisse zu erhalten
                                        </div>
                                    </div>

                                    <div className="text-sm mt-2">
                                        <Label className="font-semibold">
                                            6. Automatisierte Systeme
                                        </Label>
                                        <div>
                                            <div>
                                                uRent bietet verschiedene automatisierte Systeme zur Unterstützung der Nutzer. Dazu gehören: <br/>
                                            </div>
                                            <div className="mt-2">
                                            <p className="font-medium">Newsletter Mails: </p>  
                                            Nutzer können sich für den Newsletter anmelden, 
                                            um regelmäßig Informationen über neue Inserate und Angebote zu erhalten. <br/>
                                            </div>
                                            <div className="mt-2">
                                            <p className="font-medium">Speichern von Suchen:</p> 
                                            Mieter können ihre Suchen speichern und bei Bedarf erneut darauf zugreifen.  <br/>
                                            </div>
                                            <div className="mt-2">
                                            <p className="font-medium"> Informationen zu gespeicherten Suchen:</p> 
                                            Nutzer nach Bedarf, 
                                            Benachrichtigungen und Updates zu ihren gespeicherten Suchen erhalten, 
                                            um stets auf dem neuesten Stand zu bleiben <br/>
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

export default AgbsPage;