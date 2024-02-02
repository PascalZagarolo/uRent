'use client'

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const Backtohomepage = () => {

    const router = useRouter();

    return ( 
        <Button onClick={() => { router.push('/')}} variant="ghost" className="hover:bg-[#1f2332]">
            <ArrowLeft className="mr-auto" />
        </Button>
     );
}
 
export default Backtohomepage;