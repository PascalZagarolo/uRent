'use client'

import { useDebounce } from "@/hooks/use-debounce";
import { MapIcon, PinIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import qs from 'query-string';
import { Input } from "@/components/ui/input";
import { set } from "lodash";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Address, Inserat } from "@prisma/client";
import axios from "axios";


interface SelectLocationProps {
  inserat : Inserat;
  addressComponent? : Address;
}

const SelectLocation: React.FC<SelectLocationProps> = ({
  inserat,
  addressComponent
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

  const [currentAddress, setCurrentAddress] = useState("");

  useEffect(() => {
    //@ts-ignore
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );

  }, [currentLocation]);


  useEffect(() => {
    //@ts-ignore
  }, [inputRef?.current?.value])

  const onSubmit = () => {
    try {

      const values = {
        //@ts-ignore
        locationString : inputRef?.current?.value || null,
      }

      console.log(values);

      axios.patch(`/api/inserat/${inserat.id}/address`, values);
    } catch {
      toast.error("Etwas ist schief gelaufen");
    }
  }



  return (
    <div className=" items-center ">
      <div className="  items-center   flex-shrink">
        <Label className="flex justify-start items-center">
          <PinIcon  className="w-4 h-4"/> <p className="ml-2  font-semibold"> Standort </p>
        </Label>
        <p className="font-semibold text-gray-800/50 text-xs dark:text-gray-100/80"> Wo ist deine Anzeige lokalisiert ? </p>
        <Input ref={inputRef} placeholder="Standort.."
          className="p-2.5 2xl:pr-16 xl:pr-4  rounded-md input: text-sm border mt-2  border-black dark:bg-[#151515] input: justify-start dark:focus-visible:ring-0"
          onChange={(e) => { setValue(e.target.value); setCurrentAddress(e.target.value) }} 
          defaultValue={addressComponent?.locationString}
          />
        
      </div>


      {/* @ts-ignore */}
      <Button onClick={() => {onSubmit()}} className="mt-2 dark:bg-[#000000] dark:text-gray-100" disabled={!inputRef?.current?.value || addressComponent?.locationString === inputRef?.current?.value}>
        <span className="">Standort wählen</span>
      </Button>

    </div>
  );
};
export default SelectLocation;