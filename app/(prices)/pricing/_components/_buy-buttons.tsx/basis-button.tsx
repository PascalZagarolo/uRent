'use client'

import { Button } from "@/components/ui/button";
import { userSubscription } from "@/db/schema";


import axios from "axios";

import { CheckIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
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


    // const calculateBasisPrice = () => {
    //     switch (selectedAmount) {
    //         case 1:
    //             return "prod_PtR8PGAnWvM9nW";
    //         case 5:
    //             return "prod_Pv48D9B2K1BgJ0";
    //         case 10:
    //             return "prod_Pv4AzleLuJaR9j";
    //         case 15:
    //             return "prod_Pv4AbOgkOYWJJt";
    //         case 25:
    //             return "prod_Pv4B2zmZ19Apen";
    //         case 35:
    //             return "prod_Pv4BipnesUBoNJ";
    //         case 50:
    //             return "prod_Q20K4v8dmCv6bn";
    //         case 65:
    //             return "prod_Q20KFG8pPNIG7d";
    //         case 80:
    //             return "prod_Q20LBBjGUKhBfC";
    //         case 100:
    //             return "prod_Q20MzN3iFoqH2Q";
    //         case 250:
    //             return "prod_Q20MuQfWTXNX7L";
    //         default:
    //             return ""
    //     }
    // };

    const calculateBasisPrice = () => {
        switch (selectedAmount) {
            case 1:
                return "prod_RK0WycHV8yApMH";
            case 5:
                return "prod_RK0W2S3cToAp2U";
            case 10:
                return "prod_RK0WLWhZi2Jc7D";
            case 15:
                return "prod_RK0VHVRrCbio2f";
            case 25:
                return "prod_RK0VmxWN4bZg5u";
            case 35:
                return "prod_RK0VB5jvMnCAfg";
            case 50:
                return "prod_RK0SU7IX4CqPtO";
            case 65:
                return "prod_RK0bxCsTaP3NQa";
            case 80:
                return "prod_RK0SEusOLhIxZi";
            case 100:
                return "prod_RK0Sa9tFRmSZRa";
            case 250:
                return "prod_RK0SUEo0h0hHfd";
            default:
                return "";
        }
    };
    

    const productId = calculateBasisPrice();

    const router = useRouter();

    const onSubscribe = async () => {
        try {
            setIsLoading(true);
            const values = {
                subscriptionType: "BASIS",
                productId: productId,
                amount: selectedAmount,
                ...usedId && { usedId: usedId  }
            }
            if(!userId) {
                return router.push("/login")
            }
            const res = await axios.patch(`/api/stripe/user/${userId}`, values);
            window.location.href = res.data.url
        } catch(e : any) {
            console.log(e)
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
                subscriptionType: "BASIS",
                ...usedId && { usedId: usedId }
            }

            const res = await axios.patch(`/api/stripe/upgrade/${userId}`, values);
            window.location.href = res.data.url
        } catch(e : any) {
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
                        <Button className="w-full text-sm bg-gray-100 text-indigo-300 border border-gray-200 shadow-sm mt-2 mb-2 rounded-xl font-semibold cursor-not-allowed" disabled>
                            <CheckIcon className="mr-2 w-4 h-4 text-indigo-200" />   Bereits enthalten
                        </Button >
                    ) : (
                        <Button className="w-full text-sm bg-white text-indigo-700 border border-indigo-300 shadow-sm hover:bg-indigo-700 hover:text-white hover:border-indigo-700 transition-colors duration-200 mt-2 mb-2 rounded-xl font-semibold" onClick={onUpgrade}>
                            Upgraden
                        </Button>
                    )
                ) : (
                    <Button className="w-full text-sm bg-white text-indigo-700 border border-indigo-300 shadow-sm hover:bg-indigo-700 hover:text-white hover:border-indigo-700 transition-colors duration-200 mt-2 mb-2 rounded-xl font-semibold" onClick={onSubscribe}>
                        Vorteile sichern
                    </Button>
                )}
        </>
    );
}

export default BasisButton;