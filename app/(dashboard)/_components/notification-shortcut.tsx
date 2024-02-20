'use client'

import { Button } from "@/components/ui/button";
import { BellDotIcon, MessageCircle, MessageCircleMoreIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const NotificationShortCut = () => {

    const router = useRouter();

    return ( 
        <Button className="lg:bg-[#181b27]" variant="ghost" onClick={() => {router.push(`/conversation`)}}>
            <BellDotIcon/>
        </Button>
     );
}
 
export default NotificationShortCut;