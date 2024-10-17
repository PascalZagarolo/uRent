'use client'

import { FaQuestionCircle } from "react-icons/fa";
import AddBusinessFaqs from "./add-business-faqs";
import { business } from "@/db/schema";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import DeleteFaq from "./delete-faq";
import EditBusinessFaqs from "./edit-business-faqs";
import { useState } from "react";

interface BusinessFaqsProps {
    thisBusiness: typeof business.$inferSelect;
    ownProfile: boolean;
}

const BusinessFaqs: React.FC<BusinessFaqsProps> = ({
    thisBusiness,
    ownProfile
}) => {

    const [renderedFaqs, setRenderedFaqs] = useState(thisBusiness?.faqs)

    return (
        <div className="dark:bg-[#191919] shadow-lg">
            <div className="p-4">
                <h3 className="w-full text-md font-semibold flex items-center">
                    <FaQuestionCircle className="w-4 h-4 mr-2" />  FAQS
                    {ownProfile && (
                        <div className="ml-auto">
                            <AddBusinessFaqs
                                businessId={thisBusiness?.id}
                                onChange={(newFaq) => setRenderedFaqs([...renderedFaqs, newFaq])}
                            />
                        </div>
                    )}
                </h3>
            </div>
            {thisBusiness?.faqs?.length > 0 && (
                <Accordion type="single" collapsible className="p-4 ">

                {renderedFaqs?.map((faq, index) => (
                    <AccordionItem value={`${index}`} className="border-none" key={index}>
                        {ownProfile && (
                            <div className="ml-auto w-full flex justify-end p-2 gap-x-2">
                                <div className="">
                                <EditBusinessFaqs
                                    thisFaq={faq}
                                    businessId={thisBusiness?.id as string}
                                    onChange={(updatedFaq) => {
                                        const updatedFaqs = renderedFaqs?.map(f => f.id === updatedFaq.id ? updatedFaq : f)
                                        setRenderedFaqs(updatedFaqs)
                                    }}
                                />
                                </div>
                                <div>
                                <DeleteFaq
                                    faqId={faq.id}
                                    deleteFaq={(deletedFaq) => {
                                        const updatedFaqs = renderedFaqs?.filter(f => f.id !== deletedFaq.id)
                                        setRenderedFaqs(updatedFaqs)
                                    }}
                                />
                                </div>
                            </div>
                        )}
                        <AccordionTrigger
                            className="dark:bg-[#1c1c1c]  p-4 text-sm font-semibold">
                            <div className="flex items-center gap-x-2">
                                <MdOutlineQuestionAnswer className="w-4 h-4 mr-2" />
                            </div>{faq.question}</AccordionTrigger>
                        <AccordionContent className="p-4 border-none  dark:bg-[#1c1c1c]">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
            )}
            {thisBusiness?.faqs?.length === 0 && (
                <div className="flex justify-center p-4 text-sm text-gray-400">
                    Noch keine Faqs hinzugefügt..
                </div>
            
            )}
        </div>
    );
}

export default BusinessFaqs;