'use client'

import { Button } from "@/components/ui/button";
import { userSubscription } from "@/db/schema";


import axios from "axios";

import { CheckIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";




interface BasisButtonProps {
    selectedAmount: number;
    existingSubscription?: typeof userSubscription;
    userId: string;
    diffrence: number;
}

const BasisButton: React.FC<BasisButtonProps> = ({
    selectedAmount,
    existingSubscription,
    userId,
    diffrence
}) => {

    const searchParams = useSearchParams();
    const usedId = searchParams.get("inseratId");

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
            case 35:
                return "prod_Pv4BipnesUBoNJ";
            case 50:
                return "prod_Q20K4v8dmCv6bn";
            case 65:
                return "prod_Q20KFG8pPNIG7d";
            case 80:
                return "prod_Q20LBBjGUKhBfC";
            case 100:
                return "prod_Q20MzN3iFoqH2Q";
            case 250:
                return "prod_Q20MuQfWTXNX7L";
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
                subscriptionType: "ENTERPRISE",
                ...usedId && { usedId: usedId }
            }

            const res = await axios.patch(`/api/stripe/upgrade/${userId}`, values);
            window.location.href = res.data.url
        } catch {
            toast.error("Etwas ist schief gelaufen")
        } finally {
            setIsLoading(false)
        }
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
                            onClick={onUpgrade}>
                            Upgraden
                        </Button>
                    )
                ) : (
                    <Button className="w-full text-sm bg-blue-800 hover:bg-blue-900 text-gray-200 mt-2 mb-2" onClick={onSubscribe}>
                        Vorteile sichern
                    </Button>
                )}
        </>
    );
}

export default BasisButton;