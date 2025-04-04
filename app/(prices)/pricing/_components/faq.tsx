'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Faq = () => {
    return (
        <div className="sm:p-0 p-2">
            <h3 className="font-semibold">
                FAQ - Häufig gestellte Fragen
            </h3>

            <div>
                <Accordion type="single" collapsible>

                    <AccordionItem value="item-1">
                        <AccordionTrigger>Kann ich mein Abonnement später aufwerten?</AccordionTrigger>
                        <AccordionContent>
                            Absolut! Wir unterstützen Flexibilität und verstehen, dass deine Bedürfnisse sich mit der Zeit ändern können.
                            Das Upgrade deines Abonnements ist ein einfacher Prozess. Du musst lediglich die Differenz zwischen deinem aktuellen Plan und
                            dem gewünschten Plan zahlen. Das bedeutet, dass du nahtlos zu einem umfangreicheren Service wechseln kannst,
                            um noch mehr von unseren exklusiven Angeboten zu profitieren.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>Wie kann ich mein Abonnement aufwerten?</AccordionTrigger>
                        <AccordionContent>
                            Um dein Abonnement aufzuwerten, bezahlst du hier lediglich die Differenz zwischen deinem aktuellen und dem gewünschten Plan. <br/>
                            Der neue Plan wird sofort freigeschaltet, sodass du alle Features direkt nutzen kannst. <br/>
                            Der Abrechnungszeitraum bleibt unverändert – wenn dein aktueller Abrechnungszeitraum beispielsweise noch 10 Tage umfasst, gilt dies auch nach dem Upgrade auf den neuen Plan weiterhin.  <br/> <br/>
                            Falls dein Abonnement aktiv ist, wird der neue Plan erneuert, und der vollständige Preis wird für jeden Abo-Zyklus berechnet.
                            Bereits gekündigte Abos bleiben jedoch weiterhin gekündigt, auch nach einem Wechsel auf einen neuen Plan.
                        </AccordionContent>
                    </AccordionItem>


                    <AccordionItem value="item-3">
                        <AccordionTrigger>Wie funktioniert die Abrechnung?</AccordionTrigger>
                        <AccordionContent>
                            Die Abrechnung erfolgt monatlich.
                            Sie werden zu Beginn jedes Abrechnungszeitraums automatisch belastet,
                            solange Sie Ihr Abonnement nicht vor Ablauf des aktuellen Zeitraums kündigen.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                        <AccordionTrigger className="text-left">Kann ich mein Abonnement jederzeit kündigen?</AccordionTrigger>
                        <AccordionContent>
                            Ja, Sie können Ihr Abonnement jederzeit kündigen. Die Kündigung tritt zum Ende des aktuellen Abrechnungszeitraums in Kraft.
                            Sie haben jedoch weiterhin Zugriff auf alle Features bis zum Ende dieses Zeitraums.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5">
                        <AccordionTrigger className="text-left">Gibt es eine Kündigungsfrist für mein Abonnement?</AccordionTrigger>
                        <AccordionContent>
                            Nein, es gibt keine Kündigungsfrist für Ihr Abonnement.
                            Sie können jederzeit vor Ablauf des aktuellen Abrechnungszeitraums kündigen, und die Kündigung tritt zum Ende dieses Zeitraums in Kraft.
                            Es gibt keine versteckten Gebühren oder zusätzlichen Verpflichtungen.
                        </AccordionContent>
                    </AccordionItem>


                </Accordion>
            </div>
        </div>
    );
}

export default Faq;