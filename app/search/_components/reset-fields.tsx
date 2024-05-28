'use client'

import { Button } from "@/components/ui/button";
import { useSavedSearchParams } from "@/store";
import { FaDeleteLeft } from "react-icons/fa6";

const ResetFields = () => {

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const usedLink = process.env.NEXT_PUBLIC_BASE_URL + "/search";

    return (
        
            <a href={usedLink} className="flex items-center text-xs mt-2 hover:underline hover:cursor-pointer">
               <FaDeleteLeft className="w-4 h-4 mr-2 text-rose-600" /> Filter zurücksetzen
            </a>
        
    );
}

export default ResetFields;