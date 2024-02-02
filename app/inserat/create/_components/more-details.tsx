'use client'

import { Inserat } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

interface MoreDetailProps {
    inserat : Inserat;
}

const MoreDetails: React.FC<MoreDetailProps> = ({
    inserat
}) => {

    const onClick = () => {
        if(inserat.category) {
            router.push(`/inserat/create/${inserat.id}/details`)
        } else {
            toast.error("Bitte wähle zuerst eine Kategorie aus")
        }
    }

    const router = useRouter();

    

    return ( 
        <p className="ml-16 text-xs italic font-semibold text-gray-900/50 flex items-center hover:underline hover:cursor-pointer"
        onClick={onClick}> weitere Details angeben... 
        <ArrowRight className="h-4 w-4"/>
        </p>
     );
}
 
export default MoreDetails;