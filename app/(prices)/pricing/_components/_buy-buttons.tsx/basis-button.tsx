'use client'

import { Button } from "@/components/ui/button";
import { userSubscription } from "@/db/schema";

import axios from "axios";

import { CheckIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";


interface BasisButtonProps {
    selectedAmount : number;
    existingSubscription? : typeof userSubscription;
    userId : string;
}

const BasisButton : React.FC<BasisButtonProps> = ({
    selectedAmount,
    existingSubscription,
    userId
}) => {

    const [isLoading , setIsLoading] = useState(false);


    const calculateBasisPrice = () => {
        switch (selectedAmount) {
          case 1:
            return "price_1P3eG6GRyqashQ2wBDASbuB2";
          case 5:
            return "price_1P5E0LGRyqashQ2wXzg5W52S";
          case 10:
            return "price_1P5E1oGRyqashQ2wbqv21JvN";
          case 15:
            return "price_1P5E2KGRyqashQ2wF1wRau9d";
          case 25:
            return "price_1P5E2uGRyqashQ2w0qaANMgy";
          case 40:
            return "price_1P5E3JGRyqashQ2wvCzqhZiD";
            default:
                return ""
        }
      };

      const subscriptionId = calculateBasisPrice();

      console.log(subscriptionId)

    const onSubscribe = async () => {
        try {
            setIsLoading(true);
            const values = {
                subscriptionType : "BASIS",
                subscriptionId: subscriptionId,
                amount : selectedAmount,
                
            }
            const res = await axios.patch(`/api/stripe/user/${userId}`, values);
            window.location.href = res.data.url
        } catch {
            toast.error("Etwas ist schief gelaufen")
        } finally {
            setIsLoading(false)
        }
    }

    

    return ( 
        <>  
            {
            //@ts-ignore
            existingSubscription?.subscriptionType !== "BASIS" ? (
                existingSubscription ? (
                    <Button className="w-full text-sm bg-gray-200 hover:bg-gray-300 text-gray-500 mt-2 mb-2" disabled
                        >
                     <CheckIcon className="mr-2 w-4 h-4" />   Bereits enthalten
                    </Button >
                ) : (
                    <Button className="w-full text-sm bg-blue-800 hover:bg-blue-900 text-gray-200 mt-2 mb-2" //@ts-ignore
                        disabled={existingSubscription} onClick={onSubscribe}>
                        Vorteile sichern
                    </Button >
                )
            ) : (
                <Button className="w-full text-sm bg-gray-200 hover:bg-gray-300 text-gray-500 mt-2 mb-2" disabled>
                    <CheckIcon className="mr-2 w-4 h-4" />im Besitz
                </Button>
            )}
        </>
     );
}
 
export default BasisButton;