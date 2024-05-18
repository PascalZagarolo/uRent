'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { inserat, vehicle, } from '../../../../../../db/schema';
import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
;
import React, { use, useMemo } from "react";
import { useDebounce } from "@/hooks/use-debounce";


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

    const [renderedVehicles, setRenderedInserate] = React.useState(selectedInserat?.vehicles || [])

    const [currentTitle, setCurrentTitle] = React.useState("")

    const onVehicleFilter = (id: string) => {
        const url = qs.stringifyUrl({
            url : pathname,
            query : {
                vehicleId : id,
                inseratId : currentInserat
            }
        })

        router.push(url)
    }

    const debouncedValue = useDebounce(currentTitle, 100);

    useMemo(() => {
        if (debouncedValue) {
            const filteredVehicles = selectedInserat?.vehicles.filter((vehicle) => {
                return vehicle.title.toLowerCase().includes(debouncedValue.toLowerCase())
            })
            setRenderedInserate(filteredVehicles)
        } else if(!debouncedValue){
            setRenderedInserate([]);
        }
    }, [debouncedValue])

    const onInseratPopoverClick = (id : string) => {
        setCurrentTitle("")
        const url = qs.stringifyUrl({
            url : pathname,
            query : {
                inseratId : id
            }
        }, { skipEmptyString: true, skipNull: true })

        router.push(url)

    }

    return (
        <>
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
                                placeholder="Inserat suchen..."
                                value={currentTitle}
                                onChange={(e) => setCurrentTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <SelectTrigger className="dark:border-none dark:bg-[#0F0F0F] rounded-l-none" />
                        </div>
                    </div>
                    {renderedVehicles.length > 0 && (
                        <div className="absolute w-full bg-white dark:bg-[#191919] text-sm border dark:border-[#141414] rounded-b">
                            {renderedVehicles.map((pVehicle) => (
                                <div key={pVehicle.id} 
                                className="px-4 py-3 hover:bg-gray-200 dark:hover:bg-[#2c2c2c] hover:cursor-pointer"
                                onClick={() => {
                                    onVehicleFilter(pVehicle.id);
                                    setCurrentTitle("")
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
                    {selectedInserat?.vehicles?.map((vehicle) => (
                        <>
                            <SelectItem value={vehicle.id} key={vehicle.id}
                                className="w-[400px]  line-clamp-1 break-all h-[30px]">
                                {vehicle.title}
                            </SelectItem>
                            
                        </>
                    ))}
                </SelectContent>

            </Select>
        </>
    );
}

export default SelectVehicle;