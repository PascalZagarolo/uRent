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



interface SelectLocationCreationProps {
    thisInserat: typeof inserat.$inferSelect;
    thisAddressComponent?: typeof address.$inferSelect;
    usedContactOptions: typeof contactOptions.$inferSelect;
    currentAddress: string;
    setCurrentAddress: (value) => void;
    currentZipCode: string;
    setCurrentZipCode: (value) => void;
}

const SelectLocationCreation: React.FC<SelectLocationCreationProps> = ({
    thisInserat,
    thisAddressComponent,
    usedContactOptions,
    currentAddress,
    setCurrentAddress,
    currentZipCode,
    setCurrentZipCode
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



   
    


    const searchParams = useSearchParams();


    const [inputAddress, setInputAddress] = useState("");
    const [inputPostalCode, setInputPostalCode] = useState("");




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
                setInputAddress(city || "");
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
                setInputPostalCode(zipCode);
                setCurrentZipCode(zipCode);
                
            }
        });
    }, [pOptions]);






   



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
            <div className="flex mt-4 w-full flex-row items-center space-x-8">
                <div className="  items-center w-1/2 ">
                    <Label className="flex justify-start items-center">
                        <PinIcon className="w-4 h-4" /> <p className="ml-2  font-semibold"> Standort (Stadt)*</p>
                    </Label>
                    <div className=" text-gray-800/50 text-xs dark:text-gray-100/80 mt-1  sm:block hidden"> Standort des Fahrzeugs ? </div>
                    <div className=" text-gray-800/50 text-xs dark:text-gray-100/80 mt-1  sm:hidden block"> Standort ? </div>
                    <Input ref={inputRef} placeholder="Standort.."
                        className="p-2.5 2xl:pr-16 xl:pr-4  rounded-md input: text-sm border mt-2  border-black dark:bg-[#151515] input: justify-start dark:focus-visible:ring-0"
                        value={inputAddress}
                        maxLength={60}
                        onChange={(e) => setInputAddress(e.target.value)}
                    />
                </div>
                <div className=" w-1/2">
                    <Label className="flex justify-start items-center">
                        <PinIcon className="w-4 h-4" />
                        <p className="ml-2  font-semibold sm:block hidden"> Postleitzahl* </p>
                        <p className="ml-2 font-semibold sm:hidden block"> PLZ </p>
                    </Label>
                    <p className=" text-gray-800/50 text-xs dark:text-gray-100/80 mt-1 sm:block hidden"> 5-Stellige Plz </p>
                    <p className="text-gray-800/50 text-xs dark:text-gray-100/80 mt-1 sm:hidden block"> 5-Stellig </p>
                    <Input
                        ref={postalRef}
                        value={inputPostalCode}
                        onChange={(e) => setInputPostalCode(e.target.value)}
                        className="p-2.5 2xl:pr-16 xl:pr-4 rounded-md text-sm border mt-2 border-black dark:bg-[#151515]
            justify-start dark:focus-visible:ring-0"
                        type="text"
                        pattern="[0-9]{5}"
                        maxLength={5}
                       
                    />
                </div>
            </div>

            <div className="w-full flex flex-col  mt-4">
                <div className="flex flex-row items-center space-x-4">
                    <div className="text-base text-gray-200 font-semibold w-1/2">
                        Angegebene Addresse
                    </div>
                    <div className="text-base text-gray-200 font-semibold w-1/2">
                        Angegebene Postleitzahl
                    </div>
                </div>
                <div className="flex flex-row items-center w-full space-x-4">
                    <div className="w-1/2 mt-2">
                        {currentAddress ? (
                            <div className="flex flex-row items-center space-x-2">
                                <CheckIcon className="w-4 h-4 mr-2 text-emerald-600" /> <span className="text-sm"> {currentAddress} </span>
                            </div>
                        ) : (
                            <div className="flex flex-row items-center space-x-2">
                                <XCircle className="w-4 h-4 text-red-500" /> <span className="text-sm"> Noch keine Adresse angegeben </span>
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
                                <XCircle className="w-4 h-4 text-red-500" /> <span className="text-sm"> Noch keine Postleitzahl angegeben </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};
export default SelectLocationCreation;