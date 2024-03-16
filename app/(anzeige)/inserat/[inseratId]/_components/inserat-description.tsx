'use client';

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Inserat } from "@prisma/client";
import { useState } from "react";

interface InseratDescriptionProps {
    inserat : Inserat
 }

const InseratDescription: React.FC<InseratDescriptionProps> = ({
    inserat
}) => {

    const [isUnfolded, setIsUnfolded] = useState(false);
    
    return ( 
        <div className="overflow-hidden">
            <div className={cn("sm:w-[480px] w-full text-sm  text-gray-200/90  ", isUnfolded ? "" : "h-[18px]")}>
        {inserat.description}
            </div>
            {inserat.description.length > 60 && (
                <div className="w-full mt-2">
                <Button className="w-full bg-[#1D1F2B] hover:bg-[#242635] text-gray-100" onClick={() => {isUnfolded ? setIsUnfolded(false) : setIsUnfolded(true)}}>
                    {isUnfolded ? "Weniger" : "Mehr"} anzeigen
                </Button>
            </div>
            )}
        </div>
     );
}
 
export default InseratDescription;