'use client'


import { getSearchParamsFunction } from "@/actions/getSearchParams";
import ExistingFilterBubble from "./existing-filter-bubble";

const MobileFilter = () => {

    const searchParams = getSearchParamsFunction();

    const isEmpty = Object.values(searchParams).every((value) => value === null);

    return (
        <div>
            {!isEmpty && (
                <div className="mt-1 w-full flex flex-wrap gap-y-1 gap-x-2">
                {Object.entries(searchParams)
                    .filter(([key, value]) => value !== null)
                    .map(([pKey, value]) => (

                        <ExistingFilterBubble key={pKey} value={value} pKey={pKey} />
                    ))}
            </div>
            )}
        </div>
    );
}

export default MobileFilter;