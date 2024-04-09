'use client'

import { Button } from "@/components/ui/button";
import { inseratSubscription } from "@/db/schema";
import axios from "axios";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";


interface PremiumButtonProps {
    inseratId?: string;
    inseratTitle: string;
    existingSubscription?: typeof inseratSubscription;

}

const PremiumButton = ({
    inseratId,
    existingSubscription,
    inseratTitle
}) => {

    const [isLoading, setIsLoading] = useState(false)

    const onSubscribe = async () => {
        try {
            setIsLoading(true);
            const values = {
                subscription: "PREMIUM",
                price: 3900,
                ...existingSubscription?.stripe_customer_id && {
                    stripe_customer_id: existingSubscription.stripe_customer_id
                },
                inseratTitle: inseratTitle
            }
            const res = await axios.patch(`/api/stripe/inserat/${inseratId}`, values);
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
                inseratTitle : inseratTitle
            }
            const res = await axios.patch(`/api/stripe/upgrade/${inseratId}`, values);
            window.location.href = res.data.url
        } catch {
            toast.error("Etwas ist schief gelaufen")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            {existingSubscription?.subscriptionType !== "PREMIUM" ? (
                existingSubscription ? (
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
                        disabled={!inseratId || existingSubscription} onClick={onSubscribe}>
                        Jetzt starten
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