import { Button } from "@/components/ui/button";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";

interface StepFooterProps {
    currentPage: number;
    setCurrentPage: (number) => void;
    isDisabledPage1 : boolean;
    isDisabledPage2 : boolean;
    isDisabledPage3 : boolean;
}

const StepFooter = ({ currentPage, setCurrentPage, isDisabledPage1, isDisabledPage2, isDisabledPage3 }: StepFooterProps) => {
    const isCurrentPageDisabled = 
        (currentPage === 1 && isDisabledPage1) ||
        (currentPage === 2 && isDisabledPage2) ||
        (currentPage === 3 && isDisabledPage3);

    return (
        <div className="w-full flex flex-row items-center space-x-4">
            {currentPage > 1 && (
                <Button className="w-1/2 text-gray-200 bg-[#222222] hover:bg-[#242424]" onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage < 2}
                >
                    <ArrowLeftCircle className="w-4 h-4 mr-2" />
                    Zurück
                </Button>
            )}
            <Button
                className="w-1/2 ml-auto bg-indigo-800 hover:bg-indigo-900 text-gray-200"
                disabled={isCurrentPageDisabled}
                onClick={() => {
                    setCurrentPage(currentPage + 1);
                }}
            >
                Fortfahren 
                <ArrowRightCircle className="w-4 h-4 ml-2" />
            </Button>
        </div>
    );
};

export default StepFooter;
