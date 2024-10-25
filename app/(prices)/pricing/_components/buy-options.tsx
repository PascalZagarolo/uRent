'use client'


import { Badge } from "@/components/ui/badge";

import { Separator } from "@/components/ui/separator";

import { inserat, userSubscription } from "@/db/schema";

import { FaCheck, FaFireFlameCurved } from "react-icons/fa6";

import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import EnterpriseButton from "./_buy-buttons.tsx/enterprise-button";
import PremiumButton from "./_buy-buttons.tsx/premium-button";
import BasisButton from "./_buy-buttons.tsx/basis-button";
import { MdUpgrade } from "react-icons/md";
import { GiUpgrade } from "react-icons/gi";

interface BuyOptionsProps {
    currentUserId: string;
    existingSubscription: typeof userSubscription.$inferSelect;
}

const BuyOptions: React.FC<BuyOptionsProps> = ({
    currentUserId,
    existingSubscription
}) => {

    const [amountInserat, setAmountInserat] = useState(1)
    const [basisPrice, setBasisPrice] = useState(25);
    const [premiumPrice, setPremiumPrice] = useState(25);
    const [enterprisePrice, setEnterprisePrice] = useState(25);

    const [basisDiffrence, setBasisDiffrence] = useState(0);
    const [premiumDiffrence, setPremiumDiffrence] = useState(0);
    const [enterpriseDiffrence, setEnterpriseDiffrence] = useState(0);

    useEffect(() => {
        // Function to calculate basis price based on amountInserat
        const calculateBasisPrice = () => {
            switch (amountInserat) {
                case 1:
                    return 29;
                case 5:
                    return 44;
                case 10:
                    return 50;
                case 15:
                    return 58;
                case 25:
                    return 73;
                case 35:
                    return 78;
                case 50:
                    return 87;
                case 65:
                    return 93;
                case 80:
                    return 102;
                case 100:
                    return 111;
                case 250:
                    return 122;
                default:
                    return /* Default calculation */;
            }
        };

        const calculatePremiumPrice = () => {
            switch (amountInserat) {
                case 1:
                    return 35;
                case 5:
                    return 53;
                case 10:
                    return 59;
                case 15:
                    return 70;
                case 25:
                    return 88;
                case 35:
                    return 95;
                case 50:
                    return 105;
                case 65:
                    return 112;
                case 80:
                    return 123;
                case 100:
                    return 133;
                case 250:
                    return 147;
                default:
                    return /* Default calculation */;
            }
        };

        const calculateEnterprisePrice = () => {
            switch (amountInserat) {
                case 1:
                    return 49;
                case 5:
                    return 74;
                case 10:
                    return 84;
                case 15:
                    return 90;
                case 25:
                    return 123;
                case 35:
                    return 132;
                case 50:
                    return 147;
                case 65:
                    return 157;
                case 80:
                    return 172;
                case 100:
                    return 187;
                case 250:
                    return 206;
            }
        };



        setBasisPrice(calculateBasisPrice());
        setPremiumPrice(calculatePremiumPrice());
        setEnterprisePrice(calculateEnterprisePrice());

        setBasisDiffrence((calculateBasisPrice() - existingSubscriptionWorth) > 10 ? (calculateBasisPrice() - existingSubscriptionWorth) : 10);
        setPremiumDiffrence((calculatePremiumPrice() - existingSubscriptionWorth) > 10 ? (calculatePremiumPrice() - existingSubscriptionWorth) : 10);
        setEnterpriseDiffrence((calculateEnterprisePrice() - existingSubscriptionWorth) > 10 ? (calculateEnterprisePrice() - existingSubscriptionWorth) : 10);
    }, [amountInserat]);

    const calculateBasisPrice = (amount: number) => {
        switch (amount) {
            case 1:
                return 29;
            case 5:
                return 44;
            case 10:
                return 50;
            case 15:
                return 58;
            case 25:
                return 73;
            case 35:
                return 78;
            case 50:
                return 87;
            case 65:
                return 93;
            case 80:
                return 102;
            case 100:
                return 111;
            case 250:
                return 122;
            default:
                return /* Default calculation */;
        }
    };

    const calculatePremiumPrice = (amount: number) => {
        switch (amount) {
            case 1:
                return 35;
            case 5:
                return 53;
            case 10:
                return 59;
            case 15:
                return 70;
            case 25:
                return 88;
            case 35:
                return 95;
            case 50:
                return 105;
            case 65:
                return 112;
            case 80:
                return 123;
            case 100:
                return 133;
            case 250:
                return 147;
            default:
                return /* Default calculation */;
        }
    };

    const calculateEnterpriseP = (amount: number) => {
        switch (amount) {
            case 1:
                return 49;
            case 5:
                return 74;
            case 10:
                return 84;
            case 15:
                return 90;
            case 25:
                return 123;
            case 35:
                return 132;
            case 50:
                return 147;
            case 65:
                return 157;
            case 80:
                return 172;
            case 100:
                return 187;
            case 250:
                return 206;
            default:
                return /* Default calculation */;
        }
    };

    const canUpgradePremium = (existingSubscription && amountInserat > Number(existingSubscription?.amount) ||
        //@ts-ignore
        (existingSubscription && amountInserat === Number(existingSubscription?.amount) && existingSubscription?.subscriptionType === "BASIS")
    )

    const canUpgradeBasis = (existingSubscription && amountInserat > Number(existingSubscription?.amount))

    const canUpgradeEnterprise = (
        existingSubscription && amountInserat > Number(existingSubscription?.amount) ||
        //@ts-ignore
        (existingSubscription && amountInserat === Number(existingSubscription?.amount) && existingSubscription?.subscriptionType !== "ENTERPRISE")
    )

    let existingSubscriptionWorth: any;

    switch (existingSubscription?.subscriptionType) {
        case "BASIS":
            existingSubscriptionWorth = calculateBasisPrice(existingSubscription.amount);
            break;
        case "PREMIUM":
            existingSubscriptionWorth = calculatePremiumPrice(existingSubscription.amount);
            break;
        case "ENTERPRISE":
            existingSubscriptionWorth = calculateEnterpriseP(existingSubscription.amount);
            break;
    }



    return (
        <div>
            <div className="w-full sm:flex sm:p-0 p-2  sm:space-x-4 items-center">
                <div className="ml-auto sm:mt-0 mt-4 flex sm:justify-end text-sm font-medium">
                    Wie viele Inserate möchtest du schalten?
                </div>
                <div className="">
                    <Select onValueChange={(value) => setAmountInserat(Number(value))} value={String(amountInserat)}>
                        <SelectTrigger className="sm:w-[180px] dark:bg-[#171717] dark:border-none"

                        >
                            <SelectValue placeholder="Anzahl Inserate" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-[#171717] dark:border-none">
                            <SelectItem value="1">bis zu 1 Inserat</SelectItem>
                            <SelectItem value="5">bis zu 5 Inserate</SelectItem>
                            <SelectItem value="10">bis zu 10 Inserate</SelectItem>
                            <SelectItem value="15">bis zu 15 Inserate</SelectItem>
                            <SelectItem value="25">bis zu 25 Inserate</SelectItem>
                            <SelectItem value="35">bis zu 35 Inserate</SelectItem>
                            <SelectItem value="50">bis zu 50 Inserate</SelectItem>
                            <SelectItem value="65">bis zu 65 Inserate</SelectItem>
                            <SelectItem value="80">bis zu 80 Inserate</SelectItem>
                            <SelectItem value="100">bis zu 100 Inserate</SelectItem>
                            <SelectItem value="250">über 100 Inserate</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            {existingSubscription && (
                <div className="flex text-lg font-semibold items-center sm:mt-0 mt-2 ">
                    <GiUpgrade className="w-6 h-6 mr-2 text-indigo-600" />   Bestehenden Plan Upgraden
                </div>
            )}
            <div className="w-full  sm:mt-0 sm:flex sm:space-x-4 space-y-4 sm:space-y-0  sm:p-4  p-2">

                <div className="sm:w-1/3 w-full dark:bg-[#232323] p-4 rounded-md shadow-xl">
                <h3 className="text-md ">
                        Basis
                    </h3>
                    <p className="text-xs dark:text-gray-200/70 mt-1 h-[32px]">
                        Das Basis Paket für den Einstieg in die Welt von uRent.
                    </p>
                    <div className="w-full ">

                        <BasisButton
                            selectedAmount={amountInserat}
                            //@ts-ignore
                            existingSubscription={existingSubscription}
                            userId={currentUserId}
                            diffrence={basisDiffrence}
                        />

                        <div className="w-full flex mt-2">
                            {!canUpgradeBasis ? (
                                existingSubscription ? (
                                    <div className="flex">
                                        <div className="sm:text-4xl text-xl font-bold">im Besitz</div>
                                        
                                    </div>
                                ) : (
                                    <div className="flex">
                                        <div className="sm:text-4xl text-xl font-bold">{basisPrice} €</div>
                                        <div className="text-xs text-gray-200/70 px-1">/Monat</div>
                                    </div>
                                )
                            ) : (
                                <div className="">
                                    <div className="sm:text-4xl text-xl font-bold">{basisDiffrence} €</div>
                                    <div className="text-xs dark:text-gray-200/60">
                                    danach {basisPrice} € /Monat
                                </div>
                                </div>
                            )}
                        </div>

                        <div className="w-full mt-4">
                            <Separator className="w-full bg-[#1C1C1C]" />
                            <div>
                                <h1 className="dark:text-gray-200/50 text-xs  mt-4">
                                    Enthält:
                                </h1>
                                <div className="mt-4">
                                    <ol className="space-y-1 font-semibold">
                                        <li className="flex text-sm">
                                            <div><FaCheck className="text-blue-900 w-4 h-4 mr-2" /></div> Basispaket
                                        </li>
                                        <li className="flex text-sm">
                                            <div><FaCheck className="text-blue-900 w-4 h-4 mr-2" /></div> Fahrzeuge und Verfügbarkeiten verwalten
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="sm:w-1/3 w-full border-blue-900  border-2 dark:bg-[#232323] p-4 rounded-md shadow-xl">
                    <h3 className="text-lg font-semibold w-full flex">
                        Premium <div className="ml-auto"> <Badge className="bg-blue-900 hover:bg-blue-700 text-gray-100"> Am beliebtesten <FaFireFlameCurved className="w-4 h-4 ml-2" /> </Badge> </div>
                    </h3>
                    <p className="text-xs dark:text-gray-200/70 h-[32px]">
                        Für den ambitionierten Vermieter. Mehr Funktionen, mehr Möglichkeiten, mehr Kunden.
                    </p>

                    <PremiumButton
                        selectedAmount={amountInserat}
                        //@ts-ignore
                        existingSubscription={existingSubscription}
                        userId={currentUserId}
                        diffrence={premiumDiffrence}
                    />

                    <div className="w-full flex mt-2">
                        {!canUpgradePremium ? (

                            existingSubscription ? (
                                <div className="flex">
                                    <div className="sm:text-4xl text-xl font-bold">
                                        im Besitz</div>

                                </div>
                            ) : (
                                <div className="flex">
                                    <div className="text-4xl font-bold">
                                        {premiumPrice}   €</div>
                                    <div className="text-xs text-gray-200/70 px-1">/Monat</div>
                                </div>
                            )

                        ) : (
                            <div className="">
                                <div className="text-4xl font-bold">
                                    {premiumDiffrence}   €</div>
                                    <div className="text-xs dark:text-gray-200/60">
                                    danach {premiumPrice} € /Monat
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="w-full mt-4">
                        <Separator className="w-full bg-[#1C1C1C]" />
                        <div>
                            <h1 className="dark:text-gray-200/50 text-xs  mt-4">
                                Enthält:
                            </h1>
                            <div className="mt-4">
                                <ol className="space-y-2 font-medium break-words">
                                    <li className="flex text-sm">
                                        <div><FaCheck className="text-blue-900 w-4 h-4 mr-2" /></div> Basispaket
                                    </li>
                                    <li className="flex text-sm">
                                        <div><FaCheck className="text-blue-900 w-4 h-4 mr-2" /></div>Fahrzeuge und Verfügbarkeiten verwalten
                                    </li>
                                    <li className="flex text-sm">
                                        <div><FaCheck className="text-blue-900 w-4 h-4 mr-2" /></div> Priorisierung bei der Suche
                                    </li>
                                    <li className="flex text-sm">
                                        <div><FaCheck className="text-blue-900 w-4 h-4 mr-2" /></div> Farbliche Hervorhebung von
                                        bis zu 1 Inserat
                                    </li>

                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sm:w-1/3 w-full dark:bg-[#232323] p-4 rounded-md shadow-xl">
                    <h3 className="text-lg font-semibold">
                        Enterprise
                    </h3>
                    <p className="text-xs dark:text-gray-200/70">
                        Die All-in-One Lösung für ihr Unternehmen. Vermieten war noch nie so einfach.
                    </p>

                    <EnterpriseButton
                        selectedAmount={amountInserat}
                        //@ts-ignore
                        existingSubscription={existingSubscription}
                        userId={currentUserId}
                        diffrence={enterpriseDiffrence}
                    />

                    <div className="w-full flex mt-2">
                        {!canUpgradeEnterprise ? (
                            existingSubscription ? (
                                <div className="flex">

                                <div className="sm:text-4xl text-xl font-bold">im Besitz</div>
                                
                            </div>
                            ) : (
                                <div className="flex">

                                <div className="sm:text-4xl text-xl font-bold">{enterprisePrice} €</div>
                                <div className="text-xs text-gray-200/70 px-1">/Monat</div>
                            </div>
                            )
                        ) : (
                            <div className="">

                                <div className="sm:text-4xl text-xl font-bold">{enterpriseDiffrence} €</div>
                                <div className="text-xs dark:text-gray-200/60">
                                    danach {enterprisePrice} € /Monat
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="w-full mt-4">
                        <Separator className="w-full bg-[#1C1C1C]" />
                        <div>
                            <h1 className="dark:text-gray-200/50 text-xs  mt-4">
                                Enthält:
                            </h1>
                            <div className="mt-4">
                                <div className="space-y-2 font-medium break-words">
                                    <li className="flex text-sm">
                                        <div><FaCheck className="text-blue-900 w-4 h-4 mr-2" /></div> Basispaket
                                    </li>
                                    <li className="flex text-sm">
                                        <div> <FaCheck className="text-blue-900 w-4 h-4 mr-2" /></div> Fahrzeuge und Verfügbarkeiten verwalten
                                    </li>
                                    <li className="flex text-sm">
                                        <div><FaCheck className="text-blue-900 w-4 h-4 mr-2" /></div> Priorisierung bei der Suche
                                    </li>
                                    <li className="flex text-sm">
                                        <div><FaCheck className="text-blue-900 w-4 h-4 mr-2" /></div>
                                        Farbliche Hervorhebung von bis
                                        2 Inseraten
                                    </li>
                                    <li className="flex text-sm">
                                        <div><FaCheck className="text-blue-900 w-4 h-4 mr-2" /></div> uRent Mieter- & Buchungsverwaltungssystem
                                    </li>
                                    <li className="flex text-sm">
                                        <div><FaCheck className="text-blue-900 w-4 h-4 mr-2" /></div> Enterprise Betriebsstempel
                                    </li>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default BuyOptions;