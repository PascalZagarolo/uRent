'use client'

import { useSearchParams } from "next/navigation"


export const getSearchParamsFunction = (currentCategory? : string) => {

    const serachParams = useSearchParams();

    const params = {
        category: serachParams.get("category"),
        title: serachParams.get("title"),
        location: serachParams.get("location"),
        periodBegin: serachParams.get("periodBegin"),
        periodEnd: serachParams.get("periodEnd"),
        page : serachParams.get("page")
        
    }

    if (currentCategory && params.hasOwnProperty(currentCategory)) {
        delete params[currentCategory];
    }

    return params;

}