'use client'

import { useSearchParams } from "next/navigation";
import FaqCategoryRender from "./category-render";
import FurtherInformations from "./further-informations";
import SearchFaqs from "./search-faqs";
import OverviewSection from "./sections/overview-section";
import RenderedFaqSection from "./sections/rendered-faq-section";
import { faqs } from "@/db/schema";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface CategorySwitchProps {
    foundFaqs : typeof faqs.$inferSelect[];
}

const CategorySwitch = ({ foundFaqs } : CategorySwitchProps) => {

    const faqCategory = useSearchParams().get('category')
    const [category, setCategory] = useState("");
    const router = useRouter()

    

    const [currentFaqs, setCurrentFaqs] = useState(foundFaqs);

    useEffect(() => {
        if(faqCategory) {
            setCurrentFaqs(foundFaqs.filter(faq => faq.category === faqCategory))
        }
    }, [faqCategory])

    return ( 
        <div>
           <div>
            {(faqCategory == "" || !faqCategory) ? (
                <OverviewSection />
            ) : (
                <RenderedFaqSection currentCategory={faqCategory} foundFaqs={currentFaqs} />
            )}
           </div>
        </div>
     );
}
 
export default CategorySwitch;