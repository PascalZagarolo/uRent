'use client'

import qs from "query-string"
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { Search, X } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { useEffect, useState } from "react";
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
    const [foundProfiles, setFoundProfiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isSearching, setIsSearching] = useState(true);

    

    const params = getSearchParamsFunction("user");


    const debouncedValue = useDebounce(value, 250);

    
    useEffect(() => {
        const findUser = async () => {
            if (debouncedValue) {
                setIsLoading(true);
                await axios.patch(`/api/search/user/${debouncedValue}`).then((res) => {
                    
                    setFoundProfiles(res.data)
                }).then(() => {
                    setIsLoading(false)
                })

            } else {
                setFoundProfiles([])
            }
        }
        findUser();
    }, [debouncedValue])


    const currentObject = useSavedSearchParams((state) => state.searchParams)
  
      const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    useEffect(() => {
        if(currentTitle) {
          changeSearchParams("title", currentTitle);
        }

        
      }, [])

      useEffect(() => {
        
        changeSearchParams("title", value);
        if(!value && !currentTitle) {
            
            deleteSearchParams("title");
            setValue("");
        }

        
      },[value])

      


    const onSearch = () => {
        changeLoading(true);
        const {//@ts-ignore
            thisCategory, ...filteredValues} = searchParams;
            
        //@ts-ignore
        const usedStart = filteredValues.periodBegin;

        let usedEnd = null;
        
    //@ts-ignore
        if(filteredValues.periodEnd){
        //@ts-ignore
        usedEnd = filteredValues.periodEnd;
        } else {
            //@ts-ignore
            if(filteredValues.periodBegin) {
                //@ts-ignore
                usedEnd = filteredValues.periodBegin;
            }
        }
        
        const url = qs.stringifyUrl({
            url: process.env.NEXT_PUBLIC_BASE_URL,
            //@ts-ignore
            query: {
                //@ts-ignore
                category: thisCategory,
                //@ts-ignore
                periodBegin: usedStart ? usedStart : null,
                //@ts-ignore
                periodEnd: usedEnd ? usedEnd : null,
                //@ts-ignore
                type: filteredValues.thisType,
                ...filteredValues
            },

        }, { skipEmptyString: true, skipNull: true })
        
        
        router.push(url);
    }

    const { loading, changeLoading } = useLoadingState()
    

    // const onUserSearch = (selectUser : typeof userTable.$inferSelect) => {
        
    //     setSelectedUser(selectUser);
        
        
    //     const url = qs.stringifyUrl({
    //         url: "/",
    //         query: {
    //             user : selectUser?.id || null,
    //             ...params,
    //         }
    //     }, { skipEmptyString: true, skipNull: true });
    //    setIsSearching(false);
    //     setShowDropdown(false)
    //    router.push(url)
    // }

    // const onUserDelete = () => {
    //     setSelectedUser(null)
    //     const url = qs.stringifyUrl({
    //         url : "/",
    //         query : {
    //             user : null,
    //             ...params
    //         }
    //     }, { skipEmptyString: true, skipNull: true })
    //     router.push(url)
    // }

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
                        onFocus={() => {setShowDropdown(true); setIsSearching(true)}}
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