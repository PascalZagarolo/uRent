'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPinned, PinIcon } from "lucide-react";
import useOnclickOutside from "react-cool-onclickoutside";
import usePlacesAutocomplete, {

} from "use-places-autocomplete";
import Proximity from "./proximity";
import { useSavedSearchParams } from "@/store";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";
import qs from "query-string";
import { Separator } from "@/components/ui/separator";

const AutoComplete = () => {

  const usedSearchParams = useSearchParams();
  const usedLocation = usedSearchParams.get("location");
 

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: "initMap",
    requestOptions: {
      componentRestrictions: { country: "de" },

    },
    debounce: 300,

  });


  const ref = useOnclickOutside(() => {
    // When the user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleSelect =
    ({ description, terms, types }: any) =>
      () => {

        // When the user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter to "false"
        
        let usedLocation = description;
        // console.log(types, types.includes("establishment"))
        // console.log(!types.includes("geocode") || types.includes("establishment"))
        if(terms.length === 4 || terms.length > 4 && (!types.includes("geocode") || types.includes("establishment"))) {
          console.log(1)
          usedLocation = terms[1].value + " " + terms[2].value + " " + terms[3].value;
          
        }
        
        setValue(usedLocation, false);
        clearSuggestions();
        onSearch(usedLocation);



      };

      const debouncedValue = useDebounce(value, 300);

  const router = useRouter();

  const onSearch = (keyword?: string, backupCity? : string) => {
    const {//@ts-ignore
      thisCategory, location, ...filteredValues } = searchParams;

    //@ts-ignore
    const usedStart = filteredValues.periodBegin;

    let usedEnd = null;

    //@ts-ignore
    if (filteredValues.periodEnd) {
      //@ts-ignore
      usedEnd = filteredValues.periodEnd;
    } else {
      //@ts-ignore
      if (filteredValues.periodBegin) {
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
        location: keyword || location,
        locationCity : backupCity,

        ...filteredValues
      },

    }, { skipEmptyString: true, skipNull: true })


    router.push(url);
  }



  const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();
  




  useEffect(() => {

    if(value) {
      changeSearchParams("location", value);
    }
    if (!value) {
      deleteSearchParams("location");
    }
  }, [debouncedValue])


  const handleInput = (e: any) => {

    setValue(e.target.value);
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
    


      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={place_id}
          onClick={handleSelect(suggestion)}
          className="flex items-center px-4 py-2 gap-x-2 hover:bg-gray-700 hover:text-white rounded-lg transition-colors cursor-pointer"
        >
        <div>
        <PinIcon className="w-4 h-4 text-indigo-800" />
        </div>
          <div>
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </div>
        </li>
      );
    });

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {

      setTimeout(() => {
        onSearch();
      }, 300)
    }
  };

  // useEffect(() => {
  //   if (usedLocation) {
  //     setValue(usedLocation)
  //     changeSearchParams("location", usedLocation)
  //   }
  // }, [])



  return (

    <div className="lg:flex items-center mr-4 hidden relative" ref={ref}>
      <div className="flex items-center mt-2 w-full flex-shrink" >
        <div className="flex sm:pr-2">
          <div className="flex relative group">
            <div className="absolute left-3.5 text-indigo-400/80 z-10 pointer-events-none group-hover:text-indigo-300 transition-colors">
              <MapPinned className="h-3.5 w-3.5 mt-3" />
            </div>
            <Input
              value={value}
              onKeyDown={handleKeyDown}
              className="2xl:w-[280px] w-full 
              pl-10 border-none rounded-l-md rounded-r-none dark:focus-visible:ring-0 sm:bg-[#1B1F2C]/90 bg-[#252a3d] hover:bg-[#252a3d] focus:bg-[#252a3d] focus:ring-1 focus:ring-indigo-500/60 transition-all duration-200 shadow-md text-sm h-10"
              onChange={handleInput}
              disabled={!ready}
              placeholder="Standort.."
            />
            <Proximity />
          </div>
        </div>
      </div>


      <div className="absolute 2xl:w-[280px] top-full bg-[#1B1F2C]/90 rounded-b-md space-y-2 text-sm z-10">
        {status === "OK" && (
          <div className="absolute top-full left-0 w-full mt-1 py-2 bg-[#1B1F2C]/95 backdrop-blur-sm rounded-md shadow-lg z-10 border border-indigo-500/10">
            <ul className="overflow-y-auto max-h-[240px]">
              {renderSuggestions()}
            </ul>
            
            <span className="font-roboto font-medium text-xs leading-4 p-2 pr-4 tracking-[0.0575em] text-gray-400 flex justify-end">
              Google
            </span>
          </div>
        )}
      </div>
    </div>



  );
}

export default AutoComplete;