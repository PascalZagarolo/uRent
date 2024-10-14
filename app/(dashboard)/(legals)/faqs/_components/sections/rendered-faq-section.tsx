import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/db/schema";
import { getLabelByValueFaqs } from "@/hooks/faqs/convert-faq-values";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface RenderdFaqsSectionProps {
    currentCategory: string;
    foundFaqs: typeof faqs.$inferSelect[];
}

const RenderedFaqSection = ({ currentCategory, foundFaqs }: RenderdFaqsSectionProps) => {

    const router = useRouter();

    const onBackToOverview = () => {
        router.push("/faqs")
    }

    return (
        <div className="  min-h-screen">
            <div className="sm:p-4 p-2 mt-4  rounded-lg ">
                <div className="flex flex-row items-center text-gray-200/60 hover:text-gray-200/90 font-semibold text-sm hover:cursor-pointer hover:underline" onClick={onBackToOverview}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Zurück zur Faq-Übersicht
                </div>
                <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center mt-4">
                    {getLabelByValueFaqs(currentCategory)}
                </h3>
                <div className="text-gray-200/60 flex flex-row items-center text-xs">
                    Hilfreiche Informationen zu {getLabelByValueFaqs(currentCategory)}
                </div>
                <div className="mt-2 text-gray-200/60 flex flex-row items-center text-xs">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    {foundFaqs.length} Fragen & Antworten gefunden
                </div>
                <div>
                <Accordion type="single" collapsible className="w-full">
                    {foundFaqs.map((faq, index) => (
                        <div key={index} className="mt-4">
                            
                                <AccordionItem value={String(index)} className="shadow-md border-none px-4 dark:bg-[#171717] text-sm rounded-t-md
                                ">
                                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                                    <AccordionContent>
                                    <div dangerouslySetInnerHTML={{ __html: faq.answer }} className="text-sm text-gray-200/80" />
                                    </AccordionContent>
                                </AccordionItem>
                               
                           
                        </div>
                    ))}
                     </Accordion>
                </div>
            </div>
        </div>
    );
}

export default RenderedFaqSection;