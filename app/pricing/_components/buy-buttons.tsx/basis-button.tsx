'use client'

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";


interface BasisButtonProps {
    inseratId? : string

}

const BasisButton = ({
    inseratId
}) => {

    const [isLoading , setIsLoading] = useState(false)

    const onSubscribe = async () => {
        try {
            console.log(`/api/stripe/${inseratId}`)
            setIsLoading(true);
            const res = await axios.patch(`/api/stripe/inserat/${inseratId}`);
            window.location.href = res.data.url
        } catch {
            toast.error("Etwas ist schief gelaufen")
        } finally {
            setIsLoading(false)
        }
    }

    return ( 
        <Button className="w-full text-sm bg-blue-800 hover:bg-blue-900 text-gray-200 mt-2 mb-2" disabled={!inseratId} onClick={onSubscribe}>
                            Jetzt starten
        </Button>
     );
}
 
export default BasisButton;