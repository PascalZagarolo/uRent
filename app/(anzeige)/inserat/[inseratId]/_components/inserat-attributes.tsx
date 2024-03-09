import { Inserat, LkwAttribute, PkwAttribute } from "@prisma/client";
import { CarFrontIcon, CarFront, TruckIcon } from 'lucide-react';
import PkwAttributeRender from "./_categories/pkw-attribute-render";
import LkwAttributeRender from "./_categories/lkw-attribute-render copy";

interface InseratAttributesProps {
    inserat: Inserat & { pkwAttribute: PkwAttribute, lkwAttribute: LkwAttribute }
}

const InseratAttributes: React.FC<InseratAttributesProps> = ({
    inserat
}) => {
    return (
        <div className="bg-[#161923]  rounded-md w-full p-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            <h3 className="font-semibold flex items-center">
                {
                    {
                        'PKW': <CarFrontIcon className="h-4 w-4 mr-2" />,
                        'LKW': <TruckIcon className="h-4 w-4 mr-2" />
                    }[inserat.category]
                }

                Fahrzeugattribute
            </h3>
            <div className="w-full">
            {
                    {
                        'PKW': <PkwAttributeRender attributes = {inserat.pkwAttribute} />,
                        'LKW' : <LkwAttributeRender attributes = {inserat.lkwAttribute} />                        
                    }[inserat.category]
                }
            </div>
        </div>
    );
}

export default InseratAttributes;