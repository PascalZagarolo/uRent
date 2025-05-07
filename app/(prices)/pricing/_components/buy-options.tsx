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

import { GiUpgrade } from "react-icons/gi";
import { isBefore, isAfter } from 'date-fns';

interface BuyOptionsProps {
    currentUserId: string;
    existingSubscription: typeof userSubscription.$inferSelect;
}

const BuyOptions: React.FC<BuyOptionsProps> = ({
    currentUserId,
    existingSubscription
}) => {

    const [amountInserat, setAmountInserat] = useState(existingSubscription ? Number(existingSubscription?.amount) : 1);
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
                    return 101;
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
                return 101;
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
            <div className="w-full sm:flex sm:p-0 sm:px-4 px-2  sm:space-x-4 items-center">
                <div className="ml-auto sm:mt-0 mt-4 flex sm:justify-end text-sm font-medium">
                    Wie viele Inserate möchtest du schalten?
                </div>
                <div className="sm:px-4 sm:mt-0 mt-2 sm:mb-0 mb-2">
                    <Select onValueChange={(value) => setAmountInserat(Number(value))} value={String(amountInserat)}>
                        {existingSubscription?.isGift && !isAfter(new Date(), existingSubscription?.stripe_current_period_end) ? (
                            <SelectTrigger
                                className="sm:w-[200px] rounded-xl border border-indigo-200 bg-white dark:bg-[#23244a] dark:border-indigo-800 shadow-md px-4 py-3 text-indigo-800 dark:text-indigo-200 font-semibold text-base focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                                disabled
                            >
                                <div className="font-bold text-indigo-800 dark:text-indigo-200">Geschenkabo</div>
                            </SelectTrigger>
                        ) : (
                            <SelectTrigger
                                className="sm:w-[200px] rounded-xl border border-indigo-200 bg-white dark:bg-[#23244a] dark:border-indigo-800 shadow-md px-4 py-3 text-indigo-800 dark:text-indigo-200 font-semibold text-base focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all"
                            >
                                <SelectValue placeholder="Anzahl Inserate" />
                            </SelectTrigger>
                        )}
                        <SelectContent className="rounded-xl border border-indigo-200 dark:border-indigo-800 bg-white dark:bg-[#23244a] shadow-lg">
                            <SelectItem value="1" disabled={existingSubscription && 1 < Number(existingSubscription?.amount) ? true : false}>
                                bis zu 1 Inserat
                            </SelectItem>
                            <SelectItem value="5" disabled={existingSubscription && 5 < Number(existingSubscription?.amount) ? true : false}>
                                bis zu 5 Inserate
                            </SelectItem>
                            <SelectItem value="10" disabled={existingSubscription && 10 < Number(existingSubscription?.amount) ? true : false}>
                                bis zu 10 Inserate
                            </SelectItem>
                            <SelectItem value="15" disabled={existingSubscription && 15 < Number(existingSubscription?.amount) ? true : false}>
                                bis zu 15 Inserate
                            </SelectItem>
                            <SelectItem value="25" disabled={existingSubscription && 25 < Number(existingSubscription?.amount) ? true : false}>
                                bis zu 25 Inserate
                            </SelectItem>
                            <SelectItem value="35" disabled={existingSubscription && 35 < Number(existingSubscription?.amount) ? true : false}>
                                bis zu 35 Inserate
                            </SelectItem>
                            <SelectItem value="50" disabled={existingSubscription && 50 < Number(existingSubscription?.amount) ? true : false}>
                                bis zu 50 Inserate
                            </SelectItem>
                            <SelectItem value="65" disabled={existingSubscription && 65 < Number(existingSubscription?.amount) ? true : false}>
                                bis zu 65 Inserate
                            </SelectItem>
                            <SelectItem value="80" disabled={existingSubscription && 80 < Number(existingSubscription?.amount) ? true : false}>
                                bis zu 80 Inserate
                            </SelectItem>
                            <SelectItem value="100" disabled={existingSubscription && 100 < Number(existingSubscription?.amount) ? true : false}>
                                bis zu 100 Inserate
                            </SelectItem>
                            <SelectItem value="250" disabled={existingSubscription && 250 < Number(existingSubscription?.amount) ? true : false}>
                                über 100 Inserate
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            {existingSubscription && (
                <div className="flex text-lg font-semibold items-center sm:mt-0 mt-2 ">
                    <GiUpgrade className="w-6 h-6 mr-2 text-indigo-600" />   Bestehenden Plan Upgraden
                </div>
            )}
            <div className="w-full  sm:mt-0 lg:flex lg:space-x-6 space-y-6 lg:space-y-0  sm:p-4  p-2">
                {/* Basis */}
                <div className="lg:w-1/3 w-full min-h-[480px] bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-[#23244a] dark:via-[#181a2a] dark:to-[#23244a] p-8 rounded-2xl shadow-xl border border-indigo-100 dark:border-indigo-800 flex flex-col items-center transition-transform duration-200 hover:scale-[1.03]">
                    <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-200 mb-1">Basis</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-300 mb-4 h-[32px] text-center">Das Basis Paket für den Einstieg in die Welt von uRent.</p>
                    <div className="w-full flex flex-col items-center flex-1">
                        <BasisButton
                            selectedAmount={amountInserat}
                            //@ts-ignore
                            existingSubscription={existingSubscription}
                            userId={currentUserId}
                            diffrence={basisDiffrence}
                        />
                        <div className="w-full flex justify-center mt-6">
                            {!canUpgradeBasis ? (
                                existingSubscription ? (
                                    <div className="flex items-end gap-2">
                                        <span className="text-2xl font-bold text-indigo-400">im Besitz</span>
                                    </div>
                                ) : (
                                    <div className="flex items-end gap-2">
                                        <span className="text-3xl font-extrabold text-indigo-700 dark:text-indigo-200">{basisPrice} €</span>
                                        <span className="text-xs text-gray-400">/Monat</span>
                                    </div>
                                )
                            ) : (
                                <div className="flex items-end gap-2">
                                    <span className="text-3xl font-extrabold text-indigo-700 dark:text-indigo-200">{basisDiffrence} €</span>
                                    <span className="text-xs text-gray-400">danach {basisPrice} € /Monat</span>
                                </div>
                            )}
                        </div>
                        <Separator className="w-full my-6 bg-indigo-100 dark:bg-indigo-800" />
                        <h1 className="text-xs text-indigo-700 dark:text-indigo-200 font-semibold mb-2">Enthält:</h1>
                        <ol className="space-y-1 font-medium text-sm text-gray-700 dark:text-gray-200 w-full">
                            <li className="flex items-center"><span className="flex-shrink-0 w-7 flex justify-center items-center"><FaCheck className="text-indigo-400 w-4 h-4" /></span><span className="ml-2">Basispaket</span></li>
                            <li className="flex items-center"><span className="flex-shrink-0 w-7 flex justify-center items-center"><FaCheck className="text-indigo-400 w-4 h-4" /></span><span className="ml-2">Fahrzeuge und Verfügbarkeiten verwalten</span></li>
                        </ol>
                    </div>
                </div>
                {/* Premium */}
                <div className="lg:w-1/3 w-full min-h-[480px] bg-gradient-to-br from-indigo-50 via-indigo-100 to-indigo-200 dark:from-indigo-900 dark:via-indigo-800 dark:to-indigo-700 p-8 rounded-2xl shadow-2xl border-2 border-indigo-500 flex flex-col items-center relative transition-transform duration-200 hover:scale-[1.05]">
                    <div className="absolute -top-4 right-4 px-3 py-1 bg-indigo-600 text-xs font-bold rounded-full shadow-md text-white">Premium</div>
                    <h3 className="text-lg font-extrabold text-indigo-800 dark:text-indigo-200 mb-1 flex items-center gap-2">Premium</h3>
                    <p className="text-xs text-indigo-900 dark:text-indigo-200 mb-4 h-[32px] text-center">Für den ambitionierten Vermieter. Mehr Funktionen, mehr Möglichkeiten, mehr Kunden.</p>
                    <div className="w-full flex flex-col items-center flex-1">
                        <PremiumButton
                            selectedAmount={amountInserat}
                            //@ts-ignore
                            existingSubscription={existingSubscription}
                            userId={currentUserId}
                            diffrence={premiumDiffrence}
                        />
                        <div className="w-full flex justify-center mt-6">
                            {!canUpgradePremium ? (
                                existingSubscription ? (
                                    <div className="flex items-end gap-2">
                                        <span className="text-2xl font-bold text-indigo-400">im Besitz</span>
                                    </div>
                                ) : (
                                    <div className="flex items-end gap-2">
                                        <span className="text-3xl font-extrabold text-indigo-800 dark:text-indigo-200">{premiumPrice} €</span>
                                        <span className="text-xs text-indigo-400">/Monat</span>
                                    </div>
                                )
                            ) : (
                                <div className="flex items-end gap-2">
                                    <span className="text-3xl font-extrabold text-indigo-800 dark:text-indigo-200">{premiumDiffrence} €</span>
                                    <span className="text-xs text-indigo-400">danach {premiumPrice} € /Monat</span>
                                </div>
                            )}
                        </div>
                        <Separator className="w-full my-6 bg-indigo-200 dark:bg-indigo-700" />
                        <h1 className="text-xs text-indigo-700 dark:text-indigo-200 font-semibold mb-2">Enthält:</h1>
                        <ol className="space-y-1 font-medium text-sm text-indigo-900 dark:text-indigo-100 w-full">
                            <li className="flex items-center"><span className="flex-shrink-0 w-7 flex justify-center items-center"><FaCheck className="text-indigo-400 w-4 h-4" /></span><span className="ml-2">Basispaket</span></li>
                            <li className="flex items-center"><span className="flex-shrink-0 w-7 flex justify-center items-center"><FaCheck className="text-indigo-400 w-4 h-4" /></span><span className="ml-2">Fahrzeuge und Verfügbarkeiten verwalten</span></li>
                            <li className="flex items-center"><span className="flex-shrink-0 w-7 flex justify-center items-center"><FaCheck className="text-indigo-400 w-4 h-4" /></span><span className="ml-2">Priorisierung bei der Suche</span></li>
                            <li className="flex items-center"><span className="flex-shrink-0 w-7 flex justify-center items-center"><FaCheck className="text-indigo-400 w-4 h-4" /></span><span className="ml-2">Farbliche Hervorhebung von bis zu 1 Inserat</span></li>
                        </ol>
                    </div>
                </div>
                {/* Enterprise */}
                <div className="lg:w-1/3 w-full min-h-[480px] bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-[#23244a] dark:via-[#181a2a] dark:to-[#23244a] p-8 rounded-2xl shadow-xl border border-indigo-100 dark:border-indigo-800 flex flex-col items-center transition-transform duration-200 hover:scale-[1.03]">
                    <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-200 mb-1">Enterprise</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-300 mb-4 h-[32px] text-center">Die All-in-One Lösung für ihr Unternehmen. Vermieten war noch nie so einfach.</p>
                    <div className="w-full flex flex-col items-center flex-1">
                        <EnterpriseButton
                            selectedAmount={amountInserat}
                            //@ts-ignore
                            existingSubscription={existingSubscription}
                            userId={currentUserId}
                            diffrence={enterpriseDiffrence}
                        />
                        <div className="w-full flex justify-center mt-6">
                            {!canUpgradeEnterprise ? (
                                existingSubscription ? (
                                    <div className="flex items-end gap-2">
                                        <span className="text-2xl font-bold text-indigo-400">im Besitz</span>
                                    </div>
                                ) : (
                                    <div className="flex items-end gap-2">
                                        <span className="text-3xl font-extrabold text-indigo-700 dark:text-indigo-200">{enterprisePrice} €</span>
                                        <span className="text-xs text-gray-400">/Monat</span>
                                    </div>
                                )
                            ) : (
                                <div className="flex items-end gap-2">
                                    <span className="text-3xl font-extrabold text-indigo-700 dark:text-indigo-200">{enterpriseDiffrence} €</span>
                                    <span className="text-xs text-gray-400">danach {enterprisePrice} € /Monat</span>
                                </div>
                            )}
                        </div>
                        <Separator className="w-full my-6 bg-indigo-100 dark:bg-indigo-800" />
                        <h1 className="text-xs text-indigo-700 dark:text-indigo-200 font-semibold mb-2">Enthält:</h1>
                        <ol className="space-y-1 font-medium text-sm text-gray-700 dark:text-gray-200 w-full">
                            <li className="flex items-center"><span className="flex-shrink-0 w-7 flex justify-center items-center"><FaCheck className="text-indigo-400 w-4 h-4" /></span><span className="ml-2">Basispaket</span></li>
                            <li className="flex items-center"><span className="flex-shrink-0 w-7 flex justify-center items-center"><FaCheck className="text-indigo-400 w-4 h-4" /></span><span className="ml-2">Fahrzeuge und Verfügbarkeiten verwalten</span></li>
                            <li className="flex items-center"><span className="flex-shrink-0 w-7 flex justify-center items-center"><FaCheck className="text-indigo-400 w-4 h-4" /></span><span className="ml-2">Priorisierung bei der Suche</span></li>
                            <li className="flex items-center"><span className="flex-shrink-0 w-7 flex justify-center items-center"><FaCheck className="text-indigo-400 w-4 h-4" /></span><span className="ml-2">Farbliche Hervorhebung von bis zu 2 Inseraten</span></li>
                            <li className="flex items-center"><span className="flex-shrink-0 w-7 flex justify-center items-center"><FaCheck className="text-indigo-400 w-4 h-4" /></span><span className="ml-2">uRent Mieter- & Buchungsverwaltungssystem</span></li>
                            <li className="flex items-center"><span className="flex-shrink-0 w-7 flex justify-center items-center"><FaCheck className="text-indigo-400 w-4 h-4" /></span><span className="ml-2">Enterprise Betriebsstempel</span></li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BuyOptions;