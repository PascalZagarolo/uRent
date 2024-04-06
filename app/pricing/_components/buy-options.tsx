import getCurrentUser from "@/actions/getCurrentUser";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import db from "@/db/drizzle";
import { inserat, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { FaCheck, FaFireFlameCurved } from "react-icons/fa6";

interface BuyOptionsProps {
    inseratId : string
}

const BuyOptions: React.FC<BuyOptionsProps> = async ({
    inseratId
}) => {

    const currentUser = await getCurrentUser();

   

    const thisInserat = await db.query.inserat.findMany({
        where : eq(inserat.id, inseratId)
    })

    console.log(thisInserat)

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
                        <Button className="w-full text-sm bg-blue-800 hover:bg-blue-900 text-gray-200 mt-2 mb-2">
                            Jetzt starten
                        </Button>
                        <div className="w-full flex mt-2">
                            <div className="flex">
                                <div className="text-4xl font-bold">25 €</div><div className="text-xs text-gray-200/70">/Monat</div>
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
                    <Button className="w-full text-sm bg-blue-800 hover:bg-blue-900 text-gray-200 mt-2 mb-2">
                        Jetzt starten
                    </Button>
                    <div className="w-full flex mt-2">
                        <div className="flex">
                            <div className="text-4xl font-bold">39 €</div><div className="text-xs text-gray-200/70">/Monat</div>
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
                    <Button className="w-full text-sm bg-blue-800 hover:bg-blue-900 text-gray-200 mt-2 mb-2">
                        Jetzt starten
                    </Button>
                    <div className="w-full flex mt-2">
                        <div className="flex">

                            <div className="text-4xl font-bold">49 €</div><div className="text-xs text-gray-200/70">/Monat</div>
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