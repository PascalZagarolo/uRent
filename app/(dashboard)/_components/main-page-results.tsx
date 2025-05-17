'use client'

import { useSavedSearchParams, useGetFilterAmount } from "@/store";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import qs from "query-string";
import { SearchIcon } from "lucide-react";
import NumberTicker from "@/components/magicui/number-ticker";

const MainPageResults = () => {
    const searchParams = useSavedSearchParams((state) => state.searchParams);
    const changeAmount = useGetFilterAmount((state) => state.changeAmount);
    const savedSearchParams = useSearchParams();
    const router = useRouter();

    const [currentResults, setCurrentResults] = useState<number | null>(null);
    const [isReady, setIsReady] = useState(false);

    const getSearchResults = async () => {
        try {
            const values = searchParams;
            const results = await axios.patch('/api/search', values);

            if (results.data !== undefined) {
                const resultCount = Number(results.data);
                setCurrentResults(resultCount);
                changeAmount(resultCount > 0 ? resultCount : 0);
            }
        } catch (error) {
            console.error("Error fetching search results:", error);
            setCurrentResults(0);
            changeAmount(0);
        }
    };

    const onRedirect = () => {
        const { //@ts-ignore
            thisCategory, ...filteredValues } = searchParams;
//@ts-ignore
            const usedStart = filteredValues.periodBegin;
            //@ts-ignore
            let usedEnd = filteredValues.periodEnd || usedStart;

        const url = qs.stringifyUrl({
            url: process.env.NEXT_PUBLIC_BASE_URL!,
            //@ts-ignore
            query: {
                //@ts-ignore
                category: thisCategory,
                //@ts-ignore
                periodBegin: usedStart ?? null,
                //@ts-ignore
                periodEnd: usedEnd ?? null,
                //@ts-ignore
                type: filteredValues.thisType,
                ...filteredValues
            },
        }, { skipEmptyString: true, skipNull: true });

        router.push(url);
    };

    useEffect(() => {
        setIsReady(true); // Mark component as mounted
    }, []);

    useEffect(() => {
        if (isReady) {
            getSearchResults();
        }
    }, [isReady, savedSearchParams, [searchParams]]);

    return (
        <div className="px-4 mb-4">
            <button
                onClick={onRedirect}
                className="w-full h-24 rounded-md flex-col px-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all duration-200"
            >
                <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center font-semibold mt-2">
                        <div className="font-semibold text-base flex items-center ">
                            <SearchIcon className="h-4 w-4 mr-2" />
                        </div>
                        {currentResults !== null ? <NumberTicker value={currentResults} /> : 0}
                    </div>
                    <div className="text-sm">Ergebnisse gefunden</div>
                </div>
            </button>
        </div>
    );
};

export default MainPageResults;
