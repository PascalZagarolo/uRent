'use client'

import { Button } from "@/components/ui/button";
import { CategoryEnumRender } from "@/db/schema";
import { cn } from "@/lib/utils";
import { useSavedSearchParams } from "@/store";
import { CarFrontIcon, TruckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { PiVanFill } from "react-icons/pi";
import { RiCaravanLine } from "react-icons/ri";

const CategorySearch = () => {
    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();
    const [currentCategory, setCurrentCategory] = useState<any>();
    const [hasChanged, setHasChanged] = useState(false);
    const currentObject = useSavedSearchParams((state) => state.searchParams);

    const setCategory = (category: any) => {
        setHasChanged(true);
        setCurrentCategory(category);
        changeSearchParams("thisCategory", category);
    }

    const deleteCategory = () => {
        setHasChanged(true);
        setCurrentCategory(null);
        deleteSearchParams("thisCategory");
    }

    const deleteAttributes = () => {
        //PKW
        deleteSearchParams("brand");
        deleteSearchParams("thisBrand");
        deleteSearchParams("seats");
        deleteSearchParams("seatsMax");
        deleteSearchParams("doors");
        deleteSearchParams("fuel");
        deleteSearchParams("inital");
        deleteSearchParams("type");

        //LKW
        deleteSearchParams("application");
        deleteSearchParams("axis");
        deleteSearchParams("axisMax");
        deleteSearchParams("drive");
        deleteSearchParams("lkwBrand");
        deleteSearchParams("loading");
        deleteSearchParams("loading_b");
        deleteSearchParams("loading_h");
        deleteSearchParams("loading_l");
        deleteSearchParams("power");
        deleteSearchParams("powerMax");
        deleteSearchParams("transmission");
        deleteSearchParams("volume");
        deleteSearchParams("weightClass");

        //TRAILER
        deleteSearchParams("brake");
        deleteSearchParams("coupling");
        deleteSearchParams("brake");

        //TRANSPORT
        deleteSearchParams("transportBrand");
    }

    useEffect(() => {
        if(hasChanged) {
            deleteAttributes();
        }
    },[currentCategory]);

    const categories = [
        { id: 'PKW', label: 'Pkw', icon: <CarFrontIcon className="w-5 h-5" /> },
        { id: 'LKW', label: 'Lkw', icon: <TruckIcon className="w-5 h-5" /> },
        { id: 'TRAILER', label: 'Anhänger', icon: <RiCaravanLine className="w-5 h-5" /> },
        { id: 'TRANSPORT', label: 'Transporter', icon: <PiVanFill className="w-5 h-5" /> }
    ];

    return (
        <div className="w-full">
            <h3 className="text-lg font-semibold text-gray-100 mb-5">
                Fahrzeug-Kategorie
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {categories.map((category) => {
                    const isSelected = currentObject["thisCategory"] === category.id;
                    
                    return (
                        <button
                            key={category.id}
                            className={cn(
                                "group relative flex flex-col items-center justify-center rounded-lg transition-all duration-300 overflow-hidden",
                                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500",
                                "h-24 sm:h-28 bg-[#18181f]/70 hover:bg-[#1a1a24] border border-transparent",
                                isSelected && "border-indigo-600/50 bg-gradient-to-b from-indigo-900/20 to-indigo-950/30 shadow-sm"
                            )}
                            onClick={() => 
                                isSelected ? deleteCategory() : setCategory(category.id)
                            }
                            aria-label={`Kategorie ${category.label} ${isSelected ? 'abwählen' : 'auswählen'}`}
                            aria-pressed={isSelected}
                            role="switch"
                        >
                            {/* Subtle pulsing effect for selected item */}
                            {isSelected && (
                                <div className="absolute inset-0 bg-indigo-600/5 animate-pulse-slow rounded-lg" />
                            )}
                            
                            {/* Icon */}
                            <div className={cn(
                                "mb-2 flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 transform group-hover:scale-110",
                                isSelected
                                    ? "bg-indigo-950 border-indigo-500/50 text-indigo-300"
                                    : "border-indigo-900/20 text-indigo-400 group-hover:border-indigo-800/40 bg-[#1e1e2a]"
                            )}>
                                {category.icon}
                            </div>
                            
                            {/* Label */}
                            <span className={cn(
                                "font-medium text-sm transition-colors",
                                isSelected 
                                    ? "text-indigo-300"
                                    : "text-gray-300 group-hover:text-indigo-300"
                            )}>
                                {category.label}
                            </span>
                            
                            {/* Bottom accent line */}
                            <div className={cn(
                                "absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-indigo-500",
                                isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                            )} />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default CategorySearch;
