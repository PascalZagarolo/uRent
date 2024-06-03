import { FaQuestionCircle, FaQuidditch } from "react-icons/fa";
import AddBusinessFaqs from "./add-business-faqs";
import { business } from "@/db/schema";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MdOutlineQuestionAnswer } from "react-icons/md";

interface BusinessFaqsProps {
    thisBusiness : typeof business.$inferSelect;
}

const BusinessFaqs : React.FC<BusinessFaqsProps> = ({
    thisBusiness
}) => {
    return ( 
        <div className="dark:bg-[#191919]">
            <div className="p-4">
                <h3 className="w-full text-md font-semibold flex items-center">
                  <FaQuestionCircle  className="w-4 h-4 mr-2" />  FAQS
                  <div className="ml-auto">
                    <AddBusinessFaqs 
                    businessId={thisBusiness?.id}
                    />
                  </div>
                </h3>
            </div>
            <Accordion type="single" collapsible className="p-4">
            
                {thisBusiness?.faqs?.map((faq, index) => (
                    <AccordionItem value={`${index}`} className="border-none">
                    <AccordionTrigger 
                    className="dark:bg-[#1c1c1c]  p-4 text-sm font-semibold">
                        <div><MdOutlineQuestionAnswer className="w-4 h-4 mr-2"/> </div>{faq.question}</AccordionTrigger>
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