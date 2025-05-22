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
            color: 'from-blue-500/10 to-indigo-500/5', 
            border: 'border-blue-500/10',
            name: 'Fahrzeug'
        },
        'LKW': { 
            icon: <TruckIcon className="h-5 w-5 text-indigo-400" />, 
            color: 'from-indigo-500/10 to-purple-500/5', 
            border: 'border-indigo-500/10',
            name: 'Lastkraftwagen'
        },
        'TRANSPORT': { 
            icon: <PiVanFill className="h-5 w-5 text-purple-400" />, 
            color: 'from-purple-500/10 to-violet-500/5', 
            border: 'border-purple-500/10',
            name: 'Transporter'
        },
        'TRAILER': { 
            icon: <CaravanIcon className="h-5 w-5 text-green-400" />, 
            color: 'from-green-500/10 to-emerald-500/5', 
            border: 'border-green-500/10',
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
        <div>
            <div className="bg-gradient-to-br from-[#151823] to-[#1B1F2E] rounded-xl border border-gray-800/30 shadow-lg overflow-hidden">
                <div className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                        <span className={`w-8 h-8 rounded-full bg-gradient-to-br ${categoryIcons[usedCategory]?.color || 'from-gray-500/10 to-gray-700/5'} flex items-center justify-center border ${categoryIcons[usedCategory]?.border || 'border-gray-700/10'}`}>
                            {categoryIcons[usedCategory]?.icon || <CarFrontIcon className="h-4 w-4 text-gray-400" />}
                        </span>
                        <h3 className="text-base font-semibold text-gray-200">Fahrzeugattribute</h3>
                    </div>
                    {renderAttributes()}
                </div>
            </div>
        </div>
    );
}

export default InseratAttributes;