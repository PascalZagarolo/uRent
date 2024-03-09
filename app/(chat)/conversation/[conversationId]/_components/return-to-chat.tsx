'use client';

import { ArrowLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const ReturnToChat = () => {

    const router = useRouter();

    return ( 
        <ArrowLeftCircle className="mr-4 hover:cursor-pointer sm:hidden block" 
                                onClick={() => router.push("/conversation")}
                                />
     );
}
 
export default ReturnToChat;