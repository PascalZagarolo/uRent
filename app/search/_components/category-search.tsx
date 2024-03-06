import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Category } from "@prisma/client";
import { CarFrontIcon, CaravanIcon, Construction, TractorIcon, TramFrontIcon, TruckIcon } from "lucide-react";


const CategorySearch = () => {
    return (
        <div className="w-full">
            <h3 className="font-semibold text-md flex items-center">
                Fahrzeug-Kategorie
                <Separator 
                className="h-[0.5px] dark:bg-gray-100/20 w-2/3 ml-6"
                
                />
            </h3>
            <div className="w-full flex justify-between mt-4">
            {Object.values(Category).map((category, index) => (
                <Button key={index} value={category} className="dark:bg-[#141414] dark:hover:bg-[#1d1d1d] dark:text-gray-100 py-6">
                    {
                        {
                            'PKW': <CarFrontIcon className="w-6 h-6" />,
                            'LKW': <TruckIcon className="w-6 h-6"/>,
                            'LAND': <TractorIcon className="w-6 h-6"/>,
                            'BAU': <Construction className="w-6 h-6"/>,
                            'CARAVAN': <CaravanIcon className="w-6 h-6"/>,
                            'TRAILOR': <CaravanIcon className="w-6 h-6" />,
                            'TRANSPORT': <TramFrontIcon className="w-6 h-6"/>,
                        }[category]
                    }
                </Button>
            ))}
            </div>
        </div>
    );
}

export default CategorySearch;