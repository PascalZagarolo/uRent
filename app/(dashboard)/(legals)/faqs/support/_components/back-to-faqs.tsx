'use client'

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackToFaqs = () => {

    const router = useRouter();

    const onClick = () => {
        router.push("/faqs")
    }

    return ( 
        <div className="text-sm text-gray-200/60 flex flex-row items-center hover:underline hover:cursor-pointer hover:text-gray-200/90" onClick={onClick}>
            <ArrowLeft className="w-4 h-4 mr-2"/>
            <span>
                Zurück zu den FAQs
            </span>
        </div>
     );
}
 
export default BackToFaqs;