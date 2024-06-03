import { FaQuestionCircle, FaQuidditch } from "react-icons/fa";
import AddBusinessFaqs from "./add-business-faqs";
import { business } from "@/db/schema";

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
            <div className="">
                {thisBusiness?.faqs?.map((faq, index) => (
                    <div key={faq.id}>

                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default BusinessFaqs;