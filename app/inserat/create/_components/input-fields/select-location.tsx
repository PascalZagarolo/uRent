'use client'

import { useDebounce } from "@/hooks/use-debounce";
import { AlertCircle, CheckIcon, MapPin, PinIcon, XCircle } from "lucide-react";
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
import { businessAddress, business } from '../../../../../db/schema';


interface SelectLocationProps {
  thisInserat: typeof inserat.$inferSelect | any;
  thisAddressComponent?: typeof address.$inferSelect;
  usedContactOptions: typeof contactOptions.$inferSelect;
}

const SelectLocation: React.FC<SelectLocationProps> = ({
  thisInserat,
  thisAddressComponent,
  usedContactOptions
}) => {



  
  const inputRef = useRef();
  const postalRef = useRef();

  const options = {
    componentRestrictions: { country: "de" },
    fields: ["address_components", "geometry", "icon", "name"],
    types: ['(cities)']
  };

  const pOptions = {
    types: ['postal_code'],
    fields: ['address_components'],
    componentRestrictions: { country: "de" },
}


  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const searchParams = useSearchParams();
  
  
  const [address, setAddress] = useState(thisAddressComponent?.locationString || "");
  const [currentAddress, setCurrentAddress] = useState(thisAddressComponent?.locationString || "");
  const [zipCode, setZipCode] = useState(thisAddressComponent?.postalCode || "");
  const [currentZipCode, setCurrentZipCode] = useState(thisAddressComponent?.postalCode || null);


  useEffect(() => {
    if (!window.google) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current!,
        options
    );

    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place && place.address_components) {
            // Handle address change here
            const city = place.address_components.find(comp => comp.types.includes("locality"))?.long_name;
            setAddress(city || "");
            setCurrentAddress(city || "");

        }
    });
}, [options]);


useEffect(() => {
    if (!window.google) return;

    const postalAutocomplete = new window.google.maps.places.Autocomplete(
        postalRef.current!,
        pOptions
    );

    postalAutocomplete.addListener('place_changed', () => {
        const place = postalAutocomplete.getPlace();
        
        const zipCode = place.address_components?.find(comp => comp.types.includes("postal_code"))?.long_name;

        if (zipCode) {
            setZipCode(zipCode);
            setCurrentZipCode(zipCode);
            
        }
    });
}, [pOptions]);

  const onSubmit = async () => {
    try {
      const values = {
        locationString: currentAddress ?? null,
        postalCode: currentZipCode ?? null,
      }

      axios.patch(`/api/inserat/${thisInserat.id}/address`, values).
        then(() => {
          toast.success("Standort erfolgreich hinzugefügt");
          router.refresh();
        })
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
            <PinIcon className="w-4 h-4" /> <p className="ml-2  font-semibold"> Standort (Stadt) </p>
          </Label>
          <div className=" text-gray-800/50 text-xs dark:text-gray-100/80 mt-1  sm:block hidden"> Standort des Fahrzeugs ? </div>
          <div className=" text-gray-800/50 text-xs dark:text-gray-100/80 mt-1  sm:hidden block"> Standort ? </div>
          <Input ref={inputRef} placeholder="Standort.."
            className="p-2.5 2xl:pr-16 xl:pr-4  rounded-md input: text-sm border mt-2  border-black dark:bg-[#151515] input: justify-start dark:focus-visible:ring-0"
            onChange={(e) => { setAddress(e.target.value) }}
            value={address}
            maxLength={60}
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
          ref={postalRef}
            className="p-2.5 2xl:pr-16 xl:pr-4 rounded-md text-sm border mt-2 border-black dark:bg-[#151515] 
            justify-start dark:focus-visible:ring-0"
            type="text"
            pattern="[0-9]{5}"
            maxLength={20}
            onChange={(e) => { setZipCode(e.target.value) }}
            value={zipCode}
          />
        </div>
      </div>

      {/* <div className="flex mt-2">
        <Checkbox
          className="sm:h-4 sm:w-4 mr-2"
          onCheckedChange={(e) => { onPrefill(Boolean(e)) }}
          disabled={((thisInserat?.user.isBusiness &&
            thisInserat?.user?.business?.businessAddresses[0]?.street &&
            thisInserat?.user?.business?.businessAddresses[0]?.postalCode &&
            thisInserat?.user?.business?.businessAddresses[0]?.city
          ) || (thisAddressComponent?.postalCode
            && thisAddressComponent?.locationString &&
            !thisInserat?.user.isBusiness)) ? false : true}
        />
        <Label className="sm:block hidden">
          Informationen aus Profil verwenden
        </Label>
        <Label className="sm:hidden block">
          aus dem Profil
        </Label>
      </div> */}
      <div className="flex flex-row items-center w-full space-x-4">
        <div className="w-1/2 mt-2">
          {currentAddress ? (
            <div className="flex flex-row items-center space-x-2">
              <CheckIcon className="w-4 h-4 mr-2 text-emerald-600" /> <span className="text-sm"> {currentAddress} </span>
            </div>
          ) : (
            <div className="flex flex-row items-center space-x-2">
              <XCircle className="w-4 h-4 text-red-500" /> <span className="text-sm">  keine Adresse angegeben </span>
            </div>
          )}
        </div>
        <div className="w-1/2">
          {currentZipCode ? (
            <div className="flex flex-row items-center space-x-2">
              <CheckIcon className="w-4 h-4 mr-2 text-emerald-600" /> <span className="text-sm"> {currentZipCode} </span>
            </div>
          ) : (
            <div className="flex flex-row items-center space-x-2">
              <XCircle className="w-4 h-4 text-red-500" /> <span className="text-sm">  keine Postleitzahl angegeben </span>
            </div>
          )}
        </div>
      </div>
      <Button onClick={() => { onSubmit() }} className="mt-2 dark:bg-[#000000] dark:hover:bg-[#0b0b0b] dark:text-gray-100" //@ts-ignore
        disabled={!inputRef?.current?.value ||
          //@ts-ignore
          (thisAddressComponent?.locationString == currentAddress && currentZipCode == thisAddressComponent?.postalCode) || 
          String(currentZipCode).length !== 5 ||
          isLoading
        }
      >
        <span className="">Addresse angeben</span>
      </Button>
    </div>
  );
};
export default SelectLocation;