import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from 'query-string';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPinned } from "lucide-react";
import { useSavedSearchParams } from "@/store";

const LocationSearch = () => {
  const autoCompleteRef = useRef();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
;

  const currentObject = useSavedSearchParams((state) => state.searchParams);
  
 
  const currentTitle = searchParams.get("title");
  const [value, setValue] = useState(currentObject["location"] || "")
  

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

      console.log(google.maps.places.Autocomplete)
    }
  }, []);

  



  const onSearch = () => {
    const url = qs.stringifyUrl({
      url: "/",
      query: {
        //@ts-ignore
        location: inputRef?.current?.value,
        title: currentTitle
      }
    }, { skipEmptyString: true, skipNull: true });
    router.push(url);
  };

  return (
    <div className="items-center">
      <h3 className="font-semibold flex">
         <MapPinned  className="w-4 h-4 mr-2"/> Addresse
        </h3>
      <div className=" flex items-center mt-2 w-full flex-shrink">
        
        <Input
          ref={inputRef}
          placeholder="Standort.."
          className=" rounded-md input: text-sm input: justify-start dark:focus-visible:ring-0 dark:bg-[#141414] border-none"
          onChange={(e) => { setValue(e.target.value); console.log(e.target.value)}}
          //@ts-ignore 
          onBlur={() => {setValue(inputRef?.current?.value)}}
          />
        
      </div>
      
    </div>
  );
};

export default LocationSearch;
