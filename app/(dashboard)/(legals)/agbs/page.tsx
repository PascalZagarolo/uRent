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
                                        42659 Solingen (im Folgenden {`"`}uRent{`"`}), <br />
                                        sowie den Nutzern des von uRent betriebenen Internetportals https://www.urent-rental.de 
                                        (im Folgenden {`"`}Plattform{`"`}).
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
                                <div className="mt-8">
                                    <h1 className="text-md font-semibold">
                                        2. Vertragsbeziehungen
                                    </h1>
                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                            2.1
                                        </Label>
                                        <div>
                                        Auf der Plattform können private und gewerbliche Anbieter Inserate zur Vermietung von Fahrzeugen und Logistik schalten.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                            2.2
                                        </Label>
                                        <div>
                                        uRent tritt niemals selbst als Anbieter auf und wird niemals Vertragspartei eines solchen Miet- und Dienstleistungsvertrages. <br/> 
                                        Die Funktion uRent ist die einer Präsentation, des Inserates vergleichbar mit einem Schaufenster.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 flex items-center gap-x-2" >
                                        <Label className="font-semibold">
                                            2.3
                                        </Label>
                                        <div>
                                        Die Anzeigen der Vermieter sind nicht zwinglich verbindliche Angebote. <br/>
                                        Vielmehr handelt es sich um Einladung an potentielle Kunden, 
                                        welche die Kontaktaufnahme anleiten und zur bessern Planung des Mietgeschehens beitragen sollen. 
                                        </div>
                                    </div>

                                    

                                    

                                    
                                </div>
                                
                                <div className="mt-8">
                                    <h1 className="text-md font-semibold">
                                        3. Anmeldung und Kontoerstellung
                                    </h1>
                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                            3.1
                                        </Label>
                                        <div>
                                        Die Erstellung eines Nutzerkontos auf der Plattform setzt die Zustimmung zu diesen AGB voraus. <br/>
                                        Der Nutzer verpflichtet sich, sich selbständig über die AGB zu informieren.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                            3.2
                                        </Label>
                                        <div>
                                        Die Anmeldung ist nur volljährigen und unbeschränkt geschäftsfähigen Personen erlaubt. 
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                            3.3
                                        </Label>
                                        <div>
                                        Der Nutzer verpflichtet sich, bei der Registrierung wahrheitsgemäße, vollständige und aktuelle Angaben zu machen. 
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 flex items-center gap-x-2" >
                                        <Label className="font-semibold">
                                            3.4
                                        </Label>
                                        <div>
                                        Benutzernamen, die Rechte Dritter verletzen, insbesondere Namens- oder Kennzeichenrechte, 
                                        oder die anderweitig rechtswidrig sind oder gegen die guten Sitten verstoßen, sind unzulässig. <br/>
                                        Der Nutzer ist verpflichtet, seine Zugangsdaten geheim zu halten und vor dem Zugriff unbefugter Dritter zu schützen. <br/>
                                        Sollte der Nutzer feststellen oder den Verdacht haben, 
                                        dass seine Zugangsdaten verloren gegangen sind oder von Dritten missbräuchlich genutzt werden, ist uRent unverzüglich zu informieren.
                                        </div>
                                    </div> 
                                </div>

                                <div className="mt-8">
                                    <h1 className="text-md font-semibold">
                                       4. Inhalte und Rechte Dritter
                                    </h1>
                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                            4.1
                                        </Label>
                                        <div>
                                        Der Nutzer versichert, dass die von ihm auf der Plattform veröffentlichten Inhalte keine Rechte Dritter, insbesondere Urheber-, Marken-, Persönlichkeits- oder sonstige Schutzrechte verletzen.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                            4.2
                                        </Label>
                                        <div>
                                        Es ist untersagt, Inhalte hochzuladen oder zu veröffentlichen, die gegen geltendes Recht verstoßen oder in irgendeiner Form unzulässig sind.  
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 flex items-center gap-x-2" >
                                        <Label className="font-semibold">
                                            4.3
                                        </Label>
                                        <div>
                                        uRent haftet nicht für falsche oder irreführende Angaben, die von Nutzern veröffentlicht werden. <br/>
                                        Die Verantwortung für die Richtigkeit und Rechtmäßigkeit der Inhalte liegt ausschließlich beim Nutzer. 
                                        </div>
                                    </div> 
                                </div>

                                <div className="mt-8">
                                    <h1 className="text-md font-semibold">
                                       5. Richtigkeit der Angaben
                                    </h1>
                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                            5.1
                                        </Label>
                                        <div>
                                        Der Vermieter verpflichtet sich, inhaltlich richtige und vollständige Angaben zu den von ihm angebotenen Inseraten zu machen.<br/> 
                                        Dies umfasst insbesondere die Beschreibung der Attribute und Eigenschaften der angebotenen Objekte.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                            5.2
                                        </Label>
                                        <div>
                                        Der Vermieter ist verpflichtet, die Angaben zu aktualisieren, sobald Änderungen auftreten, 
                                        um sicherzustellen, dass alle Informationen stets korrekt und aktuell sind.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 flex items-center gap-x-2" >
                                        <Label className="font-semibold">
                                            5.3
                                        </Label>
                                        <div>
                                        uRent ist nicht verpflichtet, die veröffentlichten Inhalte zu überwachen oder zu prüfen. <br/>
                                         Die Verantwortung für die Richtigkeit und Rechtmäßigkeit der Inhalte liegt ausschließlich beim Vermieter.
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