'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const UrentDashboardLogo2 = () => {

    const router = useRouter();
    
    const onClick = () => {
        router.push('/')
    }
    return (
        <div>

        </div>

    );
}

export default UrentDashboardLogo2;