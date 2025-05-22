'use client'

import { inserat } from "@/db/schema";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

interface OtherInserateRenderProps {
    thisInserat: typeof inserat.$inferSelect | any;
}

const OtherInserateRender: React.FC<OtherInserateRenderProps> = ({
    thisInserat
}) => {
    const router = useRouter();
    
    return ( 
        <div 
            onClick={() => router.push(`/inserat/${thisInserat.id}`)}
            className="bg-[#1B1F2E] hover:bg-[#232842] border-b border-gray-800/30 transition-colors cursor-pointer p-3"
        >
            <div className="flex space-x-3">
                {/* Image */}
                <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0 relative" style={{ overflowClipMargin: 'unset' }}>
                    {thisInserat?.images?.[0]?.url ? (
                        <img
                            src={thisInserat?.images?.[0]?.url} 
                            alt={thisInserat.title || "Inserat"}
                            className="object-cover h-full w-full"
                            style={{ overflowClipMargin: 'unset' }}
                        />
                    ) : (
                        <div className="w-full h-full bg-[#151823] flex items-center justify-center">
                            <span className="text-gray-500 text-xs">No image</span>
                        </div>
                    )}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                        <h3 className="font-medium text-gray-200 text-sm line-clamp-1 pr-2">
                            {thisInserat?.title}
                        </h3>
                        <ArrowUpRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    </div>
                    
                    <p className="text-gray-400 text-xs mt-1 line-clamp-1">
                        {thisInserat?.category} • {format(new Date(thisInserat?.createdAt || new Date()), "dd.MM.yyyy")}
                    </p>
                    
                    <div className="mt-2">
                        <span className="text-sm font-semibold text-white">
                            {thisInserat?.price} €
                        </span>
                        <span className="text-xs text-gray-400 ml-1">/Tag</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default OtherInserateRender;