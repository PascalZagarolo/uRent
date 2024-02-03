'use client';

import { Button } from "@/components/ui/button";
import { ArrowBigRightDash } from "lucide-react";
import { useRouter } from "next/navigation";

const RentNow = () => {

    const router = useRouter();


    return ( 
        <div>
            <Button className="bg-gray-100 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]" variant="ghost" onClick={() => { router.push('/')}}>
                <ArrowBigRightDash/> <p className="font-semibold hidden md:block ml-2"> Jetzt mieten</p> 
            </Button>
        </div>
     );
}
 
export default RentNow;