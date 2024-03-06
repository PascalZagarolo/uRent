'use client'

import { getSearchResults } from "@/actions/getSearchResults";
import { Button } from "@/components/ui/button";
import { useSavedSearchParams } from "@/store";
import axios from "axios";
import { ArrowRightCircle } from "lucide-react";
import { useEffect, useState } from "react";


const ResultsSearchPage = () => {

    const searchParams = useSavedSearchParams((state) => state.searchParams);
    const [currentResults, setCurrentResults] = useState(0);

    useEffect (() => {
        const getSearchResults = async () => {
            
            const values = searchParams
            const results = await axios.patch('/api/search', values);
            setCurrentResults(results.data)
        }
        getSearchResults()
    }, [searchParams])

    return ( 
        <Button className="bg-blue-800 hover:bg-blue-900 text-gray-100 font-semibold">
            Zu den {currentResults} Ergebnissen <ArrowRightCircle className="w-4 h-4 ml-2" />
        </Button>
     );
}
 
export default ResultsSearchPage;
