import { CheckIcon, Info } from "lucide-react";

interface RenderErrorMessageProps {
    error: string;
}

export const RenderErrorMessage = ({ error }: RenderErrorMessageProps) => {
    return (
        <div className="text-red-600 text-sm flex flex-row items-center py-2">
           <Info className="w-4 h-4 mr-2" /> {error}
        </div>
    );
};

export const RenderSuccessMessage = ({ success } : { success: string }) => {
    return (
        
            <div className="text-emerald-600 text-sm flex flex-row items-center py-2">
               <CheckIcon className="w-4 h-4 mr-2" /> 
            </div>
       
    )
}
