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
                        <Button className="w-9 h-9 rounded-full p-0 bg-transparent hover:bg-[#1B1F2C]/80 text-indigo-400/80 hover:text-indigo-400 transition-all duration-200" variant="ghost">
                            <IoStarHalf className="w-5 h-5" />
                        </Button>
                    </a>
                </TooltipTrigger>
                <TooltipContent className="bg-[#141721]/95 text-xs font-medium backdrop-blur-sm border-none">
                    <p>Favouriten</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export default FavouritesShortCut;