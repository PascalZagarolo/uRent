'use client'

import { Button } from "@/components/ui/button";
import { inseratSubscription } from "@/db/schema";
import axios from "axios";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";


interface BasisButtonProps {
    inseratId? : string;
    existingSubscription? : typeof inseratSubscription;

}

const BasisButton = ({
    inseratId,
    existingSubscription
}) => {

    const [isLoading , setIsLoading] = useState(false)

    const onSubscribe = async () => {
        try {
            setIsLoading(true);
            const values = {
                subscription : "BASIS",
                price : 2500
            }
            const res = await axios.patch(`/api/stripe/inserat/${inseratId}`, values);
            window.location.href = res.data.url
        } catch {
            toast.error("Etwas ist schief gelaufen")
        } finally {
            setIsLoading(false)
        }
    }

    return ( 
        <>
            {existingSubscription?.subscriptionType !== "BASIS" ? (
                existingSubscription ? (
                    <Button className="w-full text-sm bg-gray-200 hover:bg-gray-300 text-gray-500 mt-2 mb-2" disabled
                        >
                     <CheckIcon className="mr-2 w-4 h-4" />   im Besitz
                    </Button >
                ) : (
                    <Button className="w-full text-sm bg-blue-800 hover:bg-blue-900 text-gray-200 mt-2 mb-2"
                        disabled={!inseratId || existingSubscription} onClick={onSubscribe}>
                        Jetzt starten
                    </Button >
                )
            ) : (
                <Button className="w-full text-sm bg-blue-600 hover:bg-blue-700 text-gray-200 mt-2 mb-2" >
                    <CheckIcon className="mr-2" />im Besitz
                </Button>
            )}
        </>
     );
}
 
export default BasisButton;