'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, MapPinned, PinIcon } from "lucide-react";
import useOnclickOutside from "react-cool-onclickoutside";
import usePlacesAutocomplete from "use-places-autocomplete";
import ProximityMobile from "./proximity-mobile";
import { useSavedSearchParams } from "@/store";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";
import qs from "query-string";
import { Separator } from "@/components/ui/separator";

const LocationBarMobile = () => {
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
                    className="flex items-center px-4 py-2 gap-x-2 hover:bg-indigo-600 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                    <PinIcon className="w-4 h-4 text-indigo-800" />
                    <div>
                        <strong>{main_text}</strong> <small>{secondary_text}</small>
                    </div>
                </li>
            );
        });

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setTimeout(() => {
                onSearch();
            }, 300);
        }
    };

    return (
        <div className="flex flex-row w-full items-center   bg-gray-800 rounded-lg shadow-md text-gray-100">
            <div className="flex items-center relative w-3/4" ref={ref}>
                <Input
                    value={value}
                    onKeyDown={handleKeyDown}
                    className="p-3 rounded-l-md rounded-r-none w-full  bg-[#2b2f3f] shadow-lg border-none text-white"
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder="Standort suchen..."
                />
                <div className="absolute w-full top-full bg-gray-800 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto mt-1">
                    {status === "OK" && (
                        <div className="py-2">
                            <ul>{renderSuggestions()}</ul>
                            <div className="text-right text-xs text-gray-400 pr-4 pt-2">
                                Powered by Google
                            </div>
                        </div>
                    )}
                </div>
                <Button className="p-3 bg-slate-800 dark:hover:bg-slate-700 rounded-none" onClick={() => { onSearch() }}>
              <div>
              <MapPin className="text-white h-4 w-4  hover:cursor-pointer" />
              </div>
            </Button>
            </div>
            
            <div className="w-1/4">
            <ProximityMobile />
            </div>
        </div>
    );
};

export default LocationBarMobile;
