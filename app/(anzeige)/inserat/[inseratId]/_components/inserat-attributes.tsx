
import { CarFrontIcon, TruckIcon, CaravanIcon } from 'lucide-react';
import PkwAttributeRender from "./_categories/pkw-attribute-render";
import LkwAttributeRender from "./_categories/lkw-attribute-render copy";
import TransportAttributeRender from "./_categories/transport-attribute-render";
import { PiVanFill } from "react-icons/pi";
import TrailerAttributeRender from "./_categories/trailer-attribute-render";
import { inserat } from "@/db/schema";

interface InseratAttributesProps {
    thisInserat : typeof inserat.$inferSelect
}

const InseratAttributes: React.FC<InseratAttributesProps> = ({
    thisInserat
}) => {
    return (
        <div className="bg-[#161923]  rounded-md w-full p-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-gray-200">
            <h3 className="font-semibold flex items-center">
                {
                    {
                        'PKW': <CarFrontIcon className="h-4 w-4 mr-2" />,
                        'LKW': <TruckIcon className="h-4 w-4 mr-2" />,
                        'TRANSPORT' : <PiVanFill className="h-4 w-4 mr-2" />,
                        'TRAILOR' : <CaravanIcon className="h-4 w-4 mr-2" />
                    }[thisInserat.category]
                }

                Fahrzeugattribute
            </h3>
            <div className="w-full">
            {
                    {
                        'PKW': <PkwAttributeRender attributes = {thisInserat?.pkwAttribute} />,
                        'LKW' : <LkwAttributeRender attributes = {thisInserat?.lkwAttribute} />,
                        'TRANSPORT' : <TransportAttributeRender attributes={thisInserat?.transportAttribute} />,
                        'TRAILOR' : <TrailerAttributeRender attributes={thisInserat?.trailerAttribute} />                        
                    }[thisInserat.category]
                }
            </div>
        </div>
    );
}

export default InseratAttributes;