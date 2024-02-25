import { useDebounce } from "@/hooks/use-debounce";
import { LucideMapPinOff, MapPinOff, MapPinned, PinIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useEffect, useState, use } from "react";
import qs from 'query-string';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const AutoComplete = () => {
 const autoCompleteRef = useRef();
 const inputRef = useRef();
 const options = {
  componentRestrictions: { country: "de" },
  fields: ["address_components", "geometry", "icon", "name"],
  
 };

 const searchParams = useSearchParams();
 const [value, setValue] = useState(searchParams.get("location") || "");
 const debouncedValue = useDebounce(value);
 
 const router = useRouter();
 const pathname = usePathname();
 
 const currentLocation = searchParams.get("location");

 
 
useEffect(() => {
    //@ts-ignore
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
     inputRef.current ,
     options
    );
   }, [currentLocation]);

   
   
    
      const onSearch = () => {
        const url = qs.stringifyUrl({
          url: pathname,
          query : {
            // @ts-ignore
            location : inputRef?.current?.value
          }
        },  {skipEmptyString: true, skipNull: true})
        router.push(url)
      }

      useEffect(() => {
        if(!value) {
          const url = qs.stringifyUrl({
            url: pathname,
            query : {
              // @ts-ignore
              location : null
            }
          },  {skipEmptyString: true, skipNull: true})
          router.push(url)
        }
      }, [value])
   
 

 return (
  <div className="lg:flex items-center hidden">
   <div className="2xl:mr-16 xl:mr-8 flex items-center mt-2 w-full flex-shrink">
   <Input ref={inputRef} placeholder="Standort.." 
   className="p-2.5 2xl:pr-16 xl:pr-4  rounded-md input: text-sm border  border-black  input: justify-start dark:focus-visible:ring-0"
   
   onChange={(e) => {setValue(e.target.value)}}/>
   <Button className="p-3 bg-slate-800 dark:hover:bg-slate-700 " onClick={onSearch}>
    <MapPinned className="text-white h-4 w-4 2xl:block hidden hover:cursor-pointer" />
    
   </Button>
   </div>
  </div>
 );
};
export default AutoComplete;