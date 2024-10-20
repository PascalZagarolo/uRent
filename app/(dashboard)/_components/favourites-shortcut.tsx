'use client'

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { userTable } from "@/db/schema";

import { IoStarHalf } from "react-icons/io5";
import { useRouter } from "next/navigation";

interface FavouritesShortCutProps {

    currentUser: typeof userTable.$inferSelect;

}

const FavouritesShortCut: React.FC<FavouritesShortCutProps> = ({
    currentUser
}) => {

    const router = useRouter();

    return (
        <TooltipProvider>
            <Tooltip>
            <TooltipTrigger asChild>
                <a href={`/dashboard/${currentUser.id}?tab=favourites`}>
                <Button className=" text-gray-200" variant="ghost" size="sm">
                <IoStarHalf className="w-6 h-6" />
                </Button>
                </a>
            </TooltipTrigger>
            <TooltipContent className="dark:bg-[#0F0F0F] border-none">
                <p> Favouriten </p>
            </TooltipContent>
        </Tooltip>
        </TooltipProvider>
    );
}

export default FavouritesShortCut;