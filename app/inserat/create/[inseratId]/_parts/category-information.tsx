import { Separator } from "@/components/ui/separator";
import { Inserat, LkwAttribute, PkwAttribute, TrailerAttribute } from "@prisma/client";
import PkwInformation from "./pkw-information";
import LkwInformation from "./lkw-information";
import TrailorInformation from "./trailor-information";

interface CategoryInformationProps {
    inserat: Inserat & { pkwAttribute? : PkwAttribute, lkwAttribute? : LkwAttribute, trailerAttribute? : TrailerAttribute};
}

const CategoryInformation: React.FC<CategoryInformationProps> = ({
    inserat
}) => {
    return (
        <div>
            <div className="flex justify-evenly items-center">
                <Separator
                    className="w-1/3 h-[0.5px] dark:bg-gray-100/20"
                />
                <h1 className="flex justify-center text-lg font-semibold">
                    {
                        {
                            'PKW': 'PKW',
                            'LKW' : 'LKW',
                            'TRAILOR' : 'Anhänger',
                        }[inserat.category]
                    } - Details
                </h1>
                <Separator
                    className="w-1/3 h-[0.5px] dark:bg-gray-100/20"
                />
            </div>
            <div>
                {
                    {
                        'PKW': <PkwInformation 
                        inserat = { inserat }
                        />,
                        'LKW': <LkwInformation 
                        inserat = { inserat }
                        />,
                        'TRAILOR' : <TrailorInformation 
                        inserat = { inserat }
                        />
                    }[inserat.category]
                }
            </div>
        </div>
    );
}

export default CategoryInformation;