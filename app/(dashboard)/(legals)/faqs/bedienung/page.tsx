import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const MieterFaq = () => {
    return (
        <div>

            <div className="flex justify-center sm:p-8 bg-[#404040]/10">

                <div className="sm:w-[1044px] w-full dark:bg-[#1c1c1c] rounded-md bg-white">
                    <div className="  min-h-screen">
                        <div className="sm:p-4 p-2 mt-4  rounded-lg ">
                            <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center">
                                Bedienungshilfe uRent - FAQ
                            </h3>
                            <div className="pb-2">
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="/faqs">Faqs</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>Bedienungshilfe</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </div>

                            <div className="mt-4 p-4">
                                <h1 className="font-medium text-lg">
                                    Inserate erstellen/verwalten:
                                </h1>
                                <div>
                                    <Accordion type="single" collapsible className="text-sm">

                                        <AccordionItem value="item-2">
                                            <AccordionTrigger>Wie erstelle ich ein Inserat?</AccordionTrigger>
                                            <AccordionContent>
                                                Auf der Startseite finden Sie oben links einen Button, mit dem Sie ein
                                                neues Inserat erstellen können.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-3">
                                            <AccordionTrigger>Wie lösche ich ein Inserat?</AccordionTrigger>
                                            <AccordionContent>
                                                Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts.
                                                Dort finden Sie Ihre Inserate im Dashboard unter „Meine Inserate“.
                                                Sie können nun Ihre Inserate bearbeiten, löschen und die Verfügbarkeit ändern.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-4">
                                            <AccordionTrigger>Wie ändere ich die Verfügbarkeit von einem Fahrzeug?</AccordionTrigger>
                                            <AccordionContent>
                                                Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts.
                                                Dort finden Sie Ihre Inserate im Dashboard unter „Meine Inserate“.
                                                Sie können nun Ihre Inserate bearbeiten, löschen und die Verfügbarkeit ändern.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-5">
                                            <AccordionTrigger>Wo kann ich meine Inserate bearbeiten?</AccordionTrigger>
                                            <AccordionContent>
                                                Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts.
                                                Dort finden Sie Ihre Inserate im Dashboard unter „Meine Inserate“.
                                                Sie können nun Ihre Inserate bearbeiten, löschen und die Verfügbarkeit ändern.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-6">
                                            <AccordionTrigger>Wann werden meine angegebenen Kontaktinformationen
                                                öffentlich angezeigt?</AccordionTrigger>
                                            <AccordionContent>
                                                Die Kontaktinformationen, die Sie beim Erstellen oder Bearbeiten
                                                eines Inserats angeben, werden öffentlich gezeigt. Sie können dies ändern,
                                                wenn Sie das Inserat im Dashboard unter „Meine Inserate“ bearbeiten und die Kontakt
                                                Angaben entfernen.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-7">
                                            <AccordionTrigger>Was genau sind Flotteninserate?</AccordionTrigger>
                                            <AccordionContent>
                                                Flotteninserate sind für den Fall gedacht, indem Sie mehrere Fahrzeuge des gleichen
                                                Typs, mit den gleichen Fahrzeugattributen besitzen. Ein Flotteninserat darf allerdings
                                                auch nur in diesem Fall angewandt werden. Für den Vermieter erscheinen die Fahrzeuge in
                                                einem Inserat, allerdings lassen sich weiterhin Verfügbarkeiten und Buchungen für jedes
                                                einzelne Fahrzeug verwalten. Dazu wählen Sie bei „Inserat erstellen“ unter Art des Inserats
                                                „Flotteninserat“ aus und geben dann die Anzahl an identischen Fahrzeugen an.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-71">
                                            <AccordionTrigger>Wie kann ich ein Inserat auswählen, damit es bei der Suche priorisiert wird?
                                                </AccordionTrigger>
                                            <AccordionContent>
                                           Wenn Sie das Abonnement „Premium“ oder {'"'}Enterprise{'"'} besitzen, 
                                            klicken Sie auf der Startseite auf Ihr Profilbild oben rechts. <br/>
                                            Dort finden Sie Ihre Inserate im Dashboard unter {'"'}Meine Inserate{'"'}. <br/>
                                             Dort sehen Sie zunächst,
                                             wie viele Inserate dem Abonnement entsprechend hervorgehoben werden können. <br/>
                                             Suchen Sie anschließend ein Inserat, das veröffentlicht werden soll und klicken Sie links neben 
                                             „Inserat bearbeiten“ auf {'"'}Hervorheben{'"'}. <br/>
                                             Die hervorgehobenen Inserate und finden Sie oben auf der Seite, dort kann auch eine
                                             gewünschte Farbe ausgewählt werden und eine Hervorhebung wieder entfernt werden.
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            </div>

                            <div className="mt-4 p-4">
                                <h1 className="font-medium text-lg">
                                    Suchfilter:
                                </h1>
                                <div>
                                    <Accordion type="single" collapsible className="text-sm">
                                        <AccordionItem value="item-8">
                                            <AccordionTrigger>Wie füge ich ein Inserat zu meinen Favoriten hinzu?</AccordionTrigger>
                                            <AccordionContent>
                                                Wie Sie sich in der einzelnen Ansicht eines Inserats befinden,
                                                klicken Sie oben rechts auf „Anzeige vormerken“.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-9">
                                            <AccordionTrigger>Wo finde ich meine Favoriten?</AccordionTrigger>
                                            <AccordionContent>
                                                Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts.
                                                Dort finden Sie im Dashboard Ihre Favoriten.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-91">
                                            <AccordionTrigger>Wie kann ich eine Suche speichern und wo finde ich diese?</AccordionTrigger>
                                            <AccordionContent>
                                            Oben im Suchfilter finden Sie {'"'}Suche speichern{'"'}. Nachdem Sie die Suche benannt haben, 
                                            finden Sie diese oben rechts in der Kopfzeile unter dem zugehörigen Symbol.
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            </div>

                            <div className="mt-4 p-4">
                                <h1 className="font-medium text-lg">
                                    Mein Account:
                                </h1>
                                <div>
                                    <Accordion type="single" collapsible className="text-sm">
                                        <AccordionItem value="item-10">
                                            <AccordionTrigger>Wo kann ich mich abmelden?</AccordionTrigger>
                                            <AccordionContent>
                                                Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts.
                                                 Dort können Sie sich im untersten Punkt abmelden.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-11">
                                            <AccordionTrigger>Wo kann ich meinen Account verwalten?</AccordionTrigger>
                                            <AccordionContent>
                                                Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts 
                                                und dann auf „Einstellungen“. Dort können Sie unter „Account“ Ihren Account verwalten.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-12">
                                            <AccordionTrigger>Wie kann ich meine E-Mail ändern?</AccordionTrigger>
                                            <AccordionContent>
                                                Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts 
                                                und dann auf „Einstellungen“. Dort können Sie unter „Account“ 
                                                Ihre Emails ändern. Nach dem Ändern müssen Sie diese bestätigen.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-13">
                                            <AccordionTrigger>Wie kann ich meinen Nutzernamen ändern?</AccordionTrigger>
                                            <AccordionContent>
                                                Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts und
                                                 dann auf „Einstellungen“. Dort können Sie unter „Account“ Ihren Nutzernamen ändern.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-14">
                                            <AccordionTrigger>Wie kann ich meinen Vor- und Nachnamen ändern?</AccordionTrigger>
                                            <AccordionContent>
                                                Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts 
                                                und dann auf „Einstellungen“. Dort können Sie unter „Account“ 
                                                Ihren Vor- und Nachnamen ändern.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-15">
                                            <AccordionTrigger>Wie kann ich mein Passwort ändern?</AccordionTrigger>
                                            <AccordionContent>
                                                Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts
                                                 und dann auf „Einstellungen“. Dort können Sie unter „Sicherheit“ Ihr Passwort ändern.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-16">
                                            <AccordionTrigger>Wo kann ich meinen Account löschen?</AccordionTrigger>
                                            <AccordionContent>
                                            Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts und dann auf {`"`}Einstellungen{`"`}. <br/>
                                            Dort können Sie unter „Account“ Ihren Account löschen. <br/>
                                             Anschließend werden Sie zur Sicherheit noch eine E-Mail bekommen, 
                                            um das Löschen Ihres Accounts zu bestätigen, da der Vorgang unwiderruflich ist.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-17">
                                            <AccordionTrigger>Wie aktiviere oder deaktiviere ich die Zwei-Faktor Authentifizierung?</AccordionTrigger>
                                            <AccordionContent>
                                                Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts 
                                                und dann auf „Einstellungen“. Dort können Sie unter „Sicherheit“
                                                 die Zwei-Faktor Authentifizierung aus- oder abwählen.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-18">
                                            <AccordionTrigger>Wo kann ich meine persönliche Datennutzung einstellen?</AccordionTrigger>
                                            <AccordionContent>
                                                Klicken Sie auf der Startseite auf Ihr Profilbild oben 
                                                rechts und dann auf „Einstellungen“. Dort können Sie unter 
                                                „Privatsphäre“ Ihre persönliche Datennutzung verwalten.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-19">
                                            <AccordionTrigger>Wo kann ich meine öffentlich angezeigten Informationen verwalten?</AccordionTrigger>
                                            <AccordionContent>
                                                Klicken Sie auf der Startseite auf Ihr Profilbild oben 
                                                rechts und dann auf „Mein Profil“. Die dort angegebenen 
                                                Informationen werden für Nutzer bei Ihren Inseraten angezeigt.
                                                 Beachten Sie, dass diese keine privaten Informationen aus Ihrem Account
                                                  sind, sondern lediglich auf Ihr privates oder gewerbliches, öffentliches 
                                                  Vermietungs-Profil abzielen.
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            </div>

                            <div className="mt-4 p-4">
                                <h1 className="font-medium text-lg">
                                    Mein Profil verwalten:
                                </h1>
                                <div>
                                    <Accordion type="single" collapsible className="text-sm">
                                        <AccordionItem value="item-20">
                                            <AccordionTrigger>Wie und wozu stelle ich auf ein Gewerbe-Konto um?</AccordionTrigger>
                                            <AccordionContent>
                                                Damit Sie Fotos, eine Beschreibung, Standorte, Öffnungszeiten
                                                 und vieles mehr zu Ihrer Fahrzeugvermietung hochladen können, 
                                                 klicken Sie auf der Startseite auf Ihr Profilbild oben rechts 
                                                 und dann auf „Mein Profil“. Dort können Sie oben auf der Seite auf 
                                                 ein Gewerbe-Konto umstellen. Dieser Vorgang ist kostenlos.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-21">
                                            <AccordionTrigger>Wo kann ich meine öffentlich angezeigten Informationen verwalten?</AccordionTrigger>
                                            <AccordionContent>
                                                Klicken Sie auf der Startseite auf Ihr Profilbild 
                                                oben rechts und dann auf „Mein Profil“. Die dort angegebenen 
                                                Informationen werden für Nutzer bei Ihren Inseraten angezeigt. 
                                                Beachten Sie, dass diese keine privaten Informationen aus Ihrem Account sind, 
                                                sondern lediglich auf Ihr privates oder gewerbliches, öffentliches 
                                                Vermietungs-Profil abzielen.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-211">
                                            <AccordionTrigger>Wie kann ich ein Profilbild hinzufügen?</AccordionTrigger>
                                            <AccordionContent>
                                            Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts und dann auf „Mein Profil“. <br/>
                                            Dort können Sie oben links Ihr Profilbild hinzufügen, entfernen und bearbeiten.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-212">
                                            <AccordionTrigger>Wie kann ich die Informationen bearbeiten, 
                                                die für den Nutzer neben meinen Inseraten angezeigt werden?</AccordionTrigger>
                                            <AccordionContent>
                                            Alle Bilder und Infos, die bei Standort eingetragen werden, 
                                            sind die, die für die Nutzer neben den Inseraten sichtbar sind. <br/>
                                            Falls Sie mehrere Standorte haben, kann ein Standort als primär festgelegt werden.<br/>
                                             Dieser wird neben deinen Inseraten angezeigt, sowie in deinem Profil hervorgehoben.<br/> 
                                             Um einen Standort hinzuzufügen, klicken Sie auf der Startseite auf Ihr Profilbild oben rechts, 
                                            dann auf „Mein Profil“ und anschließend auf „Standort hinzufügen“.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-213">
                                            <AccordionTrigger>Wofür sind Standorte und wie füge ich sie hinzu?</AccordionTrigger>
                                            <AccordionContent>
                                            Alle Bilder und Infos, die bei Standort eingetragen werden, sind die, 
                                            die für die Nutzer neben den Inseraten sichtbar sind. <br/>
                                            Falls Sie mehrere Standorte haben, kann ein Standort als primär festgelegt werden. <br/>
                                            Dieser wird neben deinen Inseraten angezeigt, sowie in deinem Profil hervorgehoben.  <br/>
                                            Um einen Standort hinzuzufügen, klicken Sie auf der Startseite auf Ihr Profilbild oben rechts, 
                                            dann auf „Mein Profil“ und anschließend auf „Standort hinzufügen“.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-213">
                                            <AccordionTrigger>Wie kann ich Bilder hinzufügen, die Nutzer sehen, wenn sie mein Profil aufrufen?</AccordionTrigger>
                                            <AccordionContent>
                                            klicken Sie auf der Startseite auf Ihr Profilbild oben rechts und dann auf „Mein Profil“. <br/>
                                            Anschließend können Sie oben rechts die Bilder hinzufügen. Beachten Sie, 
                                            dass diese Bilder nicht neben den Inseraten angezeigt werden, sondern nur auf Ihrer Profilseite. 
                                            Andernfalls können Sie einen Standort erstellen. 
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            </div>

                            <div className="mt-4 p-4">
                                <h1 className="font-medium text-lg">
                                    Einstellungen:
                                </h1>
                                <div>
                                    <Accordion type="single" collapsible className="text-sm">
                                        <AccordionItem value="item-22">
                                            <AccordionTrigger>Wo finde ich meine Accounteinstellungen?</AccordionTrigger>
                                            <AccordionContent>
                                                Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts 
                                                und dann auf „Einstellungen“. Dort können Sie unter „Account“ Ihren Account verwalten.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-23">
                                            <AccordionTrigger>Wo finde ich meine Privatsphäre Einstellungen?</AccordionTrigger>
                                            <AccordionContent>
                                                Klicken Sie auf der Startseite auf Ihr Profilbild oben 
                                                rechts und dann auf „Einstellungen“. Dort finden Sie die Privatsphäre Einstellungen.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-24">
                                            <AccordionTrigger>Wo finde ich meine Sicherheitseinstellungen?</AccordionTrigger>
                                            <AccordionContent>
                                                Klicken Sie auf der Startseite auf Ihr Profilbild 
                                                oben rechts und dann auf „Einstellungen“. Dort finden Sie die Sicherheitseinstellungen.
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            </div>

                            <div className="mt-4 p-4">
                                <h1 className="font-medium text-lg">
                                    Dashboard:
                                </h1>
                                <div>
                                    <Accordion type="single" collapsible className="text-sm">
                                        <AccordionItem value="item-25">
                                            <AccordionTrigger>Was finde ich unter „Dashboard“?</AccordionTrigger>
                                            <AccordionContent>
                                                Das Dashboard dient zur allgemeinen Verwaltung 
                                                Ihrer Inserate, deren Verfügbarkeit, der Eintragung von Buchungen und vielem mehr.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-26">
                                            <AccordionTrigger>Wo finde ich „Buchungen“ und wie 
                                                kann ich es Nutzen?</AccordionTrigger>
                                            <AccordionContent>
                                                Klicken Sie auf der Startseite auf Ihr Profilbild 
                                                oben rechts und dann auf „Dashboard“. Sie können dort unter „Buchungen“ zu Ihren aktuell vermieteten Fahrzeugen Buchungsdaten hinzufügen, wie etwa den Mieter, Zeitraum.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-27">
                                            <AccordionTrigger>Wo kann ich meine Inserate verwalten?</AccordionTrigger>
                                            <AccordionContent>
                                            Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts. 
                                            Dort finden Sie Ihre Inserate im Dashboard unter „Meine Inserate“. 
                                            Sie können nun Ihre Inserate bearbeiten, löschen und die Verfügbarkeit ändern.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-28">
                                            <AccordionTrigger>Wo finde ich meine Favoriten?</AccordionTrigger>
                                            <AccordionContent>
                                                Klicken Sie auf der Startseite auf Ihr Profilbild 
                                                oben rechts und dann auf „Einstellungen“. Dort können 
                                                Sie unter „Favoriten“ Ihre Favoriten verwalten.
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            </div>

                            <div className="mt-4 p-4">
                                <h1 className="font-medium text-lg">
                                    Zahlungsverkehr:
                                </h1>
                                <div>
                                    <Accordion type="single" collapsible className="text-sm">
                                        <AccordionItem value="item-29">
                                            <AccordionTrigger>Wo kann ich meinen Zahlungsverkehr verwalten? </AccordionTrigger>
                                            <AccordionContent>Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts und dann auf „Dashboard“. 
                                                Sie können dort unter „Zahlungsverkehr“ alles zugehörige finden. </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-30">
                                            <AccordionTrigger>Wie ändere ich meine Zahlungsmethode? </AccordionTrigger>
                                            <AccordionContent>Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts und dann auf „Dashboard“. 
                                                Sie können dort unter „Zahlungsverkehr“ in Ihrem aktuellen Plan unter „Abo verwalten“ die Zahlungsmethode ändern. </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-31">
                                            <AccordionTrigger>Wie kann ich meinen Plan ändern? </AccordionTrigger>
                                            <AccordionContent>Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts und dann auf „Dashboard“. 
                                                Sie können dort unter „Zahlungsverkehr“ in Ihrem aktuellen Plan die „Plan ändern“ auswählen. </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-32">
                                            <AccordionTrigger>Wie kann ich meinen Plan kündigen? </AccordionTrigger>
                                            <AccordionContent>Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts und dann auf „Dashboard“. 
                                                Sie können dort unter „Zahlungsverkehr“ 
                                                in Ihrem aktuellen Plan unter „Abo verwalten“ Ihr Abonnementkündigen. </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value="item-321">
                                            <AccordionTrigger>Was wenn ich die dem Plan entsprechenden Funktionen nach dem Abonnieren nicht erhalten habe?  </AccordionTrigger>
                                            <AccordionContent> 
                                            Kontaktieren Sie den Kundensupport. Sie finden das Kontaktformular und unten auf der Startseite. 
                                            Wir werden uns so schnell wie möglich mit Ihnen in Verbindung setzen.  </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            </div>

                            <div className="mt-4 p-4">
                                <h1 className="font-medium text-lg">
                                    Kundensupport:
                                </h1>
                                <div>
                                    <Accordion type="single" collapsible className="text-sm">
                                        <AccordionItem value="item-33">
                                            <AccordionTrigger>Wo kann ich eine Nachricht an den Support schreiben? </AccordionTrigger>
                                            <AccordionContent>
                                            Sie finden das Impressum, die allgemeinen Nutzungsbedingungen, das Kontaktformular unten in der Fußzeile. 
                                            Dort können Sie anschließend Ihren Grund auswählen und zusätzlich eine Beschreibung hinzufügen.
                                            Sie können ausserdem auch direkt, eine Email an support@urent-rental.de senden. 
                                            Der Support wird sich umgehend um Ihr Problem kümmern. 
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            </div>

                            <div className="mt-4 p-4">
                                <h1 className="font-medium text-lg">
                                    Konversationen:
                                </h1>
                                <div>
                                    <Accordion type="single" collapsible className="text-sm">
                                        <AccordionItem value="item-34">
                                            <AccordionTrigger>Wie kann ich einen Nutzer melden? </AccordionTrigger>
                                            <AccordionContent>
                                            Wenn Sie unter Konversationen den entsprechenden Chat ausgewählt haben, 
                                            können Sie diesen oben rechts, 
                                            durch klicken auf die drei Punkte, melden. 
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-341">
                                            <AccordionTrigger>Wie kann ich einen Nutzer blockieren?  </AccordionTrigger>
                                            <AccordionContent>
                                            Wenn Sie unter Konversationen den entsprechenden Chat ausgewählt haben, 
                                            können Sie diesen oben rechts, 
                                            durch klicken auf die drei Punkte, blockieren.  
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-342">
                                            <AccordionTrigger>Wie kann ich einen blockierten Nutzer wieder freigeben?   </AccordionTrigger>
                                            <AccordionContent>
                                            Wenn Sie unter Konversationen den entsprechenden blockierten Chat ausgewählt haben,
                                             können Sie diesen oben rechts, durch klicken auf die drei Punkte, die Blockierung aufheben.  
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            </div>

                            <div className="mt-4 p-4">
                                <h1 className="font-medium text-lg">
                                    Impressum:
                                </h1>
                                <div>
                                    <Accordion type="single" collapsible className="text-sm">
                                        <AccordionItem value="item-35">
                                            <AccordionTrigger>Wo finde ich die allgemeinen Nutzungsbedingungen? </AccordionTrigger>
                                            <AccordionContent>
                                                Sie finden das Impressum, die allgemeinen Nutzungsbedingungen
                                                und die Datenschutzerklärung auf jeder Seite ganz unten, im Footer.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-36">
                                            <AccordionTrigger>Wo finde ich die Datenschutz Informationen? </AccordionTrigger>
                                            <AccordionContent>
                                                Sie finden das Impressum, die allgemeinen Nutzungsbedingungen
                                                und die Datenschutzerklärung auf jeder Seite ganz unten, im Footer.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-361">
                                            <AccordionTrigger> Wie kann ich mich bewerben? </AccordionTrigger>
                                            <AccordionContent>
                                            Sie finden die Karriere Seite unten auf der Webseite in der Fußzeile.
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default MieterFaq;