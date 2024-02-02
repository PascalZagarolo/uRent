import { Inserat } from "@prisma/client";
import TitleInserat from "./input-fields/title-inserat";
import DescriptionInserat from "./input-fields/description-inserat";
import RentPeriod from "./input-fields/rent-period";
import SelectCategoryInserat from "./input-fields/select-category";
import { BookOpen, Car } from "lucide-react";
import RentPrice from "./input-fields/rent-price";
import { Separator } from "@/components/ui/separator";
import Sitze from "./input-fields/attribute-fields/sitze";



interface InseratBodyLeftProps {
    inserat: Inserat;
}

const InseratBodyLeft: React.FC<InseratBodyLeftProps> = ({
    inserat
}) => {
    return (
        <div className="p-4 bg-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]  ml-8 rounded-md mr-8 ">
            <h3 className="font-bold italic flex">
                <BookOpen className="mr-2" /> Anzeigendetails
            </h3>
            <p className="text-xs text-gray-900/50 font-medium">versehe deine Anzeige mit nützlichen Information - desto genauer du bist, desto einfacher finden dich Interessenten</p>
            <Separator className="bg-gray-400 mt-2 w-1/4" />
            <TitleInserat
                inserat={inserat}
            />
            <div className="mt-8">
                <DescriptionInserat
                    inserat={inserat}
                />
            </div>
            <div className="ml-4 mr-8">
                <div >
                    <h3 className="flex justify-center text-xl mt-8 font-semibold bg-[#1f2332] p-4 text-gray-100 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] border-gray-800 border-2"><Car className="mr-4 h-6 w-6" />
                        Spezifikationen deiner Anzeige
                    </h3>
                </div>
                <div className="flex w-full">
                    <div className="w-1/2">
                        <SelectCategoryInserat
                            inserat={inserat}
                        />
                    </div>
                    {inserat.category === "PKW" && (
                        <div>
                        <Sitze/>
                    </div>
                    )}
                </div>
            </div>
            <div>
                <RentPrice
                    inserat={inserat}
                />
            </div>


        </div>
    );
}

export default InseratBodyLeft;