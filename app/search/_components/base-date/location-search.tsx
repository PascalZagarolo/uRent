import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from 'query-string';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPinned } from "lucide-react";
import { useSavedSearchParams } from "@/store";

const LocationSearch = () => {
  const autoCompleteRef = useRef();
  
  const router = useRouter();
  const pathname = usePathname();


const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

const currentObject = useSavedSearchParams((state) => state.searchParams)
  
 
  //@ts-ignore
  const [value, setValue] = useState(currentObject["location"] || "")
  const [count, setCount] = useState(0);
  
  

  const inputRef = useRef();
  const options = {
    componentRestrictions: { country: "de" },
    fields: ["address_components", "geometry", "icon", "name"],
  };

  useEffect(() => {
    if (window.google) {
      //@ts-ignore
      autoCompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        options
      );

      
    }
  }, []);

  



  
    const setLocation = (currentString : string) => {
      changeSearchParams("location", currentString);
    }

    const deleteLocation = () => {
      deleteSearchParams("location");
    }

 

  return (
    <div className="items-center">
      <h3 className="font-semibold flex">
         <MapPinned  className="w-4 h-4 mr-2"/> Addresse
        </h3>
      <div className=" flex items-center mt-2 w-full flex-shrink">
        
        <Input
          ref={inputRef}
          placeholder="Standort.."
          className=" rounded-md input: text-sm input: justify-start dark:focus-visible:ring-0 dark:bg-[#141414] dark:border-none"
          onChange={(e) => { setValue(e.target.value); console.log(e.target.value)}}
          value={value}
          onBlur={() => {
            //@ts-ignore 
            setValue(inputRef?.current?.value); 
            //@ts-ignore 
          if(inputRef?.current?.value) {//@ts-ignore 
            setLocation(inputRef?.current?.value);
          } else {
            deleteLocation();
          }
          }}
          />
        
      </div>
     
    </div>
  );
};

export default LocationSearch;
