'use client'

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import {  MessageCircleMoreIcon } from "lucide-react";


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
                    <Button className=" text-gray-200 items-center " variant="ghost" size="sm">
                        <MessageCircleMoreIcon /> 
                        {foundConversations > 0 && (
                            <span className="bg-rose-600 text-xs font-bold px-1 flex rounded-md text-gray-200">
                            {foundConversations}
                        </span>
                        )}
                    </Button>
                    </a>
                </TooltipTrigger>
                <TooltipContent className="dark:bg-[#0F0F0F] border-none">
                    <p> Konversationen </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export default ConversationShortCut;