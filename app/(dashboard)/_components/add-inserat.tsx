'use client'

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const Inserat = () => {
    const router = useRouter();

    const onClick = () => {
        router.push("/inserat/create");
    }

    return ( 
        <div>
            <Button variant="ghost" className="bg-white items-center mt-2 flex" onClick={onClick}>
                <PlusIcon className="w-4 h-4 mr-2"/> Neue Anzeige 
            </Button>
        </div>
     );
}
 
export default Inserat;