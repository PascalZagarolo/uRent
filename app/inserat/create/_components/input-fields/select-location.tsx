'use client'

import { useDebounce } from "@/hooks/use-debounce";
import { AlertCircle, MapPin, PinIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { address, contactOptions, inserat } from "@/db/schema";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";


interface SelectLocationProps {
  thisInserat: typeof inserat.$inferSelect;
  thisAddressComponent?: typeof address.$inferSelect;
  usedContactOptions: typeof contactOptions.$inferSelect;
}

const SelectLocation: React.FC<SelectLocationProps> = ({
  thisInserat,
  thisAddressComponent,
  usedContactOptions
}) => {

  

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

  const [currentAddress, setCurrentAddress] = useState(thisAddressComponent?.locationString || "");
  const [currentZipCode, setCurrentZipCode] = useState<null | number | string>(thisAddressComponent?.postalCode || null);
  const [currentState, setCurrentState] = useState(thisAddressComponent?.state || "");

  useEffect(() => {
    //@ts-ignore
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );

  }, [currentLocation]);

  const onPrefill = (e : boolean) => {
    if(e) {
      setCurrentZipCode(usedContactOptions?.userAddress?.postalCode)
    let usedString = usedContactOptions?.userAddress?.street + ", " + usedContactOptions?.userAddress?.postalCode + ", "
    + usedContactOptions?.userAddress?.city

    usedString = usedString.trim();
    //@ts-ignore
    inputRef.current.value = usedString;
    setCurrentAddress(usedString);
    } else {
      setCurrentZipCode(thisAddressComponent?.postalCode || "")
      setCurrentAddress(thisAddressComponent?.locationString || "")
      //@ts-ignore
      inputRef.current.value = thisAddressComponent?.locationString || "";
    }
  }


  //automatically converts the inputAddress to a zip code with the help of geocode maps api, and sets the currentZipCode state
  const getZipCode = async () => {
    //@ts-ignore
    console.log(inputRef?.current?.value);
    //@ts-ignore
    const addressObject = await axios.get(`https://geocode.maps.co/search?q=${inputRef?.current?.value}&api_key=65db7269a0101559750093uena07e08`);
    let extractedZipCode;
    console.log(addressObject.data[0])
    const addressString = addressObject.data[0]?.display_name;
    const numberOfCommas = (addressString?.split(",").length - 1) > 2 ? 3 : 2;
    const extractedState = addressString?.split(",").map(item => item.trim());
    const newState = extractedState?.[extractedState?.length - numberOfCommas]
    console.log(newState);
    //?retrieve data until state is delivered..
    /* 
    if (extractedState?.[extractedState?.length - 3] === undefined) {
      for (let i = 0; i < addressObject.data.length; i++) {
        extractedState = addressObject.data[i].display_name.split(",");
        console.log(extractedState[extractedState?.length - 3])
        if (extractedState[extractedState?.length - 3] !== undefined) {
          setCurrentState(extractedState[extractedState?.length - 3]);
          break;
        }
      }
    }
    */
    setCurrentState(newState);
    //retrieve data until zipCode is delivered..
    for (let i = 0; i < addressObject.data.length; i++) {
      extractedZipCode = parseInt(addressObject.data[i]?.display_name.match(/\b0*\d{5}\b/));
      console.log(addressObject.data[i])
      if (!isNaN(extractedZipCode)) {
        setCurrentZipCode(extractedZipCode);
        return;
      }
    }
    console.log(extractedZipCode);
    if (extractedZipCode) {
      setCurrentZipCode(extractedZipCode)
    } else {
      setCurrentZipCode(null);
    }
  }

  useEffect(() => {
    //@ts-ignore
  }, [inputRef?.current?.value])

  const onSubmit = () => {
    try {
      const values = {
        //@ts-ignore
        locationString: inputRef?.current?.value || null,
        postalCode: currentZipCode,
        state: currentState
      }
      console.log(values);
      axios.patch(`/api/inserat/${thisInserat.id}/address`, values);
      setTimeout(() => {
        toast.success("Standort erfolgreich hinzugefügt");
        router.refresh();
      }, 500)
    } catch {
      toast.error("Etwas ist schief gelaufen");
    }
  }

  return (
    <div className="items-center w-full">
      <h3 className="text-md font-semibold items-center flex">
        <MapPin className="h-4 w-4 mr-2" /> Adresse *
      
          <Popover>
            <PopoverTrigger>
              <AlertCircle className="w-4 h-4 ml-2" />
            </PopoverTrigger>
            <PopoverContent className="dark:bg-[#191919] border-none w-[200px] text-xs p-4">
              Beim automatischen erzeugen der Postleitzahl, kann es vereinzelt zu Fehlern kommen. Bitte prüfe deine PLZ bevor du sie einschickst.
            </PopoverContent>
          </Popover>
        
      </h3>
      <div className="flex mt-4 w-full">
        <div className="  items-center  ">
          <Label className="flex justify-start items-center">
            <PinIcon className="w-4 h-4" /> <p className="ml-2  font-semibold"> Standort </p>
          </Label>
          <div className=" text-gray-800/50 text-xs dark:text-gray-100/80 mt-1  sm:block hidden"> Standort des Fahrzeugs ? </div>
          <div className=" text-gray-800/50 text-xs dark:text-gray-100/80 mt-1  sm:hidden block"> Standort ? </div>
          <Input ref={inputRef} placeholder="Standort.."
            className="p-2.5 2xl:pr-16 xl:pr-4  rounded-md input: text-sm border mt-2  border-black dark:bg-[#151515] input: justify-start dark:focus-visible:ring-0"
            onChange={(e) => { setValue(e.target.value); setCurrentAddress(e.target.value) }}
            defaultValue={thisAddressComponent?.locationString}
            onBlur={getZipCode}
          />
        </div>
        <div className="ml-4">
          <Label className="flex justify-start items-center">
            <PinIcon className="w-4 h-4" /> 
            <p className="ml-2  font-semibold sm:block hidden"> Postleitzahl </p> 
            <p className="ml-2 font-semibold sm:hidden block"> PLZ </p>
          </Label>
          <p className=" text-gray-800/50 text-xs dark:text-gray-100/80 mt-1 sm:block hidden"> 5-Stellige Plz </p>
          <p className="text-gray-800/50 text-xs dark:text-gray-100/80 mt-1 sm:hidden block"> 5-Stellig </p>
          <Input
            className="p-2.5 2xl:pr-16 xl:pr-4 rounded-md text-sm border mt-2 border-black dark:bg-[#151515] 
            justify-start dark:focus-visible:ring-0"
            type="text"
            pattern="[0-9]{5}"
            onChange={(e) => { setCurrentZipCode(e.target.value) }}
            value={currentZipCode}
          />
        </div>
      </div>
      
      <div className="flex mt-2">
      <Checkbox 
      className="sm:h-4 sm:w-4 mr-2"
      onCheckedChange={(e) => {onPrefill(Boolean(e))}}
      />
      <Label className="sm:block hidden">
        Informationen aus Profil verwenden
      </Label>
      <Label className="sm:hidden block">
        aus dem Profil
      </Label>
    </div>
      <Button onClick={() => { onSubmit() }} className="mt-2 dark:bg-[#000000] dark:text-gray-100" //@ts-ignore
        disabled={!inputRef?.current?.value || (thisAddressComponent?.locationString === inputRef?.current?.value && currentZipCode === thisAddressComponent?.postalCode) || !inputRef?.current?.value.length ||
          String(currentZipCode).length !== 5 || isNaN(Number(currentZipCode))
        }
      >
        <span className="">Addresse angeben</span>
      </Button>
    </div>
  );
};
export default SelectLocation;