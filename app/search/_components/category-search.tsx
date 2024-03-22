'use client'

import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CategoryEnumRender } from "@/db/schema";
import { cn } from "@/lib/utils";
import { useSavedSearchParams } from "@/store";

import { CarFrontIcon, CaravanIcon, Construction, TractorIcon, TramFrontIcon, TruckIcon } from "lucide-react";
import { PiVanFill } from "react-icons/pi";
import { RiCaravanLine } from "react-icons/ri";

const CategorySearch = () => {

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const currentObject = useSavedSearchParams((state) => state.searchParams)

    const setCategory = (category) => {
        changeSearchParams("category", category);
        console.log('category' in searchParams && searchParams['category'] === "PKW")
    }

    const deleteCategory = () => {
        deleteSearchParams("category")
    }
    

    return (
        <div className="w-full">
    <h3 className="font-semibold text-md flex items-center">
        Fahrzeug-Kategorie
        <Separator 
        className="h-[0.5px] dark:bg-gray-100/20 w-2/3 ml-6"
        />
    </h3>
    <div className="w-full flex justify-between mt-4">
        {Object.values(CategoryEnumRender).map((category, index) => (
            <div key={index} className="flex flex-col items-center"> 
                <Button 
                    value={category} 
                    className={cn(
                        "dark:bg-[#141414] dark:hover:bg-[#1d1d1d] dark:text-gray-100 py-6 border-2 dark:border-[#141414]", 
                        currentObject["category"] === category && "border-2 dark:border-blue-800"
                    )}
                    onClick={() => currentObject["category"] === category ? deleteCategory() : setCategory(category)}
                >
                    
                    {
                        {
                            'PKW': <CarFrontIcon className="w-6 h-6" />,
                            'LKW': <TruckIcon className="w-6 h-6"/>,
                            'TRAILER': <RiCaravanLine className="w-6 h-6"/>,
                            'TRANSPORT': <PiVanFill className="w-6 h-6" />,
                        }[category]
                    }   
                </Button>
                <span className={cn("text-sm mt-2  dark:text-gray-100", currentObject["category"] === category && " font-semibold")}>{
                        {
                            'PKW': "Pkw",
                            'LKW': "Lkw",
                            'TRAILER': "Anhänger",
                            'TRANSPORT': "Transporter",
                        }[category]
                    }</span> 
            </div>
        ))}
    </div>
</div>

    );
}

export default CategorySearch;
