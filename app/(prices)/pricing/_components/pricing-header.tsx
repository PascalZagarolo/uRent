import { GiftIcon } from "lucide-react";

const PricingHeader = () => {
    return (
        <div className="flex flex-row items-center p-4 rounded-2xl shadow-lg bg-gradient-to-r from-indigo-600 to-indigo-800 text-gray-200">
            {/* Icon Section */}
            <div className="flex items-center justify-center w-12 h-12 mr-4 rounded-full md:bg-[#1C1C1C]/60">
                <GiftIcon className="w-8 h-8 text-gray-200" />
            </div>

            {/* Content Section */}
            <div className="flex flex-col">
                <h2 className="text-xl font-bold">Dein uRent Aktionscode!</h2>
                <p className="text-sm text-gray-200/60 mt-1">
                    Nutze Code <span className="font-semibold text-gray-200">uRent24</span> um 3 Monate kostenlos zu vermieten. <br />
                    Keine Kreditkarte, keine Verpflichtungen, starte direkt durch.
                </p>
            </div>
        </div>
    );
}

export default PricingHeader;