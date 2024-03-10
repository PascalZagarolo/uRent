'use client'

import { useSearchParams } from "next/navigation"


export const getSearchParamsFunction = (currentCategory? : string, currentCategory2? : string) => {

    const searchParams = useSearchParams();

    const params = {
        category: searchParams.get("category"),
        title: searchParams.get("title"),
        location: searchParams.get("location"),
        periodBegin: searchParams.get("periodBegin"),
        periodEnd: searchParams.get("periodEnd"),
        page : searchParams.get("page"),
        start : searchParams.get("start"),
        end : searchParams.get("end"),
        //Conditions
        reqAge : searchParams.get("reqAge"),
        caution: searchParams.get("caution"),

        //PKW
        brand : searchParams.get("brand"),
        seats : searchParams.get("seats"),
        fuel : searchParams.get("fuel"),
        transmission : searchParams.get("transmission"),
        type : searchParams.get("type"),
        doors : searchParams.get("doors"),
        power : searchParams.get("power"),

        //LKW
        lkwBrand : searchParams.get("lkwBrand"),
        application : searchParams.get("application"),
        loading : searchParams.get("loading"),
        drive : searchParams.get("drive"),
        weightClass : searchParams.get("weightClass"),
        

    }
    if (currentCategory && params.hasOwnProperty(currentCategory)) {
        delete params[currentCategory];
        if (currentCategory2 && params.hasOwnProperty(currentCategory2)) {
            delete params[currentCategory2];
          } 
      }
      
      
    
    

    return params;

}