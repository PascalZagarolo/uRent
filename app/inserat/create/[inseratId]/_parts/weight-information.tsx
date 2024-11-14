import { Separator } from "@/components/ui/separator";

import PkwInformation from "./pkw-information";
import LkwInformation from "./lkw-information";
import TrailorInformation from "./trailor-information";
import TransportInformation from "./transport-information";
import { CategoryEnumRender, inserat } from "@/db/schema";
import PayloadCreation from "./weight/payload-creation";
import WeightClassCreation from "./weight/weightClass-creation";

interface WeightInformationProps {
    thisInserat : typeof inserat.$inferSelect;
}

const WeightInformation: React.FC<WeightInformationProps> = ({
    thisInserat
}) => {

    

    return (
        <div>
            <div className="flex justify-evenly items-center">
                <Separator
                    className="sm:w-1/3 sm:block hidden h-[0.5px] dark:bg-gray-100/20"
                />
                <h1 className="flex justify-center text-lg font-semibold">
                    Gewichtsangaben
                </h1>
                <Separator
                    className="sm:w-1/3 sm:block hidden h-[0.5px] dark:bg-gray-100/20"
                />
            </div>
            <div className="flex flex-row w-full items-center mt-4 space-x-4">
            <div className="w-1/2">
                    <WeightClassCreation 
                    thisInserat={thisInserat}
                    />
                </div>
                <div className="w-1/2">
                    <PayloadCreation 
                    thisInserat={thisInserat}
                    />
                </div>
                
            </div>
        </div>
    );
}

export default WeightInformation;