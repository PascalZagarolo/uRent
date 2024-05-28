'use client'

import { Button } from "@/components/ui/button";
import { ArrowLeftCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";

const BackToHome = () => {

    const router = useRouter();

    const onBackAction = () => {
        router.push(process.env.NEXT_PUBLIC_BASE_URL)
    }

    return ( 
        <div className="">
            <Button className="" variant="ghost" onClick={onBackAction}>
                
                    <ArrowLeftCircleIcon className="w-4 h-4 mr-2 text-rose-600" /> Zurück zur Startseite
               
            </Button>
        </div>
     );
}
 
export default BackToHome;