'use client'


import { Button } from "@/components/ui/button";
import { useSavedSearchParams } from "@/store";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import qs from "query-string"
import { BiArrowToRight } from "react-icons/bi";


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
        <Button className="bg-blue-800 hover:bg-blue-900 text-gray-100 font-base p-8" onClick={onRedirect}>
             <p className="font-bold px-1"> {currentResults} </p> Ergebnisse <BiArrowToRight   className="w-4 h-4 ml-2" />

        </Button>
     );
}
 
export default ResultsSearchPage;