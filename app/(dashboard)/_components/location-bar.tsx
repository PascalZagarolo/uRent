'use client'

import { use, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from 'query-string';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPinned } from "lucide-react";
import { getSearchParamsFunction } from "@/actions/getSearchParams";
import axios from "axios";
import Proximity from "./proximity";
import { useSavedSearchParams } from "@/store";

const AutoComplete = () => {
  const autoCompleteRef = useRef();
  const usedSearchParams = useSearchParams();
  const router = useRouter();
  
  const currentLocation = usedSearchParams.get("location");
  
  const [value, setValue] = useState(currentLocation || "");

  const inputRef = useRef();
  const options = {
    componentRestrictions: { country: "de" },
    fields: ["address_components", "geometry", "icon", "name"],
  };

  const params = getSearchParamsFunction("location");

  useEffect(() => {
    if (window.google) {
      //@ts-ignore
      autoCompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        options
      ); 
    }
  }, [currentLocation, value]);

  

  

  const getCurrentLocation = () => {
    const status = document.querySelector('status');
    const success = async (position : any) => {
      console.log(position.coords.latitude, position.coords.longitude);
      const addressObject = await axios.get(`https://geocode.maps.co/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&api_key=65db7269a0101559750093uena07e08`);
      const addressString = addressObject.data?.address?.road + " " + addressObject.data?.address?.city + ", "  + (addressObject.data?.address?.country === "Germany" ? 
      "Deutschland" : addressObject.data?.address?.country)
      const url = qs.stringifyUrl({
        url: "/",
        query: {
          //@ts-ignore
          location: addressString,
          ...params
        }
      }, { skipEmptyString: true, skipNull: true });
      router.push(url);
      router.refresh();
      
    }
    const error = () => {
      status.textContent = 'Unable to retrieve your location';
    }
    navigator.geolocation.getCurrentPosition(success, error);
  }

  const onSearch = () => {
    const {//@ts-ignore
        thisCategory, ...filteredValues} = searchParams;
        
    //@ts-ignore
    const usedStart = filteredValues.periodBegin;

    let usedEnd = null;
    
//@ts-ignore
    if(filteredValues.periodEnd){
    //@ts-ignore
    usedEnd = filteredValues.periodEnd;
    } else {
        //@ts-ignore
        if(filteredValues.periodBegin) {
            //@ts-ignore
            usedEnd = filteredValues.periodBegin;
        }
    }
    
    const url = qs.stringifyUrl({
        url: process.env.NEXT_PUBLIC_BASE_URL,
        //@ts-ignore
        query: {
            //@ts-ignore
            category: thisCategory,
            //@ts-ignore
            periodBegin: usedStart ? usedStart : null,
            //@ts-ignore
            periodEnd: usedEnd ? usedEnd : null,
            //@ts-ignore
            type: filteredValues.thisType,
            ...filteredValues
        },

    }, { skipEmptyString: true, skipNull: true })
    
    
    router.push(url);
}

const currentObject = useSavedSearchParams((state) => state.searchParams)
  
      const {searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

useEffect(() => {
  
  changeSearchParams("location", value);
  if(!value){
    deleteSearchParams("location");
  }
},[value])

const handleKeyDown = (e : any) => {
  if (e.key === "Enter") {
      onSearch();
  }
};

  return (
    <div className="lg:flex items-center mr-4 hidden">
      <div className="flex items-center mt-2 w-full flex-shrink">
        <div className="flex sm:pr-2">
        <Input
          ref={inputRef}
          onKeyDown={handleKeyDown}
          defaultValue={currentLocation || ""}
          placeholder="Standort.."
          className="p-2.5 2xl:pr-16 xl:pr-4 rounded-none input: text-sm input: justify-start dark:focus-visible:ring-0 bg-[#1B1F2C] border-none"
          onChange={(e) => { setValue(e.target.value) }} 
          onBlur ={(e) => {setValue(e.target.value)}}
          />
          <Button className="p-3 bg-slate-800 dark:hover:bg-slate-700 rounded-none" onClick={onSearch}>
          <MapPinned className="text-white h-4 w-4 lg:block hidden hover:cursor-pointer" />
        </Button>
            <Proximity />
          
        </div>
        
      </div>
      
    </div>
  );
};

export default AutoComplete;
