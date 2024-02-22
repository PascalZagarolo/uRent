'use client'

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { User } from "@prisma/client";
import { MessageCircle, MessageCircleMoreIcon, StarHalfIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface FavouritesShortCutProps {

    currentUser: User

}

const FavouritesShortCut: React.FC<FavouritesShortCutProps> = ({
    currentUser
}) => {

    const router = useRouter();

    return (
        <TooltipProvider>
            <Tooltip>
            <TooltipTrigger asChild>
                <Button className="lg:bg-[#181b27]" variant="ghost" onClick={() => { router.push(`/dashboard/${currentUser.id}/bookings`) }}>
                    <StarHalfIcon />
                </Button>
            </TooltipTrigger>
            <TooltipContent className="dark:bg-[#0F0F0F] border-none">
                <p> Favouriten </p>
            </TooltipContent>
        </Tooltip>
        </TooltipProvider>
    );
}

export default FavouritesShortCut;