'use client'

import { useDebounce } from "@/hooks/use-debounce";
import { MapIcon, MapPin, PinIcon } from "lucide-react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";


interface SelectLocationProps {
  inserat: Inserat;
  addressComponent?: Address;
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
  const [currentZipCode, setCurrentZipCode] = useState<null | number>(addressComponent?.postalCode || null);

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
        locationString: inputRef?.current?.value || null,
        postalCode: currentZipCode
      }

      console.log(values);

      axios.patch(`/api/inserat/${inserat.id}/address`, values);
      setTimeout(() => {
        toast.success("Standort erfolgreich hinzugefügt");
        router.refresh();
      }, 500)
    } catch {
      toast.error("Etwas ist schief gelaufen");
    }
  }



  return (
    <div className=" items-center w-full">
       <h3 className="text-md font-semibold items-center flex">
          <MapPin className="h-4 w-4 mr-2"/> Addresse
        </h3>
      <div className="flex mt-4 w-full">
       
        <div className="  items-center  ">
          <Label className="flex justify-start items-center">
            <PinIcon className="w-4 h-4" /> <p className="ml-2  font-semibold"> Standort </p>
          </Label>
          <p className=" text-gray-800/50 text-xs dark:text-gray-100/80 mt-1"> Wo ist deine Anzeige lokalisiert ? </p>
          <Input ref={inputRef} placeholder="Standort.."
            className="p-2.5 2xl:pr-16 xl:pr-4  rounded-md input: text-sm border mt-2  border-black dark:bg-[#151515] input: justify-start dark:focus-visible:ring-0"
            onChange={(e) => { setValue(e.target.value); setCurrentAddress(e.target.value) }}
            defaultValue={addressComponent?.locationString}
          />

        </div>
        <div className="ml-4">
          <Label className="flex justify-start items-center">
            <PinIcon className="w-4 h-4" /> <p className="ml-2  font-semibold"> Postleitzahl </p>
          </Label>
          <p className=" text-gray-800/50 text-xs dark:text-gray-100/80 mt-1"> 5-Stellige Plz </p>
          <Input
            className="p-2.5 2xl:pr-16 xl:pr-4 rounded-md text-sm border mt-2 border-black dark:bg-[#151515] justify-start dark:focus-visible:ring-0"
            type="text"
            pattern="[0-9]{5}"
            onChange={(e) => { setCurrentZipCode(Number(e.target.value)) }}
            value={currentZipCode}

          />
        </div>
      </div>

      <RadioGroup className="mt-2">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-two" id="option-two" className="h-2 w-2" />
          <Label htmlFor="option-two" className="text-sm"><p className="text-sm"> Informationen aus meinem Profil verwenden </p></Label>
        </div>
      </RadioGroup>


      <Button onClick={() => { onSubmit() }} className="mt-2 dark:bg-[#000000] dark:text-gray-100" //@ts-ignore
        disabled={!inputRef?.current?.value || (addressComponent?.locationString === inputRef?.current?.value && currentZipCode === addressComponent?.postalCode) || !inputRef?.current?.value.length ||
          String(currentZipCode).length !== 5
        }
      >
        <span className="">Addresse wählen</span>
      </Button>

    </div>
  );
};
export default SelectLocation;