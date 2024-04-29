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
                                Mieter - Häufig gestellte Fragen
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
                                            <BreadcrumbPage>Mieter</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </div>
                            <div className="p-4">
                                <Accordion type="single" collapsible>

                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>Wie kann ich ein Fahrzeug über Ihre Plattform mieten?</AccordionTrigger>
                                        <AccordionContent>
                                            Unsere Plattform fungiert als Vermittler für Fahrzeugvermietungen.
                                            Um ein Fahrzeug zu mieten, durchsuchen Sie unsere Plattform nach verfügbaren Angeboten in Ihrer Nähe.
                                            Sobald Sie das gewünschte Fahrzeug gefunden haben, können Sie eine Anfrage stellen. Der Vermieter wird Ihre Anfrage bearbeiten,
                                            und wenn sie akzeptiert wird, erhalten Sie weitere Anweisungen zur Abholung des Fahrzeugs.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-2">
                                        <AccordionTrigger>Welche Dokumente und Informationen werden für die Buchung benötigt?</AccordionTrigger>
                                        <AccordionContent>
                                            Für die Buchung benötigen Sie einen gültigen Führerschein und in einigen Fällen weitere Identitätsnachweise.
                                            Die genauen Anforderungen können je nach Vermieter variieren. Bitte beachten Sie,
                                            dass Sie möglicherweise auch eine Kredit- oder Debitkarte benötigen, um die Buchung abzuschließen.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-3">
                                        <AccordionTrigger>Wie funktioniert die Bezahlung?</AccordionTrigger>
                                        <AccordionContent>
                                            Die Bezahlung erfolgt in der Regel direkt an den Vermieter, nicht über unsere Plattform.
                                            Die genauen Zahlungsdetails werden Ihnen vom Vermieter mitgeteilt, sobald Ihre Buchungsanfrage akzeptiert wurde.
                                            Sie können je nach Vereinbarung Barzahlung, Kredit- oder Debitkarte verwenden.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-4">
                                        <AccordionTrigger>Gibt es eine Kaution?</AccordionTrigger>
                                        <AccordionContent>
                                            In einigen Fällen kann der Vermieter eine Kaution verlangen, um das gemietete Fahrzeug abzuholen.
                                            Die Höhe der Kaution variiert je nach Vermieter und Fahrzeugtyp. Die Kaution wird in der Regel bei der Rückgabe des Fahrzeugs zurückerstattet,
                                            sofern keine Schäden oder Verstöße gegen die Mietbedingungen vorliegen.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-5">
                                        <AccordionTrigger>Was passiert, wenn das gemietete Fahrzeug Schäden aufweist?</AccordionTrigger>
                                        <AccordionContent>
                                            Wir empfehlen allen Benutzern, den Zustand des Fahrzeugs bei der Abholung zu überprüfen und eventuelle Schäden zu dokumentieren.
                                            Im Falle von Schäden während der Mietdauer sollten Sie den Vermieter umgehend informieren.
                                            Der Vermieter wird die Schadensregelung gemäß den vereinbarten Mietbedingungen vornehmen.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-6">
                                        <AccordionTrigger>Kann ich meine Buchung stornieren?</AccordionTrigger>
                                        <AccordionContent>
                                            Die Stornierungsbedingungen variieren je nach Vermieter und Buchung.
                                            Sie können die spezifischen Stornierungsbedingungen während des Buchungsvorgangs einsehen.
                                            Vergewissern sie sich vor Antreten ihrer Buchung über die Stornierungsbedingungen des Vermieters.
                                            Bitte beachten Sie, dass möglicherweise Stornierungsgebühren anfallen,
                                            wenn Sie Ihre Buchung nicht rechtzeitig stornieren.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-7">
                                        <AccordionTrigger>Wie kann ich den Kundenservice erreichen, wenn ich Hilfe benötige?</AccordionTrigger>
                                        <AccordionContent>
                                            Unser Kundenservice-Team steht Ihnen zur Verfügung, um Ihnen bei Fragen oder Problemen zu helfen.
                                            Bitte kontaktieren Sie uns per E-Mail oder über das Nachrichtensystem auf unserer Plattform. Wir werden uns bemühen,
                                            Ihre Anfragen so schnell wie möglich zu beantworten und Ihnen bei der Lösung Ihrer Probleme zu helfen.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-8">
                                        <AccordionTrigger>Welche Art von Fahrzeugen kann ich auf Ihrer Plattform mieten?</AccordionTrigger>
                                        <AccordionContent>
                                            Auf unserer Plattform finden Sie eine Vielzahl von Fahrzeugen, darunter Personenwagen,
                                            Transporter und Lieferwagen. Die Verfügbarkeit kann je nach Standort und Vermieter variieren.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-9">
                                        <AccordionTrigger>Gibt es Altersbeschränkungen für die Fahrzeugmiete?</AccordionTrigger>
                                        <AccordionContent>
                                            Die Altersanforderungen für die Fahrzeugmiete können je nach Vermieter und Fahrzeugtyp variieren.
                                            In der Regel müssen Sie jedoch mindestens 18 Jahre alt sein
                                            und über einen gültigen Führerschein verfügen. Einige Vermieter können auch eine Mindestaltergrenze festlegen.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-10">
                                        <AccordionTrigger>Kann ich ein Fahrzeug für eine längere Zeit mieten?</AccordionTrigger>
                                        <AccordionContent>
                                            Ja, viele Vermieter bieten die Möglichkeit, Fahrzeuge für längere Zeiträume zu mieten, einschließlich Wochenenden,
                                            Wochen oder sogar Monaten.
                                            Die Mietkosten können je nach Dauer und Fahrzeugtyp variieren.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-11">
                                        <AccordionTrigger>Wie erfolgt die Übergabe und Rückgabe des Fahrzeugs?</AccordionTrigger>
                                        <AccordionContent>
                                            Die Übergabe und Rückgabe des Fahrzeugs erfolgt persönlich zwischen Ihnen und dem Vermieter.
                                            Der genaue Standort und die Einzelheiten zur
                                            Übergabe werden Ihnen vom Vermieter mitgeteilt, sobald Ihre Buchungsanfrage akzeptiert wurde.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-12">
                                        <AccordionTrigger>Sind die Fahrzeuge versichert?</AccordionTrigger>
                                        <AccordionContent>
                                            Viele Vermieter bieten Versicherungsoptionen für gemietete Fahrzeuge an. Die genauen Versicherungsdetails können je nach
                                            Vermieter und Fahrzeugtyp variieren. Wir empfehlen Ihnen dringend,
                                            sich über die Versicherungsoptionen zu informieren und gegebenenfalls zusätzlichen Versicherungsschutz abzuschließen.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-13">
                                        <AccordionTrigger>Kann ich Zusatzleistungen wie Kindersitze oder Navigationssysteme hinzufügen?
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            Einige Vermieter bieten zusätzliche Ausstattungen und Dienstleistungen wie Kindersitze,
                                            Navigationssysteme oder Winterreifen gegen eine zusätzliche Gebühr an.
                                            Die Verfügbarkeit und die Kosten für Zusatzleistungen können je nach Vermieter variieren.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-14">
                                        <AccordionTrigger>Was passiert, wenn das gemietete Fahrzeug eine Panne hat?</AccordionTrigger>
                                        <AccordionContent>
                                            Im Falle einer Panne während der Mietdauer sollten Sie den Vermieter umgehend informieren.
                                            Viele Vermieter bieten einen Pannendienst oder eine 24-Stunden-Hilfehotline an, um Ihnen in solchen Situationen zu helfen.
                                            Bitte beachten Sie auch die Mietbedingungen des Vermieters in Bezug auf Pannen und Schäden.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-15">
                                        <AccordionTrigger>Kann ich das gemietete Fahrzeug an einem anderen Ort zurückgeben?</AccordionTrigger>
                                        <AccordionContent>
                                            Die Rückgabeoptionen können je nach Vermieter variieren. Einige Vermieter bieten die Möglichkeit der Einwegmiete an,
                                            während andere die Rückgabe des Fahrzeugs am selben Ort,
                                            an dem es abgeholt wurde, verlangen. Bitte klären Sie diese Details vorab mit dem Vermieter.
                                        </AccordionContent>
                                    </AccordionItem>

                                </Accordion>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default MieterFaq;