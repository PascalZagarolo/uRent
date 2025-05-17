'use client'

import { useSavedSearchParams, useGetFilterAmount } from "@/store";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import qs from "query-string";
import { ArrowRight, Search, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import NumberTicker from "@/components/magicui/number-ticker";


const MainPageResults = () => {

    const searchParams = useSavedSearchParams((state) => state.searchParams);
    const changeAmount = useGetFilterAmount((state) => state.changeAmount);

    const savedSearchParams = useSearchParams();

    const [currentResults, setCurrentResults] = useState(null);


    const getSearchResults = async () => {
        try {
            const values = searchParams;
            // Make sure we're passing any filters correctly
            const results = await axios.patch('/api/search', values);
            
            // Check if we have results data and it's a number (total count)
            if (results.data !== undefined) {
                // Store the current result count for display
                setCurrentResults(results.data);
                
                // Ensure we're setting a numeric value to the filter amount
                const resultCount = Number(results.data);
                
                // Always update the global store with the total count
                // This ensures pagination works correctly even with sorting applied
                changeAmount(resultCount > 0 ? resultCount : 0);
            }
        } catch (error) {
            console.error("Error fetching search results:", error);
            // Set a default value on error
            setCurrentResults(0);
            changeAmount(0);
        }
    }

    const router = useRouter();

    const firstLoad = useRef(true);
   
    useEffect(() => {
       console.log()
        if(firstLoad.current) {
            firstLoad.current = false;
            getSearchResults();
            return;
        }
    }, [savedSearchParams]);

   
    useEffect(() => {
        if(!firstLoad.current) {
            getSearchResults();
            return;
        }
    }, [searchParams]);
  
    const onRedirect = () => {


        const {//@ts-ignore
            thisCategory, ...filteredValues } = searchParams;


        //@ts-ignore
        const usedStart = filteredValues.periodBegin;

        let usedEnd = null;


        //@ts-ignore
        if (filteredValues.periodEnd) {
            //@ts-ignore
            usedEnd = filteredValues.periodEnd;
        } else {
            //@ts-ignore
            if (filteredValues.periodBegin) {
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

    const isMounted = useRef(false)

    useEffect(() => {
        isMounted.current = true;
    }, [])

    if (!isMounted.current) return null;

    return (
        <div className="px-4 mb-4">
            <button
                onClick={onRedirect}
                className="w-full h-24 rounded-md  flex-col px-2.5  bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all duration-200"
            >

                <div className="flex flex-col items-center justify-center">
                    
                    <div className="flex items-center justify-center font-semibold mt-2">
                    <div className="font-semibold text-base flex items-center ">
                        <SearchIcon className="h-4 w-4 mr-2" />

                    </div>
                        {currentResults ? <NumberTicker value={currentResults as any} /> : 0}
                    </div>
                    <div className="text-sm">Ergebnisse gefunden</div>
                </div>
            </button>
        </div>
    );
}

export default MainPageResults;