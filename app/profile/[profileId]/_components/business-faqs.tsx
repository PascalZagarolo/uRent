import { FaQuestionCircle } from "react-icons/fa";
import AddBusinessFaqs from "./add-business-faqs";
import { business } from "@/db/schema";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import DeleteFaq from "./delete-faq";

interface BusinessFaqsProps {
    thisBusiness: typeof business.$inferSelect;
    ownProfile: boolean;
}

const BusinessFaqs: React.FC<BusinessFaqsProps> = ({
    thisBusiness,
    ownProfile
}) => {
    return (
        <div className="dark:bg-[#191919]">
            <div className="p-4">
                <h3 className="w-full text-md font-semibold flex items-center">
                    <FaQuestionCircle className="w-4 h-4 mr-2" />  FAQS
                    {ownProfile && (
                        <div className="ml-auto">
                            <AddBusinessFaqs
                                businessId={thisBusiness?.id}
                            />
                        </div>
                    )}
                </h3>
            </div>
            <Accordion type="single" collapsible className="p-4">

                {thisBusiness?.faqs?.map((faq, index) => (
                    <AccordionItem value={`${index}`} className="border-none" key={index}>
                        {ownProfile && (
                            <div className="ml-auto w-full flex justify-end p-2">
                            <DeleteFaq 
                            faqId={faq.id}
                            />
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
        </div>
    );
}

export default BusinessFaqs;