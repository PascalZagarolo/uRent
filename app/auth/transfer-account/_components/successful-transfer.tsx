'use client'

import { Button } from "@/components/ui/button";
import { Share2Icon } from "@radix-ui/react-icons";
import { ArrowLeftFromLineIcon, CheckCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FaRightToBracket } from "react-icons/fa6";
import { RiTextDirectionL } from "react-icons/ri";



const SuccessfullTransfer = () => {
    
    const router = useRouter();
    
    return (<div className="max-w-md mx-auto mt-10 p-6  rounded-2xl shadow-lg ">
    <div className="text-center">
        <CheckCircleIcon className="w-14 h-14 text-emerald-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Dein Account wurde erfolgreich übertragen
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Du bist eingeloggt und sofort startklar!
        </p>
    </div>

    <div className="mt-6">
        <Button className="w-full text-sm font-medium bg-[#242424] hover:bg-[#2a2a2a] text-gray-200"
        onClick={() => {
            router.push("/")
        }}
        >
            <ArrowLeftFromLineIcon className="w-4 h-4 mr-2" />
            Zurück zur Startseite
        </Button>
    </div>
</div>);
}

export default SuccessfullTransfer;