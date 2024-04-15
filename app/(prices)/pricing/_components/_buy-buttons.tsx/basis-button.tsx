'use client'

import { Button } from "@/components/ui/button";
import { userSubscription } from "@/db/schema";
import { stripe } from "@/lib/stripe";

import axios from "axios";

import { CheckIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";




interface BasisButtonProps {
    selectedAmount: number;
    existingSubscription?: typeof userSubscription;
    userId: string;
}

const BasisButton: React.FC<BasisButtonProps> = ({
    selectedAmount,
    existingSubscription,
    userId
}) => {

    const [isLoading, setIsLoading] = useState(false);


    const calculateBasisPrice = () => {
        switch (selectedAmount) {
            case 1:
                return "prod_PtR8PGAnWvM9nW";
            case 5:
                return "prod_Pv48D9B2K1BgJ0";
            case 10:
                return "prod_Pv4AzleLuJaR9j";
            case 15:
                return "prod_Pv4AbOgkOYWJJt";
            case 25:
                return "prod_Pv4B2zmZ19Apen";
            case 40:
                return "prod_Pv4B2zmZ19Apen";
            default:
                return ""
        }
    };

    const productId = calculateBasisPrice();

    

    const onSubscribe = async () => {
        try {
            setIsLoading(true);
            const values = {
                subscriptionType: "BASIS",
                productId: productId,
                amount: selectedAmount,

            }
            const res = await axios.patch(`/api/stripe/user/${userId}`, values);
            window.location.href = res.data.url
        } catch {
            toast.error("Etwas ist schief gelaufen")
        } finally {
            setIsLoading(false)
        }
    }

    const onTest = async () => {
        

        const stripe = 
        require('stripe')('sk_test_51OXL4bGRyqashQ2wAaNYkzVV68vGMgReR45Ct3q8BfZO6KCXnZ2BNhiotRuYCwAAOwQxy4iZy2B8WEgRQa2PIG2I00tApjW5eR');
        const product = await stripe.products.retrieve('prod_Pv4DPuk8W4aRCZ');

        console.log(product)

    }

    const canUpgrade = (existingSubscription && selectedAmount > Number(existingSubscription?.amount))


    return (
        <>
            {
                //@ts-ignore
                existingSubscription ? (
                    !canUpgrade ? (
                        <Button className="w-full text-sm bg-gray-200 hover:bg-gray-300 text-gray-500 mt-2 mb-2" disabled
                        >
                            <CheckIcon className="mr-2 w-4 h-4" />   Bereits enthalten
                        </Button >
                    ) : (
                        <Button className="w-full text-sm bg-blue-800 hover:bg-blue-900 text-gray-200 mt-2 mb-2" //@ts-ignore
                             onClick={onTest}>
                            Upgraden
                        </Button>
                    )
                ) : (
                    <Button className="w-full text-sm bg-gray-200 hover:bg-gray-300 text-gray-500 mt-2 mb-2" onClick={onSubscribe}>
                        <CheckIcon className="mr-2 w-4 h-4" /> Jetzt loslegen
                    </Button>
                )}
        </>
    );
}

export default BasisButton;