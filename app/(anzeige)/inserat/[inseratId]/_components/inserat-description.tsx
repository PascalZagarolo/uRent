'use client';

import { Button } from "@/components/ui/button";
import { inserat } from "@/db/schema";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface InseratDescriptionProps {
    thisInserat: typeof inserat.$inferSelect | any
}

const InseratDescription: React.FC<InseratDescriptionProps> = ({
    thisInserat
}) => {
    const [isUnfolded, setIsUnfolded] = useState(false);
    
    return ( 
        <div className="relative">
            <div 
                className={cn(
                    "w-full text-gray-300/90 whitespace-pre-wrap break-words text-sm leading-relaxed transition-all duration-300",
                    isUnfolded ? "max-h-full" : "max-h-24 overflow-hidden"
                )}
            >
                {thisInserat?.description} 
            </div>
            
            {!isUnfolded && (
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#1E2235]/90 to-transparent pointer-events-none"></div>
            )}
            
            {thisInserat?.description?.length > 70 && (
                <div className="flex justify-center mt-3">
                    <button
                        onClick={() => setIsUnfolded(!isUnfolded)}
                        className="flex items-center gap-1.5 py-1.5 px-4 text-xs font-medium text-gray-300/80 hover:text-gray-300 transition-all duration-200 focus:outline-none"
                    >
                        <span>{isUnfolded ? "Weniger" : "Mehr"} anzeigen</span>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center bg-gray-700/30 transition-transform duration-300 ${isUnfolded ? "rotate-180" : ""}`}>
                            <ChevronDown 
                                className="w-3.5 h-3.5 text-gray-300/80" 
                            />
                        </div>
                    </button>
                </div>
            )}
        </div>
    );
}
 
export default InseratDescription;