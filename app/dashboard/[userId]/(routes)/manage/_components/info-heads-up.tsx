'use client'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { MdOutlineInfo } from "react-icons/md";

const InfoHeadsUp = () => {

    const router = useRouter();

    const onDecline = () => {
        toast.success("Hinweis ausgeblendet.");
        localStorage?.setItem("declineInfo", "true");
        declinedInfo = true;
        router.refresh();
        
    }

    let declinedInfo = localStorage?.getItem("declineInfo") ? true : false;

    if (declinedInfo) {
        return null;
    }

    return (
        <div className="px-4">
            <Alert className="px-4 dark:bg-indigo-900 dark:border-none">
                <MdOutlineInfo  className="h-4 w-4" />
                <AlertTitle className="flex items-center">Weitere Informationen
                    <div className="ml-auto hover:cursor-pointer" onClick={onDecline}>
                        <X className="text-gray-200 w-4 h-4" />
                    </div></AlertTitle>
                <AlertDescription>
                    Falls du weitere Informationen benötigst, oder eine kurze Einführung zum Buchungssystem wünschst,
                    schau dir die <a href="/faqs/bookings" target="_blank" className="underline">FAQs</a> an.
                </AlertDescription>
            </Alert>
        </div>
    );
}

export default InfoHeadsUp;