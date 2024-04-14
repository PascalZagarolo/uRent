'use client'

import { Button } from "@/components/ui/button";
import { userSubscription } from "@/db/schema";

import { CheckIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useState } from "react";
import toast, { CheckmarkIcon } from "react-hot-toast";



interface EnterpriseButtonProps {
    selectedAmount : number;
    existingSubscription?: typeof userSubscription;
    userId : string;
}

const EnterpriseButton : React.FC<EnterpriseButtonProps>= ({
    selectedAmount,
    existingSubscription,
    userId
}) => {

    const calculateEnterprisePrice = () => {
        switch (selectedAmount) {
          case 1:
            return "price_1P3eHXGRyqashQ2wzUh5fehI";
          case 5:
            return "price_1P5E6yGRyqashQ2wJSwAp5cB";
          case 10:
            return "price_1P5E7BGRyqashQ2wEBbmiQz3";
          case 15:
            return "price_1P5E7MGRyqashQ2wrAQ0tmeX";
          case 25:
            return "price_1P5E7YGRyqashQ2woyHdoCwQ";
          case 40:
            return "price_1P5E7lGRyqashQ2wOgJJogaN";
            default:
                return ""
        }
      };

      const subscriptionId = calculateEnterprisePrice();

    const [isLoading, setIsLoading] = useState(false)

    const onSubscribe = async () => {
        try {
            setIsLoading(true);
            const values = {
                subscription: "ENTERPRISE",
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
            let price;
            //@ts-ignore
            if(existingSubscription.subscriptionType === "BASIS") {
                price = 2400
            } else {
                price = 1000
            }
            
            const values = {
                subscription: "ENTERPRISE",
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
            existingSubscription?.subscriptionType !== "ENTERPRISE" ? (
                existingSubscription ? (
                    <Button className="w-full text-sm bg-blue-800 hover:bg-blue-900 text-gray-200 mt-2 mb-2" 
                        onClick={onUpgrade}>
                        Upgraden
                    </Button >
                ) : (
                    <Button className="w-full text-sm bg-blue-800 hover:bg-blue-900 text-gray-200 mt-2 mb-2" 
                        onClick={onSubscribe}>
                        Jetzt starten
                    </Button >
                )
            ) : (
                <Button className="w-full text-sm bg-blue-800 hover:bg-blue-900 text-gray-200 mt-2 mb-2" onClick={onSubscribe}>
                    <CheckIcon className="mr-2" />im Besitz
                </Button>
            )}
        </>
    );
}

export default EnterpriseButton;