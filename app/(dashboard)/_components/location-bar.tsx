import { useDebounce } from "@/hooks/use-debounce";
import { PinIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import qs from 'query-string';
import { Input } from "@/components/ui/input";


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
  <div className="lg:flex items-center hidden">
   <div className="2xl:mr-16 xl:mr-8 flex items-center mt-2 w-full flex-shrink">
   <Input ref={inputRef} placeholder="Standort.." 
   className="p-2.5 2xl:pr-16 xl:pr-4  rounded-md input: text-sm border   border-black  input: justify-start dark:focus-visible:ring-0"
   onChange={(e) => setValue(e.target.value)}/>
   <div className="p-2">
    <PinIcon className="text-white h-4 w-4 2xl:block hidden"/>
    {currentLocation}
   </div>
   </div>
  </div>
 );
};
export default AutoComplete;