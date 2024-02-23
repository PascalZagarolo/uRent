import { Inserat, PkwAttribute } from '@prisma/client';
import TitleInserat from "./input-fields/title-inserat";
import DescriptionInserat from "./input-fields/description-inserat";
import RentPeriod from "./input-fields/rent-period";
import SelectCategoryInserat from "./input-fields/select-category";
import { BookOpen, Car } from "lucide-react";
import RentPrice from "./input-fields/rent-price";
import { Separator } from "@/components/ui/separator";
import Sitze from "./input-fields/attribute-fields/sitze";
import { db } from "@/utils/db";
import SelectLocation from './input-fields/select-location';




interface InseratBodyLeftProps {
    inserat: Inserat;
}

const InseratBodyLeft: React.FC<InseratBodyLeftProps> = async ({
    inserat
}) => {

    const inseratWithAttributes = await db.inserat.findUnique({
        where : {
            id : inserat.id
        }, include : {
            pkwAttribute : true
        }
    })

    const addressComponent = await db.address.findUnique({
        where : {
            inseratId : inserat.id
        }
    })

    return (
        <div className="p-4 bg-white dark:bg-[#0b0b0b] dark:border-none border-gray-200 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]  ml-8 rounded-md mr-8 ">
            <h3 className="font-bold italic flex">
                <BookOpen className="mr-2" /> Anzeigendetails
            </h3>
            <p className="text-xs text-gray-900/50 dark:text-gray-100/70 font-medium">versehe deine Anzeige mit nützlichen Information - desto genauer du bist, desto einfacher finden dich Interessenten</p>
            <Separator className="bg-gray-400 mt-2 w-1/4" />
            <TitleInserat
                inserat={inserat}
            />
            <div className="mt-8">
                <DescriptionInserat
                    inserat={inserat}
                />
            </div>
            <div className=" ">
                <div >
                    <h3 className="flex justify-center text-xl mt-8 font-semibold
                     bg-[#1f2332] p-4 text-gray-100 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] border-gray-800 border-2
                     dark:bg-[#080808] dark:border-none
                     "><Car className="mr-4 h-6 w-6" />
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
                        <Sitze
                            inserat={inseratWithAttributes}
                        />
                    </div>
                    )}
                </div>
            </div>
            <div className='flex w-full items-center justify-between mt-4'>
                <div className='w-1/2'>
                <RentPrice
                    inserat={inserat}
                    
                />
                </div>
                <div className='w-1/2'>
                <SelectLocation
                inserat={inserat}
                addressComponent = {addressComponent}
                />
                </div>
                
            </div>
                        

        </div>
    );
}

export default InseratBodyLeft;