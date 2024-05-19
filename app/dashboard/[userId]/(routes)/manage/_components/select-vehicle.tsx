'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { inserat, vehicle, } from '../../../../../../db/schema';
import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
;
import React, { use, useMemo } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import useOnclickOutside from "react-cool-onclickoutside";


interface SelectVehicleProps {
    selectedInserat : typeof inserat.$inferSelect
}

const SelectVehicle: React.FC<SelectVehicleProps> = ({
    selectedInserat
}) => {

    const pathname = usePathname();
    const router = useRouter();

    const searchParams = useSearchParams();

    const currentInserat = searchParams.get("inseratId")
    const currentVehicle = searchParams.get("vehicleId")

    const [findVehicle, setFindVehicle] = 
    React.useState(selectedInserat?.vehicles?.find((vehicle : any) => vehicle?.id === currentVehicle) || "");


    const [renderedVehicles, setRenderedInserate] = React.useState(selectedInserat?.vehicles || []);
    const [isFocused, setIsFocused] = React.useState(false);

    const [currentTitle, setCurrentTitle] = React.useState(findVehicle?.title || "")

    const onVehicleFilter = (id: string) => {
        
        const findVehicle = selectedInserat?.vehicles.find((vehicle : any) => vehicle.id === id);
        
        setCurrentTitle(findVehicle.title);
        const url = qs.stringifyUrl({
            url : pathname,
            query : {
                vehicleId : id,
                inseratId : currentInserat
            }
        })

        router.push(url);
        setIsFocused(false);
    }

    const debouncedValue = useDebounce(currentTitle, 100);

    useMemo(() => {
        if (debouncedValue) {
            const filteredVehicles = selectedInserat?.vehicles.filter((vehicle : any) => {
                return vehicle.title.toLowerCase().includes(debouncedValue.toLowerCase())
            })
            setRenderedInserate(filteredVehicles)
        } else if(!debouncedValue){
            setRenderedInserate([]);
        }
    }, [debouncedValue])

    const onInseratPopoverClick = (id : string) => {
        console.log("2")
        const findVehicle = selectedInserat?.vehicles.find((vehicle : any) => vehicle.id === id);
        setCurrentTitle(findVehicle.title);
        const url = qs.stringifyUrl({
            url : pathname,
            query : {
                inseratId : id
            }
        }, { skipEmptyString: true, skipNull: true })

        router.push(url);
        setIsFocused(false);

    }

    const ref = useOnclickOutside(() => {
        // When the user clicks outside of the component, we can dismiss
        // the searched suggestions by calling this method
        setIsFocused(false);
      });

    return (
        <div ref={ref}>
            <Select
                onValueChange={(selectedValue) => {
                    console.log("selectedValue", selectedValue)
                    onVehicleFilter(selectedValue);
                }}
                value={currentVehicle}

            >
                <div className="relative">
                    <div className="flex items-center w-full">
                        <div className="flex-grow">
                            <Input
                                className="dark:border-none dark:bg-[#141414] rounded-r-none text-sm font-normal w-full"
                                placeholder="Fahrzeug suchen..."
                                value={currentTitle}
                                onChange={(e) => setCurrentTitle(e.target.value)}
                                onClick={() => setIsFocused(true)}
                            />
                        </div>
                        <div>
                            <SelectTrigger className="dark:border-none dark:bg-[#0F0F0F] rounded-l-none" />
                        </div>
                    </div>
                    {(renderedVehicles.length > 0 && isFocused) && (
                        <div className="absolute w-full bg-white dark:bg-[#191919] text-sm border dark:border-[#141414] rounded-b">
                            {renderedVehicles.map((pVehicle : any) => (
                                <div key={pVehicle.id} 
                                className="px-4 py-3 hover:bg-gray-200 dark:hover:bg-[#2c2c2c] hover:cursor-pointer"
                                onClick={() => {
                                    onVehicleFilter(pVehicle.id);
                                    
                                }}
                                >
                                    {pVehicle.title}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <SelectContent className="dark:bg-[#0F0F0F] dark:border-none">

                    <SelectItem value={null}>
                        Beliebig
                    </SelectItem>
                    {selectedInserat?.vehicles?.map((vehicle : any) => (
                        <>
                            <SelectItem value={vehicle.id} key={vehicle.id}
                                className="w-[400px]  line-clamp-1 break-all h-[30px]">
                                {vehicle.title}
                            </SelectItem>
                            
                        </>
                    ))}
                </SelectContent>

            </Select>
        </div>
    );
}

export default SelectVehicle;