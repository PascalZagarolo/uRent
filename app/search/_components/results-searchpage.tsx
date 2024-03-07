'use client'

import { getSearchResults } from "@/actions/getSearchResults";
import { Button } from "@/components/ui/button";
import { useSavedSearchParams } from "@/store";
import axios from "axios";
import { ArrowRightCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";


const ResultsSearchPage = () => {

    const searchParams = useSavedSearchParams((state) => state.searchParams);
    const [currentResults, setCurrentResults] = useState();
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

    return ( 
        <Button className="bg-blue-800 hover:bg-blue-900 text-gray-100 font-medium">
            Zu den <p className="font-bold px-1"> {currentResults} </p> Ergebnissen <ArrowRightCircle className="w-4 h-4 ml-2" />
        </Button>
     );
}
 
export default ResultsSearchPage;