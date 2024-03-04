import { Separator } from "@/components/ui/separator";
import { Inserat, PkwAttribute } from "@prisma/client";
import PkwInformation from "./pkw-information";

interface CategoryInformationProps {
    inserat: Inserat & { pkwAttribute? : PkwAttribute};
}

const CategoryInformation: React.FC<CategoryInformationProps> = ({
    inserat
}) => {
    return (
        <div>
            <div className="flex justify-evenly items-center">
                <Separator
                    className="w-1/3 h-[0.5px] dark:bg-gray-100/20"
                />
                <h1 className="flex justify-center text-lg font-semibold">
                    {inserat.category} - Details
                </h1>
                <Separator
                    className="w-1/3 h-[0.5px] dark:bg-gray-100/20"
                />
            </div>
            <div>
                {
                    {
                        'PKW': <PkwInformation 
                        inserat = { inserat }
                        />,
                        
                    }[inserat.category]
                }
            </div>
        </div>
    );
}

export default CategoryInformation;