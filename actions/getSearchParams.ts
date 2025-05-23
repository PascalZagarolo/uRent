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
        startTime : searchParams.get("startTime"),
        endTime : searchParams.get("endTime"),
        startDateDynamic : searchParams.get("startDateDynamic"),
        endDateDynamic : searchParams.get("endDateDynamic"),
        reqTime : searchParams.get("reqTime"),
        dynamicSearch : searchParams.get("dynamicSearch"),
        /*
        page : searchParams.get("page"),
        */
        start : searchParams.get("start"),
        end : searchParams.get("end"),
        license : searchParams.get("license"),
        amount: searchParams.get("amount"),
        //Sort
        filter : searchParams.get("filter"),
        //Conditions
        reqAge : searchParams.get("reqAge"),
        caution: searchParams.get("caution"),

        //PKW
        brand : searchParams.get("brand"),
        thisBrand : searchParams.get("thisBrand"),
        
        seats : searchParams.get("seats"),
        seatsMax : searchParams.get("seatsMax"),
        fuel : searchParams.get("fuel"),
        transmission : searchParams.get("transmission"),
        type : searchParams.get("type"),
        doors : searchParams.get("doors"),
        doorsMax : searchParams.get("doorsMax"),
        power : searchParams.get("power"),
        powerMax : searchParams.get("powerMax"),
        freeMiles : searchParams.get("freeMiles"),
        extraCost : searchParams.get("extraCost"),
        ahk : searchParams.get("ahk"),

        //LKW
        lkwBrand : searchParams.get("lkwBrand"),
        application : searchParams.get("application"),
        loading : searchParams.get("loading"),
        drive : searchParams.get("drive"),
        weightClass : searchParams.get("weightClass"),
        weightClassMax : searchParams.get("weightClassMax"),
        payload : searchParams.get("payload"),
        payloadMax : searchParams.get("payloadMax"),

        //TRAILER
        coupling : searchParams.get("coupling"),
        extraType : searchParams.get("extraType"),
        axis : searchParams.get("axis"),
        axisMax : searchParams.get("axisMax"),
        brake : searchParams.get("brake"),

        //TRANSPORT
        transportBrand : searchParams.get("transportBrand"),


        //Loading
        volume : searchParams.get("volume"),

        loading_h : searchParams.get("loading_h"),
        loading_l : searchParams.get("loading_l"),
        loading_b : searchParams.get("loading_b"),

        radius : searchParams.get("radius"),

        user : searchParams.get("user"),
        
        //ELSE
        inseratId : searchParams.get("inseratId"),

        initial : searchParams.get("initial"),
        initialMax : searchParams.get("initialMax")

    }
    if (currentCategory && params.hasOwnProperty(currentCategory)) {
        //@ts-ignore
        delete params[currentCategory];
        if (currentCategory2 && params.hasOwnProperty(currentCategory2)) {
            //@ts-ignore
            delete params[currentCategory2];
          } 
      }
      
    return params;

}