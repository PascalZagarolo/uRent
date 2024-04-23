import { Separator } from "@/components/ui/separator";

import PkwInformation from "./pkw-information";
import LkwInformation from "./lkw-information";
import TrailorInformation from "./trailor-information";
import TransportInformation from "./transport-information";
import { CategoryEnumRender, inserat } from "@/db/schema";

interface CategoryInformationProps {
    thisInserat : typeof inserat.$inferSelect;
}

const CategoryInformation: React.FC<CategoryInformationProps> = ({
    thisInserat
}) => {

    const usedCategory : typeof CategoryEnumRender = thisInserat.category;

    return (
        <div>
            <div className="flex justify-evenly items-center">
                <Separator
                    className="sm:w-1/3 sm:block hidden h-[0.5px] dark:bg-gray-100/20"
                />
                <h1 className="flex justify-center text-lg font-semibold">
                    {
                        {
                            'PKW': 'PKW',
                            'LKW' : 'LKW',
                            'TRAILER' : 'Anhänger',
                            'TRANSPORT' : 'Transporter'
                            //@ts-ignore
                        }[usedCategory]
                    } - Details
                </h1>
                <Separator
                    className="sm:w-1/3 sm:block hidden h-[0.5px] dark:bg-gray-100/20"
                />
            </div>
            <div>
                
            </div>
        </div>
    );
}

export default CategoryInformation;