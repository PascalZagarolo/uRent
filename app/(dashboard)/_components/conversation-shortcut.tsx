'use client'

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { MessageCircleIcon } from "lucide-react";

interface ConversatonShortCutProps {
    foundConversations? : number;
}

const ConversationShortCut : React.FC<ConversatonShortCutProps> = ({
    foundConversations
}) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <a href="/conversation">
                        <Button className="w-9 h-9 rounded-full p-0 bg-transparent hover:bg-[#1B1F2C]/80 text-indigo-400/80 hover:text-indigo-400 transition-all duration-200 relative" variant="ghost">
                            <MessageCircleIcon className="w-5 h-5" /> 
                            {foundConversations > 0 && (
                                <span className="absolute -top-1 -right-1 bg-rose-500/90 text-[10px] font-medium w-4 h-4 flex items-center justify-center rounded-full text-white">
                                    {foundConversations > 9 ? '9+' : foundConversations}
                                </span>
                            )}
                        </Button>
                    </a>
                </TooltipTrigger>
                <TooltipContent className="bg-[#141721]/95 text-xs font-medium backdrop-blur-sm border-none">
                    <p>Konversationen</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export default ConversationShortCut;