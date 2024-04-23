'use client'

import { Button } from "@/components/ui/button";
import { userSubscription } from "@/db/schema";

import { CheckIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import toast, { CheckmarkIcon } from "react-hot-toast";



interface EnterpriseButtonProps {
    selectedAmount : number;
    existingSubscription?: typeof userSubscription;
    userId : string;
    diffrence : number;
}

const EnterpriseButton : React.FC<EnterpriseButtonProps>= ({
    selectedAmount,
    existingSubscription,
    userId,
    diffrence
}) => {

    const searchParams = useSearchParams();
    const usedId = searchParams.get("inseratId");

    

    const calculateEnterprisePrice = () => {
        switch (selectedAmount) {
          case 1:
            return "prod_PtR9L9XRjwzC0N";
          case 5:
            return "prod_Pv4FF7MAUT1wGI";
          case 10:
            return "prod_Pv4FiNttsprGyN";
          case 15:
            return "prod_Pv4Fl9cfjK2RqC";
          case 25:
            return "prod_Pv4GtxdFiRuu1P";
          case 40:
            return "prod_Pv4Gh88pCZq6ao";
            default:
                return ""
        }
      };

      const productId = calculateEnterprisePrice();

    const [isLoading, setIsLoading] = useState(false)

    const onSubscribe = async () => {
        try {
            setIsLoading(true);
            const values = {
                subscriptionType: "ENTERPRISE",
                productId: productId,
                amount : selectedAmount,
                ...usedId && {usedId : usedId}
                
            }

            console.log(values)

            
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

            const values = {
                diffrence : diffrence * 100,
                productId: productId,
                subscriptionType : "ENTERPRISE",
                ...usedId && {usedId : usedId}
            }

            const res = await axios.patch(`/api/stripe/upgrade/${userId}`, values);
            window.location.href = res.data.url
        } catch {
            toast.error("Etwas ist schief gelaufen")
        } finally {
            setIsLoading(false)
        }
    }

    const canUpgrade = (
        existingSubscription && selectedAmount > Number(existingSubscription?.amount) ||
        //@ts-ignore
        (existingSubscription && selectedAmount === Number(existingSubscription?.amount) && existingSubscription?.subscriptionType !== "ENTERPRISE")
    )

    return (
        <>
            {//@ts-ignore
            existingSubscription ? (
                canUpgrade ? (
                    <Button className="w-full text-sm bg-blue-800 hover:bg-blue-900 text-gray-200 mt-2 mb-2" 
                        onClick={onUpgrade}>
                        Upgraden
                    </Button >
                ) : (
                    <Button className="w-full text-sm bg-blue-800 hover:bg-blue-900 text-gray-200 mt-2 mb-2" onClick={onSubscribe} disabled>
                    <CheckIcon className="mr-2" />im Besitz
                </Button>
                )
            ) : (
                
                <Button className="w-full text-sm bg-blue-800 hover:bg-blue-900 text-gray-200 mt-2 mb-2" 
                onClick={onSubscribe}>
                Vorteile sichern
            </Button >
            )}
        </>
    );
}

export default EnterpriseButton;