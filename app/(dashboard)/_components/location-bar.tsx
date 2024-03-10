import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from 'query-string';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPinned } from "lucide-react";
import { getSearchParamsFunction } from "@/actions/getSearchParams";

const AutoComplete = () => {
  const autoCompleteRef = useRef();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentLocation = searchParams.get("location");
  const currentTitle = searchParams.get("title");
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
  }, [currentLocation]);

  useEffect(() => {
    //@ts-ignore
    if (!inputRef?.current?.value) {
      const url = qs.stringifyUrl({
        url: pathname,
        query: {
          location: null,
          ...params
        }
      }, { skipEmptyString: true, skipNull: true });
      router.push(url);
    }
  }, [value]);

  useEffect(() => {
    // Store currentLocation in session storage
    sessionStorage.setItem("currentLocation", currentLocation);
  }, [currentLocation]);

  const onSearch = () => {
    const url = qs.stringifyUrl({
      url: "/",
      query: {
        //@ts-ignore
        location: inputRef?.current?.value,
        ...params
      }
    }, { skipEmptyString: true, skipNull: true });
    router.push(url);
  };

  return (
    <div className="lg:flex items-center hidden">
      <div className="2xl:mr-16 xl:mr-8 flex items-center mt-2 w-full flex-shrink">
        <Input
          ref={inputRef}
          defaultValue={currentLocation || ""}
          placeholder="Standort.."
          className="p-2.5 2xl:pr-16 xl:pr-4 rounded-md input: text-sm input: justify-start dark:focus-visible:ring-0"
          onChange={(e) => { setValue(e.target.value) }} />
        <Button className="p-3 bg-slate-800 dark:hover:bg-slate-700 ml-1 " onClick={onSearch}>
          <MapPinned className="text-white h-4 w-4 lg:block hidden hover:cursor-pointer" />
        </Button>
      </div>
      
    </div>
  );
};

export default AutoComplete;
