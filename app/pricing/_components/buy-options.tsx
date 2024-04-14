'use client'


import { Badge } from "@/components/ui/badge";

import { Separator } from "@/components/ui/separator";

import { inserat, userSubscription } from "@/db/schema";

import { FaCheck, FaFireFlameCurved } from "react-icons/fa6";

import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import EnterpriseButton from "./buy-buttons.tsx/enterprise-button";
import PremiumButton from "./buy-buttons.tsx/premium-button";
import BasisButton from "./buy-buttons.tsx/basis-button";

interface BuyOptionsProps {
    currentUserId : string;
    existingSubscription: typeof userSubscription.$inferSelect;
}

const BuyOptions: React.FC<BuyOptionsProps> =  ({
    currentUserId,
    existingSubscription
}) => {

    const [amountInserat, setAmountInserat] = useState(1)
    const [basisPrice, setBasisPrice] = useState(25); 
    const [premiumPrice, setPremiumPrice] = useState(25); 
    const [enterprisePrice, setEnterprisePrice] = useState(25); 

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
          case 40:
            return 87;
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
          case 40:
            return 105;
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
          case 40:
            return 147;
          default:
            return /* Default calculation */;
        }
      };
  
  
      
      setBasisPrice(calculateBasisPrice());
      setPremiumPrice(calculatePremiumPrice());
      setEnterprisePrice(calculateEnterprisePrice());
    }, [amountInserat]);

 
    return (
        <div>
            <div className="w-full flex space-x-4 items-center">
                <div className="ml-auto flex justify-end text-sm font-medium">
                    Wie viele Inserate möchtest du schalten?
                </div>
                <div className="">
                    <Select onValueChange={(value) => setAmountInserat(Number(value))}>
                        <SelectTrigger className="w-[180px] dark:bg-[#171717] dark:border-none"
                        
                        >
                            <SelectValue placeholder="Anzahl Inserate" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-[#171717] dark:border-none">
                            <SelectItem value="1">bis zu 1 Inserat</SelectItem>
                            <SelectItem value="5">bis zu 5 Inserate</SelectItem>
                            <SelectItem value="10">bis zu 10 Inserate</SelectItem>
                            <SelectItem value="15">bis zu 15 Inserate</SelectItem>
                            <SelectItem value="25">bis zu 25 Inserate</SelectItem>
                            <SelectItem value="40">über 25 Inserate</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="w-full flex space-x-4 p-4 ">

                <div className="w-1/3 border-r dark:border-[#1C1C1C] dark:bg-[#232323] p-4 rounded-md">
                    <h3 className="text-md ">
                        Basis
                    </h3>
                    <p className="text-xs dark:text-gray-200/70 mt-1 h-[32px]">
                        Das Basis Paket für den Einstieg in die Welt von uRent.
                    </p>
                    <div className="w-full ">
                        
                        <BasisButton
                            selectedAmount={amountInserat}
                            existingSubscription={existingSubscription}
                            userId={currentUserId}
                        />
    
                        <div className="w-full flex mt-2">
                            <div className="flex">
                                <div className="text-4xl font-bold">{basisPrice} €</div><div className="text-xs text-gray-200/70 px-1">/Monat</div>
                            </div>
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
                                            <FaCheck className="text-blue-900 w-4 h-4 mr-2" /> Basispaket
                                        </li>

                                    </ol>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="w-1/3 border-blue-900  border-2 dark:bg-[#232323] p-4 rounded-md">
                    <h3 className="text-lg font-semibold w-full flex">
                        Premium <div className="ml-auto"> <Badge className="bg-blue-900 hover:bg-blue-700 text-gray-100"> Am beliebtesten <FaFireFlameCurved className="w-4 h-4 ml-2" /> </Badge> </div>
                    </h3>
                    <p className="text-xs dark:text-gray-200/70 h-[32px]">
                        Für den ambitionierten Vermieter. Mehr Funktionen, mehr Möglichkeiten, mehr Kunden.
                    </p>
                    
                    <PremiumButton
                        selectedAmount={amountInserat}
                        existingSubscription={existingSubscription}
                        userId={currentUserId}
                    />
                       
                    <div className="w-full flex mt-2">
                        <div className="flex">
                            <div className="text-4xl font-bold">
                                {premiumPrice}   €</div>
                            <div className="text-xs text-gray-200/70 px-1">/Monat</div>
                        </div>
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
                                        <FaCheck className="text-blue-900 w-4 h-4 mr-2" /> Basispaket
                                    </li>
                                    <li className="flex text-sm">
                                        <FaCheck className="text-blue-900 w-4 h-4 mr-2" /> Erste-Seite Inserat
                                    </li>
                                    <li className="flex text-sm">
                                        <FaCheck className="text-blue-900 w-4 h-4 mr-2" /> Farbliche Hervorhebung
                                    </li>

                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/3 dark:bg-[#232323] p-4 rounded-md">
                    <h3 className="text-lg font-semibold">
                        Enterprise
                    </h3>
                    <p className="text-xs dark:text-gray-200/70">
                        Die All-in-One Lösung für ihr Unternehmen. Vermieten war noch nie so einfach.
                    </p>
                   
                    <EnterpriseButton
                        selectedAmount={amountInserat}
                        existingSubscription={existingSubscription}
                        userId={currentUserId}
                    />
                    
                    <div className="w-full flex mt-2">
                        <div className="flex">

                            <div className="text-4xl font-bold">{enterprisePrice} €</div>
                            <div className="text-xs text-gray-200/70 px-1">/Monat</div>
                        </div>
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
                                        <FaCheck className="text-blue-900 w-4 h-4 mr-2" /> Basispaket
                                    </li>
                                    <li className="flex text-sm">
                                        <FaCheck className="text-blue-900 w-4 h-4 mr-2" /> Erste-Seite Inserat
                                    </li>
                                    <li className="flex text-sm">
                                        <FaCheck className="text-blue-900 w-4 h-4 mr-2" /> Farbliche Hervorhebung
                                    </li>
                                    <li className="flex text-sm">
                                        <FaCheck className="text-blue-900 w-4 h-4 mr-2" /> Echtzeit Analytiken
                                    </li>
                                </ol>
                                <div className="mt-2">
                                    <div className="w-full text-4xl justify-center flex">
                                        +
                                    </div>
                                </div>
                                <div className="rounded-md flex w-full justify-center mt-2  dark:bg-[#1C1C1C]">
                                    <div className="text-lg py-4 font-semibold">
                                        uRent - RMS
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BuyOptions;