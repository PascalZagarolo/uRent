'use client'

import { Button } from "@/components/ui/button";
import { MessageCircle, MessageCircleMoreIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const ConversationShortCut = () => {

    const router = useRouter();

    return ( 
        <Button className="lg:bg-[#181b27]" variant="ghost" onClick={() => {router.push(`/conversation`)}}>
            <MessageCircleMoreIcon/>
        </Button>
     );
}
 
export default ConversationShortCut;