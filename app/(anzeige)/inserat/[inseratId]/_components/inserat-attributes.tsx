import { Inserat, LkwAttribute, PkwAttribute, TrailerAttribute, TransportAttribute } from "@prisma/client";
import { CarFrontIcon, CarFront, TruckIcon, CaravanIcon } from 'lucide-react';
import PkwAttributeRender from "./_categories/pkw-attribute-render";
import LkwAttributeRender from "./_categories/lkw-attribute-render copy";
import TransportAttributeRender from "./_categories/transport-attribute-render";
import { PiVanFill } from "react-icons/pi";
import TrailerAttributeRender from "./_categories/trailer-attribute-render";

interface InseratAttributesProps {
    inserat: Inserat & { pkwAttribute: PkwAttribute, lkwAttribute: LkwAttribute, transportAttribute : TransportAttribute, trailerAttribute : TrailerAttribute }
}

const InseratAttributes: React.FC<InseratAttributesProps> = ({
    inserat
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
                    }[inserat.category]
                }

                Fahrzeugattribute
            </h3>
            <div className="w-full">
            {
                    {
                        'PKW': <PkwAttributeRender attributes = {inserat?.pkwAttribute} />,
                        'LKW' : <LkwAttributeRender attributes = {inserat?.lkwAttribute} />,
                        'TRANSPORT' : <TransportAttributeRender attributes={inserat?.transportAttribute} />,
                        'TRAILOR' : <TrailerAttributeRender attributes={inserat?.trailerAttribute} />                        
                    }[inserat.category]
                }
            </div>
        </div>
    );
}

export default InseratAttributes;