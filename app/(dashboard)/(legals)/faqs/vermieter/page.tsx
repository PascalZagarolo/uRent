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

            <div className="flex justify-center p-8 bg-[#404040]/10">

                <div className="w-[1044px] dark:bg-[#1c1c1c] rounded-md bg-white">
                    <div className="  min-h-screen">
                        <div className="p-4 mt-4  rounded-lg ">
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
                                            <BreadcrumbPage>Vermieter</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </div>
                            <div className="p-4"> 
                                <Accordion type="single" collapsible>

                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>Wie kann ich mein Fahrzeug auf Ihrer Plattform zur Vermietung anbieten?</AccordionTrigger>
                                        <AccordionContent>
                                        Um Ihr Fahrzeug zur Vermietung anzubieten, 
                                        müssen Sie sich zunächst auf unserer Plattform registrieren und ein Vermieterkonto erstellen. Nach der Registrierung können 
                                        Sie Ihr Fahrzeugprofil erstellen, Fotos hinzufügen, die Verfügbarkeit festlegen und den Mietpreis festlegen.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-2">
                                        <AccordionTrigger>Welche Art von Fahrzeugen kann ich auf Ihrer Plattform vermieten?</AccordionTrigger>
                                        <AccordionContent>
                                        Sie können eine Vielzahl von Fahrzeugen auf unserer Plattform vermieten, darunter Personenwagen, 
                                        Transporter und Lieferwagen. Die genauen Fahrzeugtypen, 
                                        die Sie vermieten können, hängen von den Richtlinien und Anforderungen unserer Plattform ab.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-3">
                                        <AccordionTrigger>Welche Dokumente und Informationen benötige ich als Vermieter?</AccordionTrigger>
                                        <AccordionContent>
                                        Als Vermieter benötigen Sie einen gültigen Führerschein und möglicherweise weitere Identitätsnachweise. 
                                        Sie müssen auch das Fahrzeugregistrierungsdokument und die Versicherungsinformationen bereitstellen. 
                                        Die genauen Anforderungen können je nach Standort und Plattform variieren.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-4">
                                        <AccordionTrigger>Wie erfolgt die Abholung und Rückgabe des Fahrzeugs?</AccordionTrigger>
                                        <AccordionContent>
                                        Sie als Vermieter sind verantwortlich für die Koordination der Übergabe und Rückgabe des Fahrzeugs mit dem Mieter. 
                                        Sie können den genauen Standort und die Einzelheiten zur Übergabe festlegen. 
                                        Stellen Sie sicher, dass Sie klare Anweisungen bereitstellen, um einen reibungslosen Ablauf zu gewährleisten.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-5">
                                        <AccordionTrigger>Sind meine Fahrzeuge versichert, wenn sie vermietet sind?</AccordionTrigger>
                                        <AccordionContent>
                                        Sie sind selber für die Versicherungsrechtlichen Aspekte verantwortlich. 
                                        Stellen Sie sicher, dass Sie sich über die angebotenen Versicherungsoptionen informieren und gegebenenfalls zusätzlichen 
                                        Versicherungsschutz in Betracht ziehen. 
                                        Klären Sie auch die Haftung im Falle von Schäden oder Unfällen während der Mietdauer.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-6">
                                        <AccordionTrigger>Was passiert, wenn das gemietete Fahrzeug beschädigt wird?</AccordionTrigger>
                                        <AccordionContent>
                                        Im Falle von Schäden am gemieteten Fahrzeug sollten Sie die Situation mit dem Mieter klären und die Schadensregelung 
                                        gemäß den Mietbedingungen und Versicherungsrichtlinien durchführen. 
                                        Dokumentieren Sie den Zustand des Fahrzeugs vor und nach der Vermietung, um eventuelle Schäden zu belegen.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-7">
                                        <AccordionTrigger>Kann ich bestimmte Bedingungen und Anforderungen für die Fahrzeugmiete festlegen?</AccordionTrigger>
                                        <AccordionContent>
                                        Als Vermieter haben Sie die Möglichkeit, bestimmte Bedingungen und Anforderungen für die Fahrzeugmiete festzulegen. 
                                        Dies kann die Mindestmietdauer, die Kilometerbegrenzung, die akzeptierten Zahlungsmethoden und andere Richtlinien umfassen. 
                                        Stellen Sie sicher, 
                                        dass diese Bedingungen klar kommuniziert werden, um Missverständnisse zu vermeiden.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-8">
                                        <AccordionTrigger>Kann ich meinen eigenen Mietvertrag verwenden?</AccordionTrigger>
                                        <AccordionContent>
                                        Ja, Sie können Ihren eigenen Mietvertrag verwenden, um die Bedingungen und Vereinbarungen zwischen Ihnen und dem Mieter festzulegen. 
                                        Stellen Sie sicher, dass Ihr Mietvertrag alle relevanten rechtlichen Anforderungen und Schutzmaßnahmen abdeckt.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-9">
                                        <AccordionTrigger>Wie wird die Preisgestaltung für meine Fahrzeuge festgelegt?</AccordionTrigger>
                                        <AccordionContent>
                                        Sie haben die Möglichkeit, den Mietpreis für Ihre Fahrzeuge festzulegen. 
                                        Berücksichtigen Sie dabei Faktoren wie Fahrzeugtyp, Alter, Standort, Nachfrage und Mietdauer. Seien Sie wettbewerbsfähig, 
                                        aber stellen Sie sicher, dass der Preis angemessen ist, 
                                        um Ihre Kosten zu decken und einen angemessenen Gewinn zu erzielen.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-10">
                                        <AccordionTrigger>Gibt es eine maximale Anzahl von Fahrzeugen, die ich vermieten kann?</AccordionTrigger>
                                        <AccordionContent>
                                        Die maximale Anzahl von Fahrzeugen, die Sie vermieten können, kann je nach Vermieterplattform und 
                                        lokalen Vorschriften variieren. Stellen Sie sicher, dass Sie die Regeln und Richtlinien 
                                        Ihrer Plattform überprüfen und gegebenenfalls zusätzliche Genehmigungen einholen, bevor Sie weitere Fahrzeuge hinzufügen.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-11">
                                        <AccordionTrigger>Wie werden Bewertungen und Rückmeldungen von Mietern behandelt?</AccordionTrigger>
                                        <AccordionContent>
                                        Bewertungen und Rückmeldungen von Mietern sind wichtige Informationen für potenzielle zukünftige Mieter. 
                                        Stellen Sie sicher, dass Sie auf Bewertungen reagieren und Feedback ernst nehmen, 
                                        um die Zufriedenheit der Mieter zu gewährleisten und Ihr Geschäft zu verbessern.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-12">
                                        <AccordionTrigger>Kann ich meine Fahrzeugliste aktualisieren oder ändern?</AccordionTrigger>
                                        <AccordionContent>
                                        Ja, Sie können Ihre Fahrzeugliste jederzeit aktualisieren oder ändern. 
                                        Fügen Sie neue Fahrzeuge hinzu, aktualisieren Sie vorhandene Angebote oder passen Sie die Verfügbarkeit an. 
                                        Stellen Sie sicher, dass Sie Änderungen rechtzeitig vornehmen, um potenzielle Mieter nicht zu enttäuschen.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-13">
                                        <AccordionTrigger>Kann ich eine Kaution von den Mietern verlangen?</AccordionTrigger>
                                        <AccordionContent>
                                        Ja, Sie können eine Kaution von den Mietern verlangen, um Ihr Fahrzeug vor potenziellen Schäden 
                                        oder Verlusten zu schützen. Stellen Sie sicher, 
                                        dass die Höhe der Kaution angemessen ist und dass Sie die Rückgabebedingungen klar kommunizieren.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-14">
                                        <AccordionTrigger>Wie kann ich den Kundenservice erreichen, wenn ich Hilfe benötige?</AccordionTrigger>
                                        <AccordionContent>
                                        Unser Kundenservice-Team steht Ihnen zur Verfügung, um Ihnen bei Fragen oder Problemen zu helfen. 
                                        Bitte kontaktieren Sie uns per E-Mail oder über das Nachrichtensystem auf unserer Plattform. 
                                        Wir werden uns bemühen, Ihre Anfragen so schnell wie möglich zu beantworten und Ihnen bei der Lösung Ihrer Probleme zu helfen
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-15">
                                        <AccordionTrigger>Wie läuft die Zahlung auf uRent ab?</AccordionTrigger>
                                        <AccordionContent>
                                        Bei uRent liegt die vollständige Verantwortung für die Zahlungsabwicklung bei den Vermietern. 
                                        Ähnlich wie auf anderen gängigen Online-Plattformen behalten 
                                        Vermieter die Kontrolle über den gesamten Zahlungsprozess.
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