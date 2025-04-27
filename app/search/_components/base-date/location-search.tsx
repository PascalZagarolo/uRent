import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { MapPinned } from "lucide-react";
import { useSavedSearchParams } from "@/store";

const LocationSearch = () => {
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const router = useRouter();
  const pathname = usePathname();
  const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();
  const currentObject = useSavedSearchParams((state) => state.searchParams);
  
  //@ts-ignore
  const [value, setValue] = useState(currentObject["location"] || "");
  const [isFocused, setIsFocused] = useState(false);
  
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
  
  const setLocation = (currentString: string) => {
    changeSearchParams("location", currentString);
  };

  const deleteLocation = () => {
    deleteSearchParams("location");
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-indigo-900/20 text-indigo-400">
          <MapPinned className="w-4 h-4" />
        </div>
        <h3 className="font-medium text-sm text-gray-100">Standort</h3>
      </div>
      
      <div className="w-full group">
        <Input
          ref={inputRef}
          placeholder="Standort suchen..."
          className="h-10 transition-all duration-200 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500 border-0 bg-[#1e1e2a] placeholder:text-gray-500 text-gray-200 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24]"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            //@ts-ignore 
            setValue(inputRef?.current?.value); 
            //@ts-ignore 
            if(inputRef?.current?.value) {
              //@ts-ignore 
              setLocation(inputRef?.current?.value);
            } else {
              deleteLocation();
            }
          }}
          aria-label="Standort eingeben"
        />
        <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${isFocused ? 'w-full' : 'w-0'}`}></div>
      </div>
    </div>
  );
};

export default LocationSearch;
