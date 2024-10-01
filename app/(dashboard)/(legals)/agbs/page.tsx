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
                            <div className="sm:px-8 mt-4">
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
                                                uRent bietet verschiedene automatisierte Systeme zur Unterstützung der Nutzer. Dazu gehören: <br />
                                            </div>
                                            <div className="mt-2">
                                                <p className="font-medium">Newsletter Mails: </p>
                                                Nutzer können sich für den Newsletter anmelden,
                                                um regelmäßig Informationen über neue Inserate und Angebote zu erhalten. <br />
                                            </div>
                                            <div className="mt-2">
                                                <p className="font-medium">Speichern von Suchen:</p>
                                                Mieter können ihre Suchen speichern und bei Bedarf erneut darauf zugreifen.  <br />
                                            </div>
                                            <div className="mt-2">
                                                <p className="font-medium"> Informationen zu gespeicherten Suchen:</p>
                                                Nutzer nach Bedarf,
                                                Benachrichtigungen und Updates zu ihren gespeicherten Suchen erhalten,
                                                um stets auf dem neuesten Stand zu bleiben <br />
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
                                            uRent tritt niemals selbst als Anbieter auf und wird niemals Vertragspartei eines solchen Miet- und Dienstleistungsvertrages. <br />
                                            Die Funktion uRent ist die einer Präsentation, des Inserates vergleichbar mit einem Schaufenster.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 flex items-center gap-x-2" >
                                        <Label className="font-semibold">
                                            2.3
                                        </Label>
                                        <div>
                                            Die Anzeigen der Vermieter sind nicht zwinglich verbindliche Angebote. <br />
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
                                            Die Erstellung eines Nutzerkontos auf der Plattform setzt die Zustimmung zu diesen AGB voraus. <br />
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
                                            oder die anderweitig rechtswidrig sind oder gegen die guten Sitten verstoßen, sind unzulässig. <br />
                                            Der Nutzer ist verpflichtet, seine Zugangsdaten geheim zu halten und vor dem Zugriff unbefugter Dritter zu schützen. <br />
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
                                            uRent haftet nicht für falsche oder irreführende Angaben, die von Nutzern veröffentlicht werden. <br />
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
                                            Der Vermieter verpflichtet sich, inhaltlich richtige und vollständige Angaben zu den von ihm angebotenen Inseraten zu machen.<br />
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
                                            uRent ist nicht verpflichtet, die veröffentlichten Inhalte zu überwachen oder zu prüfen. <br />
                                            Die Verantwortung für die Richtigkeit und Rechtmäßigkeit der Inhalte liegt ausschließlich beim Vermieter.
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h1 className="text-md font-semibold">
                                        6. Urheberrechte
                                    </h1>
                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                            6.1
                                        </Label>
                                        <div>
                                            Der Nutzer versichert, dass er über alle erforderlichen Rechte an den von ihm hochgeladenen Inhalten verfügt
                                            oder entsprechende Genehmigungen eingeholt hat,
                                            um diese Inhalte auf der Plattform zu veröffentlichen.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                            6.2
                                        </Label>
                                        <div>
                                            Inhalte, die gegen Urheberrechte verstoßen, sind auf der Plattform nicht zulässig. <br />
                                            Der Nutzer stellt die Plattformbetreiber
                                            von allen Ansprüchen Dritter frei, die aufgrund einer solchen Verletzung erhoben werden könnten.
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h1 className="text-md font-semibold">
                                        7. Beleidigende und irreführende Inhalte
                                    </h1>
                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                            7.1
                                        </Label>
                                        <div>
                                            Es ist untersagt, Inhalte zu veröffentlichen, die beleidigend, diskriminierend,
                                            diffamierend oder in irgendeiner Weise unangemessen sind.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                            7.2
                                        </Label>
                                        <div>
                                            Irreführende Informationen sind verboten. Der Nutzer verpflichtet sich,
                                            keine falschen oder irreführenden Angaben zu machen und keine Inhalte zu veröffentlichen,
                                            die andere Nutzer täuschen könnten.
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h1 className="text-md font-semibold">
                                        8. Sanktionen bei Verstößen
                                    </h1>
                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                            8.1
                                        </Label>
                                        <div>
                                            Bei Verstößen gegen diese Bestimmungen behält sich die Plattform das Recht vor,
                                            Inhalte ohne Vorankündigung zu löschen und den betreffenden Nutzer vorübergehend oder dauerhaft zu sperren.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                            8.2
                                        </Label>
                                        <div>
                                            Der Plattformbetreiber behält sich zudem das Recht vor, rechtliche Schritte einzuleiten,
                                            sollten die veröffentlichten Inhalte gegen geltendes Recht verstoßen oder Rechte Dritter verletzen.
                                        </div>
                                    </div>


                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                            8.3
                                        </Label>
                                        <div>
                                            Wird ein Nutzer ausgeschlossen, ist es ihm untersagt, den Dienst weiterhin zu nutzen,
                                            neue Accounts zu registrieren oder als Dritter in Erscheinung zu treten.
                                        </div>
                                    </div>

                                </div>

                                <div className="mt-8">
                                    <h1 className="text-md font-semibold">
                                        9. Nutzungsverhalten der Nutzer
                                    </h1>
                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                            9.1
                                        </Label>
                                        <div>
                                            Es ist den Nutzern untersagt, sich in einer Weise zu verhalten,
                                            die gegen geltende Gesetze verstößt oder als rechtswidrig einzustufen ist.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                            9.2
                                        </Label>
                                        <div>
                                            Belästigendes Verhalten gegenüber anderen Nutzern oder Dritten ist strengstens untersagt. <br />
                                            Dazu zählen insbesondere,
                                            aber nicht ausschließlich, Beleidigungen, Bedrohungen, Stalking und Diskriminierung jeglicher Art.
                                        </div>
                                    </div>


                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                            9.3
                                        </Label>
                                        <div>
                                            Jegliches Verhalten, das der Plattform uRent schadet oder den Betrieb der Plattform behindert,
                                            ist untersagt. Dazu zählen insbesondere Cyberangriffe, das Verbreiten von Viren,
                                            Malware oder anderen schädlichen Programmen sowie übermäßige Belastung der Infrastruktur der Plattform.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                            9.4
                                        </Label>
                                        <div>
                                            Die Nutzung der Plattform zu Werbezwecken ohne ausdrückliche Zustimmung von uRent ist untersagt. <br />
                                            Dazu zählt auch die Verbreitung von Spam, unerwünschten Werbenachrichten und kommerziellen Angeboten.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                            9.5
                                        </Label>
                                        <div>
                                            Verhalten, das das Interesse der Mieter schädigt, ist untersagt. <br />
                                            Dies umfasst irreführende oder falsche Angaben zu den angebotenen Mietobjekten,
                                            unlautere Geschäftspraktiken sowie jegliche Handlungen, die das Vertrauen der Mieter in die Plattform untergraben könnten.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                            9.6
                                        </Label>
                                        <div>
                                            Die Vervielfältigung und Kopie von Inhalten, die auf uRent erstellt wurden,
                                            ist ohne die ausdrückliche Zustimmung des jeweiligen Eigentümers nicht gestattet. <br />
                                            Dazu zählen insbesondere, aber nicht ausschließlich, Texte, Bilder, Videos und sonstige multimediale Inhalte.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                            9.7
                                        </Label>
                                        <div>
                                            Der Nutzer verpflichtet sich, die Plattform nur in einer Weise zu nutzen, die den allgemeinen Nutzungsbedingungen
                                            und den geltenden gesetzlichen Vorschriften entspricht. <br />
                                            Verstöße gegen diese Bestimmungen können rechtliche Konsequenzen nach sich ziehen.
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h1 className="text-md font-semibold">
                                        10. Meldeverfahren, Support & Kontaktmöglichkeitenr
                                    </h1>
                                    <div className="text-sm mt-4  items-center gap-x-2">
                                        <Label className="font-semibold">
                                            10.1 Kundenservice
                                        </Label>
                                        <div>
                                            Der Kundenservice von uRent ist für alle Nutzer kostenlos und steht zur Verfügung,
                                            um bei Fragen oder Problemen zu helfen.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4  items-center gap-x-2">
                                        <Label className="font-semibold">
                                            10.2 Meldesystem
                                        </Label>
                                        <div>
                                            uRent verfügt über ein eigenes Meldesystem, das es sowohl angemeldeten als auch nicht angemeldeten Nutzern ermöglicht,
                                            Inhalte zu melden,
                                            die gegen die AGBs oder geltende Rechte verstoßen. <br />
                                            Dieses Meldesystem gewährleistet die Anonymität der meldenden Nutzer,
                                            und uRent teilt niemals Meldedaten oder persönliche Informationen. <br />
                                            Nutzer, die wiederholt Inhalte unbegründet oder falsch melden,
                                            können von der Nutzung des Meldesystems  temporär ausgeschlossen werden, um Missbrauch vorzubeugen.
                                        </div>
                                    </div>


                                    <div className="text-sm mt-4 items-center gap-x-2">
                                        <Label className="font-semibold">
                                            10.3 Beschwerdeantworten
                                        </Label>
                                        <div>
                                            Nutzer haben das Recht, Beschwerdeantworten anzufechten, indem sie direkt mit uRent in Kontakt treten, beispielsweise per E-Mail. <br />
                                            uRent verpflichtet sich, Beschwerden so lange zu bearbeiten und zu beantworten,
                                            wie es die Kapazitäten erlauben. Beschwerden werden zeitnah und ernsthaft behandelt,
                                            um eine zufriedenstellende Lösung zu finden. <br />
                                            Durch die Implementierung dieses Meldeverfahrens stellt uRent sicher, dass die Plattform sauber,
                                            sicher und im Einklang mit den geltenden Richtlinien und Gesetzen bleibt. <br />
                                            Unsere oberste Priorität liegt darin, eine positive und vertrauenswürdige Umgebung für alle Nutzer zu schaffen.
                                        </div>
                                    </div>








                                </div>

                                <div className="mt-8">
                                    <h1 className="text-md font-semibold">
                                        11. Digitale Produkte und Abonnements
                                    </h1>
                                    <div className="text-sm mt-4  items-center gap-x-2">
                                        <Label className="font-semibold">
                                            11.1 Produktinhalte
                                        </Label>

                                        <div className="px-4">
                                            <div>
                                                <Label className="font-semibold">
                                                    11.1.1 Funktionsumfang {`"`}Basis{`"`} Abonnement
                                                </Label>
                                                <div className="">
                                                    Das Abonnementpaket „Basis“ umfasst die Grundfunktionen der Plattform,
                                                    das Veröffentlichen von Anzeigen und die Verwaltung der inbegriffenen Daten. <br />
                                                    Diese Funktionen beinhalten alle weiteren Abonnements.
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                <Label className="font-semibold">
                                                    11.1.2 Funktionsumfang {`"`}Priorisierung bei der Suche{`"`}
                                                </Label>
                                                <div className="">
                                                    Die in Abonnement-Paket {`"`}Premium{`"`} und {`"`}Enterprise{`"`} enthaltene Funktion
                                                    {`"`}Priorisierung bei der Suche{`"`} beinhaltet
                                                    die bevorzugte Positionierung von
                                                    {`"`}Premium/Enterprise{`"`} -Inseraten auf der Startseite und beim Anzeigen
                                                    von Ergebnissen durch Nutzung des Suchfilters.  <br />
                                                    Inserate von Premium- und Enterprise Kunden werden dabei als gleichwertig betrachtet. <br />
                                                    Die vorrangige Positionierung findet nur statt, wenn keine manuelle Sortierung der Inserate vorgenommen wurde.
                                                </div>
                                            </div>

                                            <div className="mt-2">
                                                <Label className="font-semibold">
                                                    11.1.3 Funktionsumfang {`"`}farbliche Hervorhebung{`"`}
                                                </Label>
                                                <div className="">
                                                    Die im Abonnement {`"`}Premium{`"`} und {`"`}Enterprise{`"`} enthaltene Funktion
                                                    {`"`}farbliche Hervorhebung{`"`} beinhaltet die anpassbare, von Inseraten von Basis-Abonnement Kunden differenzierte, <br />
                                                    farbliche Umrandung von {`"`}Premium/Enterprise{`"`} -Inseraten
                                                    auf der Startseite und beim Anzeigen von Ergebnissen durch Nutzung des Suchfilters.
                                                </div>
                                            </div>

                                            <div className="mt-2">
                                                <Label className="font-semibold">
                                                    11.1.4  Funktionsumfang {`"`}farbliche Hervorhebung{`"`}
                                                </Label>
                                                <div className="">
                                                Die im Abonnement {`"`}Enterprise{`"`} enthaltene Funktion 
                                                {`"`}Premium-Anbieter Betriebsstempel{`"`} umfasst eine deutlich sichtbares Feld mit der Inschrift 
                                                {`"`}Premium Vermieter{`"`} oberhalb der Vermieter-Infobox in der detaillierten Inseratsansicht
                                                </div>
                                            </div>

                                            <div className="mt-2">
                                                <Label className="font-semibold">
                                                    11.1.5  Funktionsumfang {`"`}uRent Mieter- & Buchungsverwaltungssystem{`"`}
                                                </Label>
                                                <div className="">
                                                Die im Abonnement {`"`}Enterprise{`"`} enthaltene Funktion {`"`}uRent Mieter- & Buchungsverwaltungssystem{`"`} 
                                                umfasst eine weitreichende Funktionserweiterung 
                                                zur Darstellung und Verwaltung von Verfügbarkeiten und Buchungen, 
                                                sowie des kompletten persönlichen Vermietungsgeschehens.  
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="text-sm mt-4  items-center gap-x-2">
                                        <Label className="font-semibold">
                                            11.2 Preiszusammensetzung
                                        </Label>
                                        <div>
                                            Der Preis der Abonnements „Basis, Premium und Enterprise“ setzt sich aus der Verrechnung
                                            des Standardpreis des jeweiligen Abonnements
                                            mit der Pauschale der gewählten Anzahl an Inseraten,
                                            die der Nutzer maximal schalten kann, zusammen. <br />
                                            Beim Aufwerten ({`"`}Upgraden{`"`}) eines Abonnements zahlt der Nutzer einmalig die Different vom alten
                                            zum neuen Preis um den Geltungsbereich des Vertrags bis zum wiederkehrenden Abbuchungsdatum aufrecht zu erhalten.
                                        </div>
                                    </div>


                                    <div className="text-sm mt-4 items-center gap-x-2">
                                        <Label className="font-semibold">
                                            11.3 Abbuchungsintervalle
                                        </Label>
                                        <div>
                                            Ab dem Datum des Vertragsabschluss wird wiederkehrend monatlich der vertragliche Preis
                                            des jeweiligen Abonnement abgebucht und der Vertrag verlängert. <br />
                                            Beim Aufwerten („Upgraden“) eines Abonnements bleibt weiterhin das Abbuchungsdatum des vorherigen Vertrages geltend. <br />
                                            Dies gilt ebenso für die Änderung der Vertragsbedingungen bei Herabstufung („Downgraden“) eines Abonnements.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 items-center gap-x-2">
                                        <Label className="font-semibold">
                                            11.4 Abstufung des Abonnements durch den Nutzer
                                        </Label>
                                        <div>
                                            Wenn durch eine Abstufung („Downgraden“) des Abonnements weniger
                                            Inserate zugelassen sind als bereits veröffentlicht, werden zufällig der Anzahl entsprechend, Inserate privat geschalten.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 items-center gap-x-2">
                                        <Label className="font-semibold">
                                            11.5 Kündigung durch den Nutzer
                                        </Label>
                                        <div>
                                            Der Nutzer hat das Recht, sein Abonnement jederzeit über sein Dashboard zu kündigen. <br />
                                            Durch die Nutzung der entsprechenden Option im Dashboard kann der Nutzer sein Abonnement ohne zusätzliche Bestätigung
                                            oder Genehmigung von uRent beenden.<br />
                                            Die Kündigung wird zum Ende des laufenden Abrechnungszeitraums wirksam,
                                            und der Nutzer behält bis zum Auslauf seines Abonnements weiterhin Zugang zu allen gebuchten
                                            Vorteilen und Funktionen gemäß den Bedingungen seines Abonnements. <br />
                                            Es liegt in der Verantwortung des Nutzers sicherzustellen,
                                            dass alle offenen Zahlungen beglichen sind und keine ausstehenden Verpflichtungen bestehen,
                                            bevor die Kündigung wirksam wird. Nach der Kündigung des Abonnements behält sich uRent das Recht vor,
                                            alle damit verbundenen Daten und Inhalte des Nutzers gemäß den geltenden Datenschutzbestimmungen zu verwalten oder zu löschen.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 items-center gap-x-2">
                                        <Label className="font-semibold">
                                            11.6 Vertragsauslauf bei Zahlungsaussetzung
                                        </Label>
                                        <div>
                                            Sollte der Nutzer die vereinbarten Zahlungen für die Nutzung der uRent-Dienste aussetzen
                                            oder nicht fristgerecht leisten, behält sich uRent das Recht vor, die Funktionen des Abonnements des Nutzers
                                            einzuschränken oder zu deaktivieren, bis die Zahlungen vollständig beglichen sind. <br />
                                            In einem solchen Fall wird der Zugang zu den zusätzlichen Funktionen und Vorteilen,
                                            die durch das Abonnement gewährt werden, vorübergehend eingestellt. <br />
                                            Der Nutzer verpflichtet sich, sämtliche ausstehenden Zahlungen sowie etwaige anfallende Verzugszinsen oder
                                            Inkassokosten zu begleichen, um die volle Nutzung der uRent-Dienste wiederherzustellen.
                                            Die Aussetzung der Abonnement-Funktionen befreit den Nutzer nicht von seiner grundlegenden Nutzung der uRent-Dienste,
                                            jedoch werden zusätzliche Vorteile und Funktionen durch das Abonnement vorübergehend eingeschränkt.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4  items-center gap-x-2">
                                        <Label className="font-semibold">
                                            11.7 Vertragsabschluss und Dokumentation
                                        </Label>

                                        <div className="px-4">
                                            <div>
                                                <Label className="font-semibold">
                                                    11.7.1 Rechnungsausstellung
                                                </Label>
                                                <div className="">
                                                    uRent stellt sämtliche Rechnungen ausschließlich online bereit. <br />
                                                    Nach Abschluss einer Bestellung erhält der Nutzer eine digitale Rechnung per E-Mail.
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                <Label className="font-semibold">
                                                    11.7.2 Vertragsabschluss
                                                </Label>
                                                <div>
                                                    Ein Vertrag zwischen dem Nutzer und uRent kommt zustande, sobald uRent die Bestellung des Nutzers bestätigt
                                                    und die Zahlung erfolgreich über unseren Zahlungsdienstleister Stripe abgewickelt wurde.
                                                </div>
                                            </div>

                                            <div className="mt-2">
                                                <Label className="font-semibold">
                                                    11.7.3 Zahlungsabwicklung mit Stripe
                                                </Label>
                                                <div className="">
                                                    Die Autorisierung und Abwicklung von Zahlungen erfolgt durch Stripe. <br />
                                                    uRent übernimmt keine Haftung für Probleme oder Aussetzer des Drittanbieters Stripe.
                                                </div>
                                            </div>

                                            <div className="mt-2">
                                                <Label className="font-semibold">
                                                    11.7.4  Einverständnis durch AGB-Akzeptanz
                                                </Label>
                                                <div className="">
                                                    Durch das Abonnieren eines Plans oder das Einlösen eines Gutscheincodes
                                                    erklärt der Nutzer sein ausdrückliches Einverständnis mit den vorliegenden Allgemeinen Geschäftsbedingungen
                                                    (AGB) von uRent.
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="text-sm mt-4 items-center gap-x-2">
                                        <Label className="font-semibold">
                                            11.8 Bereitstellung von digitalen Produkten und Abonnements
                                        </Label>
                                        <div>
                                            Wir bei uRent streben danach, eine nahtlose Bereitstellung unserer digitalen Produkte und Abonnements
                                            sicherzustellen. <br />
                                            Trotz unserer Bemühungen können jedoch aufgrund technischer Probleme Verzögerungen oder
                                            sogar Ausfälle auftreten. In solchen Fällen möchten wir unsere Nutzer ermutigen,
                                            unseren Support zu kontaktieren. Unser Support-Team steht unter support@urent-rental.de zur Verfügung und ist bereit,
                                            Ihnen bei jeglichen Problemen oder Fragen behilflich zu sein. Unsere oberste Priorität liegt dabei auf Ihrer Zufriedenheit,
                                            und wir setzen alles daran, sicherzustellen,
                                            dass Sie die bestmögliche Erfahrung mit unseren digitalen Produkten und Abonnements machen.
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h1 className="text-md font-semibold">
                                        12. Meldeverfahren, Support & Kontaktmöglichkeitenr
                                    </h1>
                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <div>
                                            Die Datenschutzrichtlinien von uRent sind unter urent-rental.de/data-privacy zu finden.
                                            Diese Richtlinien legen fest, wie uRent personenbezogene Daten sammelt, verwendet,
                                            speichert und schützt. Wir empfehlen allen Nutzern, die Datenschutzrichtlinien sorgfältig zu lesen,
                                            um ein Verständnis dafür zu erhalten, wie ihre Daten behandelt werden. <br />
                                            Bei Fragen oder Bedenken zum Datenschutz steht unser Datenschutzteam
                                            gerne zur Verfügung und ist unter support@urent-rental.de erreichbar.
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h1 className="text-md font-semibold">
                                        13. Haftung des Nutzers
                                    </h1>
                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                        13.1
                                        </Label>
                                        <div>
                                        Der Nutzer haftet für sämtliche Schäden, die aufgrund von falschen Angaben, 
                                        unrichtigen Informationen oder anderweitigen Verstößen gegen die Nutzungsbedingungen von uRent entstehen. <br/>
                                        Der Nutzer trägt die volle Verantwortung für die Inhalte, die er auf der Plattform veröffentlicht. Fehlerhafte oder irreführende 
                                        Angaben können zu Schäden bei anderen Nutzern oder Dritten führen.
                                        </div>
                                    </div>
                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                        13.2
                                        </Label>
                                        <div>
                                        Der Nutzer ist verpflichtet, sicherzustellen, dass die von ihm veröffentlichten Inhalte korrekt, 
                                        aktuell und vollständig sind. <br/>
                                        Der Nutzer ist verantwortlich dafür, sämtliche geltenden Gesetze und Vorschriften einzuhalten, insbesondere im Zusammenhang 
                                        mit der Veröffentlichung von Inseraten und der Kommunikation mit anderen Nutzern.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                        13.3
                                        </Label>
                                        <div>
                                        Der Nutzer verpflichtet sich, uRent von jeglichen Ansprüchen Dritter freizustellen, 
                                        die aufgrund von Handlungen oder Unterlassungen des Nutzers entstehen, 
                                        einschließlich, aber nicht beschränkt auf die Verletzung von Rechten Dritter oder Verstöße gegen geltendes Recht. <br/>
                                        Der Nutzer muss uRent von jeglichen Ansprüchen Dritter freistellen, die aufgrund seiner Handlungen oder Unterlassungen entstehen.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                        13.4
                                        </Label>
                                        <div>
                                        Der Nutzer haftet insbesondere für die Richtigkeit, 
                                        Vollständigkeit und Rechtmäßigkeit der von ihm veröffentlichten Inhalte, 
                                        einschließlich Texte, Bilder, Links oder Kommentare. <br/>
                                        Die Haftung des Nutzers umfasst insbesondere die Richtigkeit, Vollständigkeit und Rechtmäßigkeit der von ihm veröffentlichten Inhalte.
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h1 className="text-md font-semibold">
                                    14 Haftungsausschluss uRent 
                                    </h1>
                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                        14.1
                                        </Label>
                                        <div>
                                        uRent ist eine Plattform, die es Nutzern ermöglicht, Inserate zu veröffentlichen und zu suchen. <br/>
                                        uRent steht in keiner Verbindung mit den Inseraten und übernimmt keine Verantwortung für die Richtigkeit, 
                                        Vollständigkeit, Qualität oder Rechtmäßigkeit der Inserate.
                                        </div>
                                    </div>
                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                        14.2
                                        </Label>
                                        <div>
                                        uRent überprüft Inserate nicht systematisch oder regelmäßig auf ihre Richtigkeit oder Qualität. <br/>
                                        Es obliegt den Nutzern, die Inserate zu prüfen und zu bewerten.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                        14.3
                                        </Label>
                                        <div>
                                        uRent ist nicht verantwortlich für eventuelle Schäden oder Verluste, 
                                        die aus der Nutzung oder dem Vertrauen auf die Inserate auf der Plattform entstehen.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                        14.4
                                        </Label>
                                        <div>
                                        uRent übernimmt keine Haftung für Inhalte, die von Nutzern oder Dritten auf der Plattform veröffentlicht werden, 
                                        einschließlich, aber nicht beschränkt auf Texte, Bilder, Links oder Kommentare.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                        14.5
                                        </Label>
                                        <div>
                                        uRent behält sich das Recht vor, Inserate zu entfernen oder zu bearbeiten, 
                                        die gegen die Nutzungsbedingungen oder geltende Gesetze verstoßen. Die Entscheidung von uRent ist endgültig und bindend.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                        14.6
                                        </Label>
                                        <div>
                                        Nutzer können uRent über verdächtige oder unangemessene Inserate informieren. <br/>
                                        uRent reagiert auf solche Meldungen pflichtgemäß und im Rahmen seiner Möglichkeiten, 
                                        behält sich jedoch das Recht vor, nicht auf jede einzelne Meldung zu reagieren.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                        14.7
                                        </Label>
                                        <div>
                                        uRent übernimmt keine Haftung für die Verfügbarkeit und Funktionalität der Plattform. <br/>
                                        Die Nutzung der Plattform erfolgt auf eigenes Risiko des Nutzers.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                        14.8
                                        </Label>
                                        <div>
                                        uRent behält sich das Recht vor, die Plattform jederzeit und ohne Vorankündigung zu ändern, zu aktualisieren,
                                         zu erweitern oder einzustellen. Die Nutzer werden über wesentliche Änderungen informiert.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                        14.9
                                        </Label>
                                        <div>
                                        Die Haftung von uRent für direkte oder indirekte Schäden, 
                                        die aus der Nutzung oder dem Vertrauen auf die Plattform entstehen, ist ausgeschlossen, soweit dies gesetzlich zulässig ist.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                        14.10
                                        </Label>
                                        <div>
                                        Die vorstehenden Haftungsausschlüsse gelten auch zugunsten der gesetzlichen Vertreter,
                                         Mitarbeiter und Erfüllungsgehilfen von uRent.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                        14.11
                                        </Label>
                                        <div>
                                        Der Vermieter haftet für die Einhaltung aller relevanten gesetzlichen Bestimmungen und Vorschriften, 
                                        einschließlich, aber nicht beschränkt auf Fahrzeugsicherheit , Steuerpflichten und Sicherheitsstandards.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 items-center gap-x-2">
                                        <Label className="font-semibold text-md">
                                        *** Wichtig ***
                                        </Label>
                                        <div>
                                        - uRent übernimmt keine Gewährleistung und Haftung für die Richtigkeit, 
                                        Vollständigkeit, Qualität oder Rechtmäßigkeit der Inserate.
                                        </div>
                                        <div className="mt-2">
                                        - Nutzer sollten Inserate sorgfältig prüfen und bei Bedenken Kontakt mit uRent aufnehmen.
                                        </div>
                                        <div className="mt-2">
                                        - uRent behält sich das Recht vor, unangemessene oder verdächtige Inserate zu entfernen oder zu bearbeiten.
                                        </div>
                                        <div className="mt-2">
                                        - Die Haftung von uRent ist in gesetzlich zulässigem Umfang ausgeschlossen.
                                        </div>
                                        <div className="mt-2">
                                        - Diese Haftungsausschlüsse gelten auch für die gesetzlichen Vertreter, Mitarbeiter und Erfüllungsgehilfen von uRent. 
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h1 className="text-md font-semibold">
                                    15 Beendigung des Nutzungsvertrages 
                                    </h1>
                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                        15.1
                                        </Label>
                                        <div>
                                        Der Nutzungsvertrag zwischen dem Nutzer und uRent kann von 
                                        beiden Seiten jederzeit ohne Angabe von Gründen gekündigt werden.
                                        </div>
                                    </div>
                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                        15.2
                                        </Label>
                                        <div>
                                        Die Kündigung des Nutzungsvertrages erfolgt durch eine schriftliche Mitteilung an die jeweils andere Vertragspartei. <br/>
                                        Die Kündigung kann auch durch die Nutzung der entsprechenden 
                                        Optionen im Nutzerkonto oder durch Kontaktaufnahme mit dem Support-Team erfolgen.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                        15.3
                                        </Label>
                                        <div>
                                        Die Kündigung des Nutzungsvertrages führt zur Beendigung des Zugangs des Nutzers zu den Diensten von 
                                        uRent und zur Einstellung aller damit verbundenen Leistungen und Funktionen.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                        15.4
                                        </Label>
                                        <div>
                                        Nach Beendigung des Nutzungsvertrages behält uRent sich das Recht vor, alle vom Nutzer veröffentlichten 
                                        Inhalte zu entfernen oder zu bearbeiten, sofern dies erforderlich ist.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                        15.5
                                        </Label>
                                        <div>
                                        Die Beendigung des Nutzungsvertrages befreit den Nutzer nicht 
                                        von bestehenden Zahlungsverpflichtungen gegenüber uRent.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                        15.6
                                        </Label>
                                        <div>
                                        uRent behält sich das Recht vor, den Nutzungsvertrag ohne Vorankündigung zu kündigen 
                                        oder den Zugang des Nutzers zu den Diensten zu beschränken oder zu sperren, wenn der Nutzer 
                                        gegen die Nutzungsbedingungen verstößt oder die Sicherheit der Plattform gefährdet.
                                        </div>
                                    </div>

                                    <div className="text-sm mt-4 flex items-center gap-x-2">
                                        <Label className="font-semibold">
                                        15.7
                                        </Label>
                                        <div>
                                        Die Kündigung des Nutzungsvertrages berührt nicht die Wirksamkeit bereits erfolgter Handlungen oder getroffener Vereinbarungen, 
                                        die vor dem Zeitpunkt der Kündigung erfolgt sind.
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h1 className="text-md font-semibold">
                                    16 Anpassung der Nutzungsbedingungen und permanenter digitaler Produkte  
                                    </h1>
                                    <div className="mt-2 text-sm">
                                    uRent behält sich das Recht vor, diese Nutzungsbedingungen jederzeit zu ändern. <br/>
                                    Solche Änderungen werden dem Nutzer in Textform (meist per E-Mail) innerhalb einer angemessenen Frist mitgeteilt.<br/>
                                     Diese Frist beträgt für gewerbliche Nutzer mindestens 30 Tage vor dem vorgeschlagenen Zeitpunkt des Inkrafttretens der Änderungen. <br/>
                                    Die vorgeschlagenen Änderungen treten nur in Kraft, wenn der Nutzer ihnen wie folgt zustimmt: <br/><br/>

                                    Bei wesentlichen Änderungen bittet uRent den Nutzer um ausdrückliche Zustimmung. <br/>
                                    Eine wesentliche Änderung liegt vor, wenn sie das bestehende Verhältnis zwischen Leistung und Gegenleistung 
                                    erheblich verändert oder einem neuen Vertrag gleichkommt. <br/>
                                    Änderungen aufgrund gesetzlicher Vorgaben, 
                                    gerichtlicher Entscheidungen oder einstweiliger Verfügungen gelten nicht als wesentlich. <br/><br/>

                                    Sind die vorgeschlagenen Änderungen nicht wesentlich, 
                                    gilt die Zustimmung des Nutzers als erteilt, sofern dieser nicht innerhalb der vorgeschlagenen Frist 
                                    in Textform (z.B. per E-Mail) widerspricht. <br/>
                                    Der Nutzer behält das Recht, bis zum vorgeschlagenen Zeitpunkt des Inkrafttretens der Änderungen fristlos zu kündigen,
                                     sofern er diesen nicht zustimmt. uRent weist den Nutzer in der Mitteilung 
                                     über die Änderungen ausdrücklich auf sein Widerspruchsrecht, 
                                    die Frist dafür und die Konsequenzen der Nichtwahrnehmung 
                                    dieses Rechts sowie die Möglichkeit zur Kündigung hin. <br/><br/>

                                    Die geänderten Nutzungsbedingungen werden zusätzlich auf der Website von uRent veröffentlicht. <br/><br/>

                                    Im Fall permanenter digitaler Produkte behält sich uRent das Recht vor, Änderungen vorzunehmen, 
                                    um Sicherheit, Nutzererfahrung und Leistung der uRent-Dienste zu verbessern. <br/>
                                    Dem Nutzer entstehen dadurch keine zusätzlichen Kosten. <br/>
                                    uRent wird den Nutzer klar und verständlich über solche Änderungen informieren. <br/><br/>

                                    Bei Änderungen, die die Zugriffsmöglichkeit des Nutzers auf das Produkt oder dessen Nutzbarkeit erheblich beeinträchtigen,
                                     informiert uRent den Nutzer innerhalb angemessener Frist vor dem Zeitpunkt der Änderung mittels eines dauerhaften Datenträgers 
                                     (z.B. per E-Mail) über Art und Zeitpunkt der Änderungen sowie das Kündigungsrecht des Nutzers. <br/>
                                    Der Nutzer kann in solchen Fällen innerhalb von 30 Tagen kostenfrei kündigen. <br/><br/>
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