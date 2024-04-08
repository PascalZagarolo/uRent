'use client'

import { Button } from "@/components/ui/button";
import { inseratSubscription } from "@/db/schema";
import { CheckIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useState } from "react";
import toast, { CheckmarkIcon } from "react-hot-toast";



interface EnterpriseButtonProps {
    inseratId?: string,
    inseratTitle: string,
    existingSubscription?: typeof inseratSubscription;
}

const EnterpriseButton = ({
    inseratId,
    existingSubscription,
    inseratTitle
}) => {

    const [isLoading, setIsLoading] = useState(false)

    const onSubscribe = async () => {
        try {
            setIsLoading(true);
            const values = {
                subscription: "ENTERPRISE",
                price: 4900,
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

    return (
        <>
            {existingSubscription?.subscriptionType !== "ENTERPRISE" ? (
                existingSubscription ? (
                    <Button className="w-full text-sm bg-blue-800 hover:bg-blue-900 text-gray-200 mt-2 mb-2" disabled={!inseratId}
                        onClick={onSubscribe}>
                        Upgraden
                    </Button >
                ) : (
                    <Button className="w-full text-sm bg-blue-800 hover:bg-blue-900 text-gray-200 mt-2 mb-2" disabled={!inseratId}
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