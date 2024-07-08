'use client'

import { getSearchParamsFunction } from "@/actions/getSearchParams";
import { useSavedSearchParams } from "@/store";
import ExistingFilterBubble from "./existing-filter-bubble";

const ExistingFilter = () => {

    const searchParams = getSearchParamsFunction();

    return (
        <div className="w-full p-2 border-[#202336] border-l-none border-r-none border-t-2 border-b-2 bg-[#1B1E2C] text-xs">
            <div>
                <h3>
                    Suchfilter:
                </h3>
                <div className="mt-1 w-full flex flex-wrap gap-y-1 gap-x-1">
                    {Object.entries(searchParams)
                        .filter(([key, value]) => value !== null)
                        .map(([pKey, value]) => (
                            
                            <ExistingFilterBubble key={pKey} value={value} pKey={pKey} />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default ExistingFilter;