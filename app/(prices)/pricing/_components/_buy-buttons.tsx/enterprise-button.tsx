'use client'

import { Button } from "@/components/ui/button";
import { userSubscription } from "@/db/schema";

import { CheckIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast, { CheckmarkIcon } from "react-hot-toast";



interface EnterpriseButtonProps {
    selectedAmount: number;
    existingSubscription?: typeof userSubscription;
    userId: string;
    diffrence: number;
}

const EnterpriseButton: React.FC<EnterpriseButtonProps> = ({
    selectedAmount,
    existingSubscription,
    userId,
    diffrence
}) => {

    const searchParams = useSearchParams();
    const usedId = searchParams.get("inseratId");

   

    // const calculateEnterprisePrice = () => {
    //     switch (selectedAmount) {
    //         case 1:
    //             return "prod_PtR9L9XRjwzC0N";
    //         case 5:
    //             return "prod_Pv4FF7MAUT1wGI";
    //         case 10:
    //             return "prod_Pv4FiNttsprGyN";
    //         case 15:
    //             return "prod_Pv4Fl9cfjK2RqC";
    //         case 25:
    //             return "prod_Pv4GtxdFiRuu1P";
    //         case 35:
    //             return "prod_Pv4Gh88pCZq6ao";
    //         case 50:
    //             return "prod_Q200a6I4WAhns9";
    //         case 65:
    //             return "prod_Q200PwTz5sLcDD";
    //         case 80:
    //             return "prod_Q2017X3zQWhFyu";
    //         case 100:
    //             return "prod_Q201WTq6XQ348g";
    //         case 250:
    //             return "prod_Q2021mUCfveige";
    //         default:
    //             return ""
    //     }
    // };

    const calculateEnterprisePrice = () => {
        switch (selectedAmount) {
            case 1:
                return "prod_RK0WvvWoeRgn6u";
            case 5:
                return "prod_RK0V0veCyHxpgH";
            case 10:
                return "prod_RK0Va4ZdsE6u4H";
            case 15:
                return "prod_RK0V0RnQEdNuXw";
            case 25:
                return "prod_RK0V03TxG8CBPw";
            case 35:
                return "prod_RK0VxVnZxIg0sr";
            case 50:
                return "prod_RK0VrrNpyhUSUV";
            case 65:
                return "prod_RK0e48S5xFIhrU";
            case 80:
                return "prod_RK0Vn2USNEHdOq";
            case 100:
                return "prod_RK0VDVqPVC337d";
            case 250:
                return "prod_RK0VVnYuNlbNU0";
            default:
                return "";
        }
    };
    

    const productId = calculateEnterprisePrice();

    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter();

    const onSubscribe = async () => {
        try {

            setIsLoading(true);
            const values = {
                subscriptionType: "ENTERPRISE",
                productId: productId,
                amount: selectedAmount,
                ...usedId && { usedId: usedId }

            }
            console.log("gedrückt...")

            if(!userId) {
                return router.push("/login")
            }
            const res = await axios.patch(`/api/stripe/user/${userId}`, values);
            window.location.href = res.data.url
        } catch (error: any) {
            console.log(error)
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
        } catch (error: any) {
            console.log(error)
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
                            onClick={onUpgrade} disabled={isLoading}>
                            Upgraden
                        </Button >
                    ) : (
                        <Button className="w-full text-sm bg-blue-800 hover:bg-blue-900 text-gray-200 mt-2 mb-2" onClick={onSubscribe} disabled>
                            <CheckIcon className="mr-2" />im Besitz
                        </Button>
                    )
                ) : (

                    <Button className="w-full text-sm bg-blue-800 hover:bg-blue-900 text-gray-200 mt-2 mb-2"
                        onClick={onSubscribe} disabled={isLoading}>
                        Vorteile sichern
                    </Button >
                )}
        </>
    );
}

export default EnterpriseButton;