'use client'

import { Button } from "@/components/ui/button";
import { useSavedSearchParams } from "@/store";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import qs from "query-string"
import { ArrowRightIcon } from "lucide-react";
import NumberTicker from "@/components/magicui/number-ticker";

const ResultsSearchPage = () => {
    const searchParams = useSavedSearchParams((state) => state.searchParams);
    const [currentResults, setCurrentResults] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Fetch search results
    useEffect(() => {
        const getSearchResults = async () => {
            try {
                setIsLoading(true);
                const values = searchParams;
                const results = await axios.patch('/api/search', values);
                setCurrentResults(results.data ? results.data : 0);
                router.refresh();
            } catch (error) {
                console.error("Error fetching search results:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getSearchResults();
    }, [searchParams, router]);

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
        }, { skipEmptyString: true, skipNull: true });
        
        router.push(url);
    };

    return (
        <Button
            onClick={onRedirect}
            disabled={isLoading}
            className="relative overflow-hidden group px-4 py-2 h-10 sm:h-11 sm:px-6 bg-gradient-to-r from-indigo-800 to-indigo-700 hover:from-indigo-700 hover:to-indigo-600 text-white font-medium rounded-md transition-all duration-300 shadow-md hover:shadow-lg focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#16161f] focus:outline-none"
            aria-label={`Zeige ${currentResults} Ergebnisse an`}
        >
            {/* Subtle shine effect */}
            <div className="absolute inset-0 w-1/3 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-20deg] transform -translate-x-full group-hover:translate-x-[300%] transition-all duration-1000"></div>
            
            <div className="flex items-center space-x-2 relative z-10">
                <div className="flex items-center">
                    <span className="font-semibold mr-1">
                        {isLoading ? (
                            <span className="h-5 w-7 bg-indigo-500/30 rounded animate-pulse"></span>
                        ) : (
                            <NumberTicker value={currentResults} />
                        )}
                    </span>
                    <span className="hidden sm:inline-block">Ergebnisse</span>
                </div>
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
        </Button>
    );
};

export default ResultsSearchPage;