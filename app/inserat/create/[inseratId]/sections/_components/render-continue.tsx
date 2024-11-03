'use client'

import { Button } from "@/components/ui/button";
import { ArrowRightCircleIcon } from "lucide-react";
import { ClipLoader } from "react-spinners";

interface RenderContinueProps {
    isLoading: boolean;
    disabled: boolean;
    onClick: () => void;
    hasChanged?: boolean;
}



const RenderContinue = ({ isLoading, disabled, onClick, hasChanged } : RenderContinueProps) => {
    return ( 
        <div>
            <Button className="bg-indigo-800 hover:bg-indigo-900 text-gray-200 hover:text-gray-300 w-full" onClick={onClick} disabled={disabled}>
                {isLoading ? (
                    <ClipLoader size={20} color="#fff" />
                ) : (
                    hasChanged ? (
                        "Speichern & Fortfahren"
                    ) : (
                        "Fortfahren"
                    )
                )}
                {!isLoading && (
                    <ArrowRightCircleIcon className="text-gray-200 w-4 h-4 ml-2" />
                )}
            </Button>
        </div>
     );
}
 
export default RenderContinue;