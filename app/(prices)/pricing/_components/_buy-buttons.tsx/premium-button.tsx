'use client'

import { Button } from "@/components/ui/button";
import { userSubscription } from "@/db/schema";

import axios from "axios";
import { CheckIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


interface PremiumButtonProps {
    selectedAmount: number;
    existingSubscription?: typeof userSubscription;
    userId: string;
    diffrence: number;
}

const PremiumButton: React.FC<PremiumButtonProps> = ({
    selectedAmount,
    existingSubscription,
    userId,
    diffrence
}) => {

    const searchParams = useSearchParams();
    const usedId = searchParams.get("inseratId");

    const calculatePremiumPrice = () => {
        switch (selectedAmount) {
            case 1:
                return "prod_PtR9WSahLFPqOD";
            case 5:
                return "prod_Pv4Cwyv4F8cO4D";
            case 10:
                return "prod_Pv4DPuk8W4aRCZ";
            case 15:
                return "prod_Pv4E0Xe7Y8qKng";
            case 25:
                return "prod_Pv4EsXYyaMgfSi";
            case 35:
                return "prod_Pv4FJEde6W2ReF";
            case 50:
                return "prod_Q207WlGgK5nFUN";
            case 65:
                return "prod_Q208pcSj2470c0";
            case 80:
                return "prod_Q208qdbHH1Z7EZ";
            case 100:
                return "prod_Q209LCa2h0i3kS";
            case 250:
                return "prod_Q20Azhl53HsvEi";
            default:
                return ""

        }
    };

    const productId = calculatePremiumPrice();

    const [isLoading, setIsLoading] = useState(false)

    const onSubscribe = async () => {
        try {
            setIsLoading(true);
            const values = {
                subscriptionType: "PREMIUM",
                productId: productId,
                amount: selectedAmount,
                ...usedId && { usedId: usedId }
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

            const values = {
                diffrence: diffrence * 100,
                productId: productId,
                subscriptionType: "PREMIUM",
                ...usedId && { usedId: usedId }
            }
            console.log(values)
            const res = await axios.patch(`/api/stripe/upgrade/${userId}`, values);
            window.location.href = res.data.url
        } catch {
            toast.error("Etwas ist schief gelaufen")
        } finally {
            setIsLoading(false)
        }
    }

    const canUpgrade = (existingSubscription && selectedAmount > Number(existingSubscription?.amount) ||
        //@ts-ignore
        (existingSubscription && selectedAmount === Number(existingSubscription?.amount) && existingSubscription?.subscriptionType === "BASIS")
    )

    return (
        <>
            {//@ts-ignore
                existingSubscription ? (
                    canUpgrade ? (
                        //@ts-ignore

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

                )}
        </>
    );
}

export default PremiumButton;