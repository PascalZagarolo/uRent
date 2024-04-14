'use client'

import { Button } from "@/components/ui/button";
import { userSubscription } from "@/db/schema";

import axios from "axios";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";


interface PremiumButtonProps {
    selectedAmount : number;
    existingSubscription?: typeof userSubscription;
    userId : string;
}

const PremiumButton : React.FC<PremiumButtonProps> = ({
selectedAmount,
    existingSubscription,
    userId
}) => {

    const calculatePremiumPrice = () => {
        switch (selectedAmount) {
          case 1:
            return "price_1P3eHLGRyqashQ2w8G7MmOmc";
          case 5:
            return "price_1P5E48GRyqashQ2wW54x1VXw";
          case 10:
            return "price_1P5E5UGRyqashQ2wqixSVCr4";
          case 15:
            return "price_1P5E5qGRyqashQ2wV8bKWoJc";
          case 25:
            return "price_1P5E6HGRyqashQ2wjNsejMwm";
          case 40:
            return "price_1P5E6bGRyqashQ2wxVBfknqg";
        default:
            return ""
          
        }
      };

      const subscriptionId = calculatePremiumPrice();

    const [isLoading, setIsLoading] = useState(false)

    const onSubscribe = async () => {
        try {
            setIsLoading(true);
            const values = {
                subscription: "PREMIUM",
                subscriptionId: subscriptionId,
                ...existingSubscription?.stripe_customer_id && {
                    stripe_customer_id: existingSubscription.stripe_customer_id
                },
                
            }
            const res = await axios.patch(`/api/stripe/user/${userId}`, values);
            window.location.href = res.data.url
        } catch {
            toast.error("Etwas ist schief gelaufen")
        } finally {
            setIsLoading(false)
        }
    }

    const onUpgrade = async () => {
        try {
            setIsLoading(true);
            const price = 1400;
            const values = {
                subscription: "PREMIUM",
                price : price,
                stripe_customer_id : existingSubscription.stripe_customer_id,
               
            }
            const res = await axios.patch(`/api/stripe/upgrade/`, values);
            window.location.href = res.data.url
        } catch {
            toast.error("Etwas ist schief gelaufen")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            {//@ts-ignore
            existingSubscription?.subscriptionType !== "PREMIUM" ? (
                existingSubscription ? (
                    //@ts-ignore
                    existingSubscription.subscriptionType === "BASIS" ? (
                        <Button className="w-full text-sm bg-blue-800 hover:bg-blue-900 text-gray-200 mt-2 mb-2" onClick={onUpgrade}
                        >
                               Upgraden
                        </Button>
                    ) : (
                        <Button className="w-full text-sm bg-gray-200 hover:bg-gray-300 text-gray-500 mt-2 mb-2" disabled
                        >
                            <CheckIcon className="mr-2 w-4 h-4" />   im Besitz
                        </Button >
                    )
                ) : (
                    <Button className="w-full text-sm bg-blue-800 hover:bg-blue-900 text-gray-200 mt-2 mb-2"
                         onClick={onSubscribe}>
                        Vorteile sichern
                    </Button >
                )
            ) : (
                <Button className="w-full text-sm bg-blue-800 hover:bg-blue-900 text-gray-200 mt-2 mb-2" disabled >
                    <CheckIcon className="mr-2" />im Besitz
                </Button>

            )}
        </>
    );
}

export default PremiumButton;