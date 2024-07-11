'use client'

import { useSavedSearchParams } from "@/store";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import qs from "query-string";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import NumberTicker from "@/components/magicui/number-ticker";


const MainPageResults = () => {

    const searchParams = useSavedSearchParams((state) => state.searchParams);


    const [currentResults, setCurrentResults] = useState();
    const pathname = usePathname();
    const router = useRouter();
    //? Fix 429-Error in Axios, because of too many requests regarding location..
    useEffect(() => {
        const getSearchResults = async () => {
            const values = searchParams
            const results = await axios.patch('/api/search', values);
            setCurrentResults(results.data);
            router.refresh();
        }
        getSearchResults();
    }, [searchParams]);

    const onRedirect = () => {
        

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

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if(!isMounted) return null;

    return ( 
        <Button className="bg-blue-800 w-full h-[100px]  ml-2 mr-2  flex 
                    justify-center 
                    dark:text-gray-100 dark:hover:bg-sky-700" onClick={onRedirect}>
                        <SearchIcon className="h-5 w-5 mr-2" /> <p className="font-bold mr-1 "> 
                        <NumberTicker value={currentResults ? currentResults : 0} />
                         </p> Ergebnisse
                    </Button>
     );
}
 
export default MainPageResults;