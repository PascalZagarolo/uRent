'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const UrentDashboardLogo = () => {

    const router = useRouter();
    
    const onClick = () => {
        router.push('/')
    }
    return (
        <Button variant="ghost" className="hover:bg-blue-800/00" onClick={onClick}>
            <h3 className="flex items-center rounded-md bg-white text-black w-[160px] h-[80px] justify-center border border-black text-2xl font-bold ">
                <p className="font-bold text-blue-800 text-xl">u</p>Rent</h3>
        </Button>

    );
}

export default UrentDashboardLogo;