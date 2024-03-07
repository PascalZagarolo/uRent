'use client'

import { getSearchResults } from "@/actions/getSearchResults";
import { Button } from "@/components/ui/button";
import { useSavedSearchParams } from "@/store";
import axios from "axios";
import { ArrowRightCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import qs from "query-string"


const ResultsSearchPage = () => {

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

        const filteredValues = searchParams;

        const url = qs.stringifyUrl({
            url : pathname,
            //@ts-ignore
            query : {
                ...filteredValues
            }
        })
        console.log(filteredValues)
        router.push(url);
    }

    return ( 
        <Button className="bg-blue-800 hover:bg-blue-900 text-gray-100 font-medium" onClick={onRedirect}>
            Zu den <p className="font-bold px-1"> {currentResults} </p> Ergebnissen <ArrowRightCircle className="w-4 h-4 ml-2" />
        </Button>
     );
}
 
export default ResultsSearchPage;