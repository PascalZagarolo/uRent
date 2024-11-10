'use client';

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackToMain = () => {

    const router = useRouter();

    const onClick = () => {
        router.push("/blog");
    }

    return ( 
        <div className="flex flex-row items-center text-sm text-gray-200/60 hover:underline p-8 hover:cursor-pointer"
        onClick={onClick}>

<ArrowLeft className="w-4 h-4 mr-2" />
Zurück zur Übersicht
        </div>
     );
}
 
export default BackToMain;