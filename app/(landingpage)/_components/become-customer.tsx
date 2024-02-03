'use client'

import { Button } from "@/components/ui/button";
import { ArrowRightCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const BecomeCustomer = () => {
    
    const router = useRouter();

    return (
        <Button
            className="w-full bg-black text-gray-100 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] border-2 border-gray-100 flex" 
            variant='ghost'
            onClick={() => { router.push("/login")}}>
            Keine Zeit verlieren und Kunde werden <ArrowRightCircle className='ml-2' />
        </Button>
    );
}

export default BecomeCustomer;