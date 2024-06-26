
import { CarFrontIcon, TruckIcon, CaravanIcon } from 'lucide-react';
import PkwAttributeRender from "./_categories/pkw-attribute-render";
import LkwAttributeRender from "./_categories/lkw-attribute-render copy";
import TransportAttributeRender from "./_categories/transport-attribute-render";
import { PiVanFill } from "react-icons/pi";
import TrailerAttributeRender from "./_categories/trailer-attribute-render";
import { inserat } from "@/db/schema";
import { CategoryEnumRender } from '../../../../../db/schema';

interface InseratAttributesProps {
    thisInserat : typeof inserat.$inferSelect
}

const InseratAttributes: React.FC<InseratAttributesProps> = ({
    thisInserat
}) => {

    const usedCategory : typeof CategoryEnumRender = thisInserat.category;

    return (
        <div className="bg-[#161923]  sm:rounded-md w-full p-4  text-gray-200">
            <h3 className="font-semibold flex items-center">
                {
                    {
                        'PKW': <CarFrontIcon className="h-4 w-4 mr-2" />,
                        'LKW': <TruckIcon className="h-4 w-4 mr-2" />,
                        'TRANSPORT' : <PiVanFill className="h-4 w-4 mr-2" />,
                        'TRAILER' : <CaravanIcon className="h-4 w-4 mr-2" />
                        //@ts-ignore
                    }[usedCategory]
                }

                Fahrzeugattribute
            </h3>
            <div className="w-full">
            {
                    {
                        'PKW': <PkwAttributeRender attributes = {thisInserat?.pkwAttribute} />,
                        'LKW' : <LkwAttributeRender attributes = {thisInserat?.lkwAttribute} />,
                        'TRANSPORT' : <TransportAttributeRender attributes={thisInserat?.transportAttribute} />,
                        'TRAILER' : <TrailerAttributeRender attributes={thisInserat?.trailerAttribute} />  
                        //@ts-ignore                      
                    }[usedCategory]
                }
            </div>
        </div>
    );
}

export default InseratAttributes;