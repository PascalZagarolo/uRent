import { CarFrontIcon, TruckIcon, CaravanIcon } from 'lucide-react';
import PkwAttributeRender from "./_categories/pkw-attribute-render";
import LkwAttributeRender from "./_categories/lkw-attribute-render copy";
import TransportAttributeRender from "./_categories/transport-attribute-render";
import { PiVanFill } from "react-icons/pi";
import TrailerAttributeRender from "./_categories/trailer-attribute-render";
import { inserat } from "@/db/schema";
import { CategoryEnumRender } from '../../../../../db/schema';

interface InseratAttributesProps {
    thisInserat: typeof inserat.$inferSelect | any
}

const InseratAttributes: React.FC<InseratAttributesProps> = ({
    thisInserat
}) => {
    const usedCategory = thisInserat.category as "PKW" | "LKW" | "TRAILER" | "TRANSPORT";
    
    const categoryIcons: Record<string, { icon: JSX.Element, color: string, border: string, name: string }> = {
        'PKW': { 
            icon: <CarFrontIcon className="h-5 w-5 text-blue-400" />, 
            color: 'from-blue-500/20 to-indigo-500/10', 
            border: 'border-blue-500/20',
            name: 'Fahrzeug'
        },
        'LKW': { 
            icon: <TruckIcon className="h-5 w-5 text-indigo-400" />, 
            color: 'from-indigo-500/20 to-purple-500/10', 
            border: 'border-indigo-500/20',
            name: 'Lastkraftwagen'
        },
        'TRANSPORT': { 
            icon: <PiVanFill className="h-5 w-5 text-purple-400" />, 
            color: 'from-purple-500/20 to-violet-500/10', 
            border: 'border-purple-500/20',
            name: 'Transporter'
        },
        'TRAILER': { 
            icon: <CaravanIcon className="h-5 w-5 text-green-400" />, 
            color: 'from-green-500/20 to-emerald-500/10', 
            border: 'border-green-500/20',
            name: 'Anhänger'
        }
    };

    const renderAttributes = () => {
        switch(usedCategory) {
            case 'PKW': return <PkwAttributeRender attributes={thisInserat?.pkwAttribute} />;
            case 'LKW': return <LkwAttributeRender attributes={thisInserat?.lkwAttribute} />;
            case 'TRANSPORT': return <TransportAttributeRender attributes={thisInserat?.transportAttribute} />;
            case 'TRAILER': return <TrailerAttributeRender attributes={thisInserat?.trailerAttribute} />;
            default: return null;
        }
    };

    return (
        <div className="mt-4 pb-6">
            <h3 className="flex items-center text-lg font-semibold mb-3 text-gray-200">
                <span className={`w-8 h-8 rounded-full bg-gradient-to-br ${categoryIcons[usedCategory]?.color || 'from-gray-500/20 to-gray-700/10'} flex items-center justify-center mr-2 border ${categoryIcons[usedCategory]?.border || 'border-gray-700/20'}`}>
                    {categoryIcons[usedCategory]?.icon || <CarFrontIcon className="h-5 w-5 text-gray-400" />}
                </span>
                Fahrzeugattribute
            </h3>
            <div className="bg-gradient-to-br from-[#1E2235]/70 to-[#232842]/50 rounded-xl border border-gray-800/20 p-4">
                {renderAttributes()}
            </div>
        </div>
    );
}

export default InseratAttributes;