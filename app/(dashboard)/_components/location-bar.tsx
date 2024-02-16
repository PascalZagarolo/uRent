import { useDebounce } from "@/hooks/use-debounce";
import { PinIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import qs from 'query-string';


const AutoComplete = () => {
 const autoCompleteRef = useRef();
 const inputRef = useRef();
 const options = {
  componentRestrictions: { country: "de" },
  fields: ["address_components", "geometry", "icon", "name"],
  
 };
 const [value, setValue] = useState("");
 const debouncedValue = useDebounce(value);
 
 const router = useRouter();
 const pathname = usePathname();
 const searchParams = useSearchParams();
 const currentLocation = searchParams.get("location");

 
 
useEffect(() => {
    //@ts-ignore
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
     inputRef.current ,
     options
    );
   }, [currentLocation]);


 return (
  <div className="flex items-center">
   <div className="mr-16 flex items-center mt-2">
   <input ref={inputRef} placeholder="Gebe deine Addresse ein..." className="p-2.5 pr-16   rounded-md input: text-sm border border-black input: justify-start"
   onChange={(e) => setValue(e.target.value)}/>
   <div className="p-2">
    <PinIcon className="text-white h-4 w-4"/>
    {currentLocation}
   </div>
   </div>
  </div>
 );
};
export default AutoComplete;