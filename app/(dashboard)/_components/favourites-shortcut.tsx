'use client'

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { users } from "@/db/schema";

import { StarHalfIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface FavouritesShortCutProps {

    currentUser: typeof users.$inferSelect;

}

const FavouritesShortCut: React.FC<FavouritesShortCutProps> = ({
    currentUser
}) => {

    const router = useRouter();

    return (
        <TooltipProvider>
            <Tooltip>
            <TooltipTrigger asChild>
                <Button className="lg:bg-[#181b27] text-gray-200" variant="ghost" onClick={() => { router.push(`/dashboard/${currentUser.id}/bookings`) }}>
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