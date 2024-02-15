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
            <div className={cn("mt-2 w-[480px]  text-gray-200/90  ", isUnfolded ? "" : "h-[40px] truncate")}>
                                    {inserat.description}
            </div>
            {inserat.description.length > 60 && (
                <div className="w-full mt-2">
                <Button className="w-full border-2 border-gray-300" onClick={() => {isUnfolded ? setIsUnfolded(false) : setIsUnfolded(true)}}>
                    Mehr anzeigen
                </Button>
            </div>
            )}
        </div>
     );
}
 
export default InseratDescription;