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

const AutoComplete = () => {

  const usedSearchParams = useSearchParams();
  const usedLocation = usedSearchParams.get("location");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

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
        console.log(types, types.includes("establishment"))
        console.log(!types.includes("geocode") || types.includes("establishment"))
        if(terms.length === 4 || terms.length > 4 && (!types.includes("geocode") || types.includes("establishment"))) {
          console.log(1)
          usedLocation = terms[1].value + " " + terms[2].value + " " + terms[3].value;
          
        }
        
        setValue(usedLocation, false);
        clearSuggestions();
        onSearch(usedLocation);



      };

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
  const currentObject: any = useSavedSearchParams((state) => state.searchParams)

  const debouncedValue = useDebounce(value, 300);


  useEffect(() => {

    changeSearchParams("location", value);
    if (!value) {
      deleteSearchParams("location");
    }
  }, [debouncedValue])


  const handleInput = (e: any) => {

    setValue(e.target.value);
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      console.log(suggestion)


      const {
        place_id,
        structured_formatting: { main_text, secondary_text },

      } = suggestion;

      return (
        <li key={place_id} onClick={
          handleSelect(suggestion)
        } className="flex pl-4 pr-2 py-4 gap-x-2 hover:cursor-pointer">
          <div><PinIcon className="w-4 h-4  text-rose-600" /></div> <div><strong>{main_text}</strong> <small>{secondary_text}</small></div>
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

  useEffect(() => {
    if (usedLocation) {
      setValue(usedLocation)
      changeSearchParams("location", usedLocation)
    }
  }, [])



  return (

    <div className="lg:flex items-center mr-4 hidden relative" ref={ref}>
      <div className="flex items-center mt-2 w-full flex-shrink" >
        <div className="flex sm:pr-2">
          <div className="flex">
            <Input
              value={value}
              onKeyDown={handleKeyDown}
              className="p-2.5 2xl:pr-16 xl:pr-4 rounded-none 2xl:w-[272px]
        input: text-sm input: justify-start dark:focus-visible:ring-0 bg-[#1B1F2C] border-none"
              onChange={handleInput}
              disabled={!ready}
              placeholder="Standort.."
            />


            <Button className="p-3 bg-slate-800 dark:hover:bg-slate-700 rounded-none" onClick={() => { onSearch() }}>
              <MapPinned className="text-white h-4 w-4 lg:block hidden hover:cursor-pointer" />
            </Button>
          </div>
          <Proximity />
        </div>
      </div>


      <div className="absolute 2xl:w-[272px]  top-full bg-[#141721] rounded-b-md space-y-2 text-sm  z-10">
        {status === "OK" && (
          <ul className="overflow-y-auto h-full ">
            {renderSuggestions()}
          </ul>
        )}
      </div>
    </div>




  );
}

export default AutoComplete;