'use client';

import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useRouter } from "next/navigation";

const ReturnHomePage = () => {

    const router = useRouter();

    return ( 
        <div>
            <Button  variant="ghost" className="bg-[#10121a] text-white p-4 hover:bg-[#191c29] hover:text-white">
            <Home
            onClick={() => { router.push("/") }}
            className="hover: cursor-pointer w-8 h-8 "
            />
            </Button>
        </div>
     );
}
 
export default ReturnHomePage;