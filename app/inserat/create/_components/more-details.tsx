'use client'

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const MoreDetails = () => {

    const router = useRouter();

    const currentUrl = window.location.href

    return ( 
        <p className="ml-16 text-xs italic font-semibold text-gray-900/50 flex items-center hover:underline hover:cursor-pointer"
        onClick={() => {router.push(currentUrl + "/details")}}> weitere Details angeben... 
        <ArrowRight className="h-4 w-4"/>
        </p>
     );
}
 
export default MoreDetails;