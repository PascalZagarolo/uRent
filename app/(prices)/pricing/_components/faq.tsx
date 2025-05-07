'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FaRegQuestionCircle } from "react-icons/fa";

const Faq = () => {
    return (
        <div className="sm:p-0 p-2">
            <div className="rounded-2xl p-8 w-full shadow-2xl  bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-[#23244a] dark:via-[#181a2a] dark:to-[#23244a]">
                <div className="flex items-center gap-3 mb-6">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 via-indigo-400 to-indigo-600 shadow-lg">
                        <FaRegQuestionCircle className="w-6 h-6 text-white" />
                    </span>
                    <h3 className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-indigo-500 to-indigo-700">FAQ – Häufig gestellte Fragen</h3>
                </div>
                <Accordion type="single" collapsible className="space-y-3">
                    <AccordionItem value="item-1" className="rounded-xl overflow-hidden bg-white/80 dark:bg-[#181a2a]/80 shadow-sm">
                        <AccordionTrigger className="text-base md:text-lg font-bold text-indigo-800 dark:text-indigo-100 px-6 py-4 hover:bg-indigo-50/60 dark:hover:bg-indigo-900/30 transition-all">
                            Kann ich mein Abonnement später aufwerten?
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4 text-indigo-900 dark:text-indigo-200/90 text-sm md:text-base">
                            Absolut! Wir unterstützen Flexibilität und verstehen, dass deine Bedürfnisse sich mit der Zeit ändern können.
                            Das Upgrade deines Abonnements ist ein einfacher Prozess. Du musst lediglich die Differenz zwischen deinem aktuellen Plan und
                            dem gewünschten Plan zahlen. Das bedeutet, dass du nahtlos zu einem umfangreicheren Service wechseln kannst,
                            um noch mehr von unseren exklusiven Angeboten zu profitieren.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" className="rounded-xl overflow-hidden bg-white/80 dark:bg-[#181a2a]/80 shadow-sm">
                        <AccordionTrigger className="text-base md:text-lg font-bold text-indigo-800 dark:text-indigo-100 px-6 py-4 hover:bg-indigo-50/60 dark:hover:bg-indigo-900/30 transition-all">
                            Wie kann ich mein Abonnement aufwerten?
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4 text-indigo-900 dark:text-indigo-200/90 text-sm md:text-base">
                            Um dein Abonnement aufzuwerten, bezahlst du hier lediglich die Differenz zwischen deinem aktuellen und dem gewünschten Plan. <br/>
                            Der neue Plan wird sofort freigeschaltet, sodass du alle Features direkt nutzen kannst. <br/>
                            Der Abrechnungszeitraum bleibt unverändert – wenn dein aktueller Abrechnungszeitraum beispielsweise noch 10 Tage umfasst, gilt dies auch nach dem Upgrade auf den neuen Plan weiterhin.  <br/> <br/>
                            Falls dein Abonnement aktiv ist, wird der neue Plan erneuert, und der vollständige Preis wird für jeden Abo-Zyklus berechnet.
                            Bereits gekündigte Abos bleiben jedoch weiterhin gekündigt, auch nach einem Wechsel auf einen neuen Plan.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3" className="rounded-xl overflow-hidden bg-white/80 dark:bg-[#181a2a]/80 shadow-sm">
                        <AccordionTrigger className="text-base md:text-lg font-bold text-indigo-800 dark:text-indigo-100 px-6 py-4 hover:bg-indigo-50/60 dark:hover:bg-indigo-900/30 transition-all">
                            Wie funktioniert die Abrechnung?
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4 text-indigo-900 dark:text-indigo-200/90 text-sm md:text-base">
                            Die Abrechnung erfolgt monatlich.
                            Sie werden zu Beginn jedes Abrechnungszeitraums automatisch belastet,
                            solange Sie Ihr Abonnement nicht vor Ablauf des aktuellen Zeitraums kündigen.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4" className="rounded-xl overflow-hidden bg-white/80 dark:bg-[#181a2a]/80 shadow-sm">
                        <AccordionTrigger className="text-base md:text-lg font-bold text-indigo-800 dark:text-indigo-100 px-6 py-4 hover:bg-indigo-50/60 dark:hover:bg-indigo-900/30 transition-all text-left">
                            Kann ich mein Abonnement jederzeit kündigen?
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4 text-indigo-900 dark:text-indigo-200/90 text-sm md:text-base">
                            Ja, Sie können Ihr Abonnement jederzeit kündigen. Die Kündigung tritt zum Ende des aktuellen Abrechnungszeitraums in Kraft.
                            Sie haben jedoch weiterhin Zugriff auf alle Features bis zum Ende dieses Zeitraums.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5" className="rounded-xl overflow-hidden bg-white/80 dark:bg-[#181a2a]/80 shadow-sm">
                        <AccordionTrigger className="text-base md:text-lg font-bold text-indigo-800 dark:text-indigo-100 px-6 py-4 hover:bg-indigo-50/60 dark:hover:bg-indigo-900/30 transition-all text-left">
                            Gibt es eine Kündigungsfrist für mein Abonnement?
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4 text-indigo-900 dark:text-indigo-200/90 text-sm md:text-base">
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