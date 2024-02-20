'use client'

import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { MessageCircle, MessageCircleMoreIcon, StarHalfIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface FavouritesShortCutProps { 

    currentUser : User

}

const FavouritesShortCut: React.FC<FavouritesShortCutProps> = ({
    currentUser
}) => {

    const router = useRouter();

    return ( 
        <Button className="lg:bg-[#181b27]" variant="ghost" onClick={() => {router.push(`/dashboard/${currentUser.id}/bookings`)}}>
            <StarHalfIcon/>
        </Button>
     );
}
 
export default FavouritesShortCut;