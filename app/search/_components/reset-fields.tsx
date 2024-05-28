'use client'

import { Button } from "@/components/ui/button";
import { useSavedSearchParams } from "@/store";
import { FaDeleteLeft } from "react-icons/fa6";

const ResetFields = () => {

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const usedLink = process.env.NEXT_PUBLIC_BASE_URL + "/search";

    return (
        <Button variant="ghost" size="sm">
            <a href={usedLink} className="flex items-center ">
               <FaDeleteLeft className="w-4 h-4 mr-2 text-rose-600" /> Filter zurücksetzen
            </a>
        </Button>
    );
}

export default ResetFields;