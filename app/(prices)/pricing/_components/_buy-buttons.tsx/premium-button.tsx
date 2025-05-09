'use client'

import { Button } from "@/components/ui/button";
import { userSubscription } from "@/db/schema";

import axios from "axios";
import { CheckIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
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

    // const calculatePremiumPrice = () => {
    //     switch (selectedAmount) {
    //         case 1:
    //             return "prod_PtR9WSahLFPqOD";
    //         case 5:
    //             return "prod_Pv4Cwyv4F8cO4D";
    //         case 10:
    //             return "prod_Pv4DPuk8W4aRCZ";
    //         case 15:
    //             return "prod_Pv4E0Xe7Y8qKng";
    //         case 25:
    //             return "prod_Pv4EsXYyaMgfSi";
    //         case 35:
    //             return "prod_Pv4FJEde6W2ReF";
    //         case 50:
    //             return "prod_Q207WlGgK5nFUN";
    //         case 65:
    //             return "prod_Q208pcSj2470c0";
    //         case 80:
    //             return "prod_Q208qdbHH1Z7EZ";
    //         case 100:
    //             return "prod_Q209LCa2h0i3kS";
    //         case 250:
    //             return "prod_Q20Azhl53HsvEi";
    //         default:
    //             return ""

    //     }
    // };

    const calculatePremiumPrice = () => {
        switch (selectedAmount) {
            case 1:
                return "prod_RK0W37qFJKWgqz";
            case 5:
                return "prod_RK0VpPiTheDO8W";
            case 10:
                return "prod_RK0VT0MFteYmbf";
            case 15:
                return "prod_RK0VLWMV7A20Ga";
            case 25:
                return "prod_RK0VeHnNu0PstL";
            case 35:
                return "prod_RK0V1qXbcSmWvD";
            case 50:
                return "prod_RK0VsbUm38kAkT";
            case 65:
                return "prod_RK0SIMvG7o3IOY";
            case 80:
                return "prod_RK0S4tkGI4KAEf";
            case 100:
                return "prod_RK0SOsIgMne6QG";
            case 250:
                return "prod_RK0StYKlyUoDfq";
            default:
                return "";
        }
    };
    

    const productId = calculatePremiumPrice();

    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter();

    const onSubscribe = async () => {
        try {
            setIsLoading(true);
            const values = {
                subscriptionType: "PREMIUM",
                productId: productId,
                amount: selectedAmount,
                ...usedId && { usedId: usedId }
            }
            if(!userId) {
                return router.push("/login")
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
                        <Button className="w-full text-sm bg-white text-indigo-700 border border-indigo-300 shadow-sm hover:bg-indigo-700 hover:text-white hover:border-indigo-700 transition-colors duration-200 mt-2 mb-2 rounded-xl font-semibold" onClick={onUpgrade}>
                            Upgraden
                        </Button>
                    ) : (
                        <Button className="w-full text-sm bg-gray-100 text-indigo-300 border border-gray-200 shadow-sm mt-2 mb-2 rounded-xl font-semibold cursor-not-allowed" disabled>
                            <CheckIcon className="mr-2 w-4 h-4 text-indigo-200" />   im Besitz
                        </Button >
                    )

                ) : (
                    <Button className="w-full text-sm bg-white text-indigo-700 border border-indigo-300 shadow-sm hover:bg-indigo-700 hover:text-white hover:border-indigo-700 transition-colors duration-200 mt-2 mb-2 rounded-xl font-semibold" onClick={onSubscribe}>
                        Vorteile sichern
                    </Button >

                )}
        </>
    );
}

export default PremiumButton;