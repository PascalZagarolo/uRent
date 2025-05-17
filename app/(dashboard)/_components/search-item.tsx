'use client'

import qs from "query-string"
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { Search, X } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { useEffect, useRef, useState } from "react";
import { getSearchParamsFunction } from "@/actions/getSearchParams";
import axios from "axios";


import { FaUserTie } from "react-icons/fa6";
import { userTable } from "@/db/schema";

import { useLoadingState, useSavedSearchParams } from "@/store";
import { first } from "lodash";



const SearchItem = () => {

    const usedSearchParams = useSearchParams();
    const router = useRouter();
        
    const currentTitle = usedSearchParams.get("title")

    const [value, setValue] = useState(currentTitle || "");

  
    const [showDropdown, setShowDropdown] = useState(false);


      const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

      const hasInitialized = useRef(false);

      const debouncedValue = useDebounce(value, 200);

      const pathname = usePathname();

      useEffect(() => {
        changeSearchParams("title", debouncedValue);
      },[debouncedValue])


      useEffect(() => {
         setValue(currentTitle || "")
         changeSearchParams("title", currentTitle || "");
      }, [currentTitle])

 


    const onSearch = () => {
        changeLoading(true);
        //@ts-ignore
        const { thisCategory, ...filteredValues } = {
            ...searchParams,
            title: value, // <-- Inject up-to-date value here
        };
    //@ts-ignore
        const usedStart = filteredValues.periodBegin;
        //@ts-ignore
        const usedEnd = filteredValues.periodEnd || usedStart || null;
    
        const url = qs.stringifyUrl({
            url: process.env.NEXT_PUBLIC_BASE_URL,
            //@ts-ignore
            query: {
                category: thisCategory,
                periodBegin: usedStart || null,
                periodEnd: usedEnd || null,
                //@ts-ignore
                type: filteredValues.thisType,
                ...filteredValues,
            },
        }, { skipEmptyString: true, skipNull: true });
    
        router.push(url);
    };
    

    const { loading, changeLoading } = useLoadingState()
    

    

    const handleKeyDown = (e : any) => {
        if (e.key === "Enter") {
            onSearch();
        }
    };

    return (
        <div className="flex w-full items-center justify-start sm:position: static sm:mr-4 md:mr-4 2xl:mr-4">
            <div className="w-full relative group">
                <div className="flex items-center w-full">
                    <div className="absolute left-3.5 text-indigo-400/80 z-10 pointer-events-none group-hover:text-indigo-300 transition-colors">
                        <Search className="h-3.5 w-3.5 stroke-[2.2px]" /> 
                    </div>
                    <Input
                        className="2xl:w-[280px] w-full pl-10 
                        border-none rounded-l-md dark:focus-visible:ring-0 focus:border-none sm:bg-[#1B1F2C]/90 bg-[#252a3d] hover:bg-[#252a3d] 
                        focus:bg-[#252a3d] focus:ring-1 focus:ring-indigo-500/60 transition-all duration-200 shadow-md text-sm "
                        placeholder="Ich suche nach..."
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={handleKeyDown}

                        maxLength={200}
                    />
                    {value && (
                        <div 
                            className="absolute right-3.5 text-gray-400 hover:text-gray-200 transition-colors cursor-pointer"
                            onClick={() => setValue("")}
                        >
                            <X className="h-3.5 w-3.5 stroke-[2.2px]" />
                        </div>
                    )}
                </div>
                
                {showDropdown && (
                    <div className="absolute w-full bg-[#1B1F2C]/95 backdrop-blur-sm rounded-b-md space-y-2 text-sm shadow-lg z-20 mt-1 border border-indigo-500/10" onBlur={() => {setShowDropdown(false)}}>
                        {/* Dropdown content */}
                    </div>
                )}
            </div>

            <div 
                className="px-4  h-10 rounded-none rounded-r-md bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 hover:cursor-pointer lg:hidden xl:flex flex-shrink-0 shadow-md flex items-center justify-center"
                onClick={onSearch}
            >
                <Search className="text-white h-4 w-4 stroke-[2.5px]" />
            </div>
        </div>
    );
}

export default SearchItem;