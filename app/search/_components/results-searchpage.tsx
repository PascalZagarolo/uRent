'use client'


import { Button } from "@/components/ui/button";
import { useSavedSearchParams } from "@/store";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import qs from "query-string"
import { BiArrowToRight } from "react-icons/bi";
import NumberTicker from "@/components/magicui/number-ticker";


const ResultsSearchPage = () => {

    const searchParams = useSavedSearchParams((state) => state.searchParams);


    const [currentResults, setCurrentResults] = useState(0);
    
    const router = useRouter();
    //? Fix 429-Error in Axios, because of too many requests regarding location..
    useEffect(() => {
        const getSearchResults = async () => {
            const values = searchParams
            const results = await axios.patch('/api/search', values);
            setCurrentResults(results.data ? results.data : 0);
            router.refresh();
        }
        getSearchResults();
    }, [searchParams]);

    

    const onRedirect = () => {

        const filteredValues = searchParams;
        //@ts-ignore
        const usedStart = filteredValues.periodBegin;
        //@ts-ignore
        const usedEnd = filteredValues.periodEnd;
        
        const url = qs.stringifyUrl({
            url: process.env.NEXT_PUBLIC_BASE_URL,


            //@ts-ignore
            query: {
                //@ts-ignore
                category: filteredValues.thisCategory,
                //@ts-ignore
                periodBegin: filteredValues.periodBegin ? usedStart.toISOString() : null,
                //@ts-ignore
                periodEnd: filteredValues.periodEnd ? usedEnd.toISOString() : null,
                //@ts-ignore
                type: filteredValues.thisType,
                ...filteredValues
            },

        }, { skipEmptyString: true, skipNull: true })
        
        router.push(url);
    }

    


    return (
        <Button className="bg-blue-800 hover:bg-blue-900 text-gray-100 font-base sm:p-8 text-xs sm:text-sm" onClick={onRedirect}>
            <p className="font-bold px-1"> 
            {currentResults ? <NumberTicker value={currentResults} /> : 0}
             </p> Ergebnisse <BiArrowToRight className="w-4 h-4 ml-2" />

        </Button>
    );
}

export default ResultsSearchPage;