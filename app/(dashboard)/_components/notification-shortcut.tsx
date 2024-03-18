'use client'

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";


import { BellDotIcon, BellPlus, MessageCircle, MessageCircleMoreIcon } from "lucide-react";
import { useRouter } from "next/navigation";




const NotificationShortCut = () => {

    const router = useRouter();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="lg:bg-[#181b27] text-gray-200" variant="ghost" >
                    <BellDotIcon className="w-6 h-6" /> <p className="text-xs">0</p>
                                    
                </Button>
            </PopoverTrigger>
            <PopoverContent className="dark:bg-[#0F0F0F] dark:border-gray-800 border-none">
                <div>
                    <h3 className="flex">
                        <BellPlus className="h-4 w-4 "/>
                        <span className="ml-2 text-sm">Meine Benachrichtigungen</span>
                    </h3>
                </div>
                <div className="mt-4">
                    <p className="text-gray-900/80 dark:text-gray-100/80 text-xs italic"> Du bist auf dem neuesten Stand...</p>
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default NotificationShortCut;