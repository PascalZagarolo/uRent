'use client'

import { CornerDownLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface ReturnBackToProps {
    inseratId : string
}


const ReturnBackTo: React.FC<ReturnBackToProps> = ({
    inseratId
}) => {

    const router = useRouter();

    return ( 
        <button onClick={() => {router.push(`/inserat/create/${inseratId}`)}}>
        <CornerDownLeft className="h-8 w-8" />
        </button>
     );
}
 
export default ReturnBackTo;