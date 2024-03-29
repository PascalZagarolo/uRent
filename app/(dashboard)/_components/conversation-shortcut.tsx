'use client'

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MessageCircle, MessageCircleMoreIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const ConversationShortCut = () => {

    const router = useRouter();

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button className="lg:bg-[#181b27] text-gray-200" variant="ghost" onClick={() => { router.push(`/conversation`) }}>
                        <MessageCircleMoreIcon />
                    </Button>
                </TooltipTrigger>
                <TooltipContent className="dark:bg-[#0F0F0F] border-none">
                    <p> Konversationen </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export default ConversationShortCut;