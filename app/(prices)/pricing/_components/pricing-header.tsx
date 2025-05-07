import { GiftIcon } from "lucide-react";

const PricingHeader = () => {
    return (
        <div className="relative flex flex-col items-center justify-center p-8 rounded-2xl shadow-xl bg-gradient-to-br from-indigo-100 via-white to-indigo-200 dark:from-[#23244a] dark:via-[#181a2a] dark:to-[#23244a] text-gray-900 dark:text-gray-100 border border-indigo-100 dark:border-indigo-900/30">
            {/* Icon */}
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-200/60 dark:bg-indigo-900/40 shadow-md">
                <GiftIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-300" />
            </div>
            {/* Headline */}
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-2 tracking-tight leading-tight">
                Starte jetzt <span className="text-indigo-700 dark:text-indigo-300">3 Monate kostenlos</span>
            </h2>
            {/* Subheadline */}
            <p className="text-base md:text-lg text-center text-gray-600 dark:text-gray-300 mb-5 max-w-xl font-medium">
                Nutze den Aktionscode und vermiete ohne Risiko – keine Kreditkarte, keine Verpflichtungen. Einfach ausprobieren und durchstarten!
            </p>
            {/* Code Area */}
            <div className="flex items-center gap-2 mt-2">
                <span className="font-mono text-lg md:text-xl font-semibold text-indigo-800 dark:text-indigo-200 px-4 py-1 rounded-lg bg-indigo-100/80 dark:bg-indigo-900/60 border border-indigo-300 dark:border-indigo-700 shadow animate-shine-code">
                    uRent24
                </span>
                <span className="text-xs text-indigo-500 dark:text-indigo-300 font-semibold">Aktionscode</span>
            </div>
        </div>
    );
}

export default PricingHeader;