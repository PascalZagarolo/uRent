import { Separator } from "@/components/ui/separator";

import PkwInformation from "./pkw-information";
import LkwInformation from "./lkw-information";
import TrailorInformation from "./trailor-information";
import TransportInformation from "./transport-information";
import { inserat } from "@/db/schema";

interface CategoryInformationProps {
    thisInserat : typeof inserat.$inferSelect;
}

const CategoryInformation: React.FC<CategoryInformationProps> = ({
    thisInserat
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
                            'TRAILER' : 'Anhänger',
                            'TRANSPORT' : 'Transporter'
                        }[thisInserat.category]
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
                        thisInserat = { thisInserat }
                        />,
                        
                        'LKW': <LkwInformation 
                        thisInserat = { thisInserat }
                        />,
                        
                        'TRAILER' : <TrailorInformation 
                        thisInserat = { thisInserat }
                        />,
                       
                        'TRANSPORT' : <TransportInformation 
                        thisInserat = { thisInserat }
                        />
                    }[thisInserat.category]
                }
            </div>
        </div>
    );
}

export default CategoryInformation;