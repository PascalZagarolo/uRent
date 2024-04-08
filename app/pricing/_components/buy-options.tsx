import getCurrentUser from "@/actions/getCurrentUser";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import db from "@/db/drizzle";
import { inserat, inseratSubscription, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { FaCheck, FaFireFlameCurved } from "react-icons/fa6";
import BasisButton from "./buy-buttons.tsx/basis-button";
import PremiumButton from "./buy-buttons.tsx/premium-button";
import EnterpriseButton from "./buy-buttons.tsx/enterprise-button";

interface BuyOptionsProps {
    inseratId : string
}

const BuyOptions: React.FC<BuyOptionsProps> = async ({
    inseratId
}) => {

    const currentUser = await getCurrentUser();

   

    const thisInserat = await db.query.inserat.findFirst({
        where : eq(inserat.id, inseratId)
    })

    const existingSubscription = await db.query.inseratSubscription.findFirst({
        where : eq(inseratSubscription.inseratId, inseratId)
    })

    const newPremium =  existingSubscription?.subscriptionType === "BASIS" && 14 
    const newEnterprise = existingSubscription ? 
    (existingSubscription.subscriptionType === "BASIS" ? 24 :
    (existingSubscription.subscriptionType === "PREMIUM" ? 10 : null)) : null
    console.log(newEnterprise)
    return (
        <div>
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
                        inseratId={thisInserat.id}
                        existingSubscription={existingSubscription}
                        inseratTitle={thisInserat.title}
                        />
                        <div className="w-full flex mt-2">
                            <div className="flex">
                                <div className="text-4xl font-bold">25 €</div><div className="text-xs text-gray-200/70 px-1">/Monat</div>
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
                    inseratId={thisInserat.id}
                    existingSubscription={existingSubscription}
                    inseratTitle={thisInserat.title}
                    />
                    <div className="w-full flex mt-2">
                        <div className="flex">
                            <div className="text-4xl font-bold">
                               {newPremium ? (newPremium) : (39)}€</div>
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
                    inseratId={thisInserat.id}
                    existingSubscription={existingSubscription}
                    inseratTitle={thisInserat.title}
                    />
                    <div className="w-full flex mt-2">
                        <div className="flex">

                            <div className="text-4xl font-bold">{newEnterprise ? (newEnterprise) : (49)} €</div>
                            <div className="text-xs text-gray-200/70 px-1">{(!newEnterprise && !newPremium) && "/Monat"}</div>
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