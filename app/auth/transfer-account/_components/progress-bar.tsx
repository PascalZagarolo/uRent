import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { TbTransferVertical } from "react-icons/tb";

interface ProgressBarProps {
    currentStep : number
}

const ProgressBar = ({ currentStep } : ProgressBarProps) => {
    const steps = ["Email ändern", "Passwort ändern", "Änderungen bestätigen"];

    return (
        <div>
            <div className="w-full flex justify-between items-center px-4 py-6">
                {steps.map((step, index) => (
                    <div key={index} className="flex items-center w-full">
                        {/* Circle */}
                        <div className={cn("flex flex-col items-center w-40", )}>
                            <div className={cn(
                                "w-12 h-12 items-center justify-center flex flex-row border font-semibold border-gray-200 rounded-full",
                                currentStep >= index + 1 && "border-2 border-indigo-600", currentStep > index + 1 && "bg-indigo-800"
                            )}>
                                {currentStep > index + 1 ? (
                                    <CheckIcon 
                                    className="w-4 h-4"
                                    />
                                ) : (
                                    index + 1
                                )}
                            </div>
                            <span className={cn("mt-2 text-sm text-center ", currentStep == index + 1 && "font-bold")}>{step}</span>
                        </div>

                        {/* Dotted Line */}
                        {index < steps.length - 1 && (
                            <div className="flex-grow border-t-4 border-dotted border-gray-300 mx-4" />
                        )}
                    </div>
                ))}

            </div>
            <div>
                <div className="text-lg font-semibold flex flex-row">
                    <TbTransferVertical 
                    className="w-4 h-4 mr-2"
                    />
                    Account übertragen
                </div>
                <div className="text-sm text-gray-200/60">
                    Übertrage deinen Account in wenigen Sekunden, gebe deine Email an welche du verknüpfen möchtest und lege ein neues Passwort fest.
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
