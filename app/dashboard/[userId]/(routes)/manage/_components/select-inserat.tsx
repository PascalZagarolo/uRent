'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { inserat, vehicle, } from '../../../../../../db/schema';
import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
;
import React, { use, useMemo, useRef } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import useOnclickOutside from "react-cool-onclickoutside";


interface SelectInseratProps {
    foundInserate: typeof inserat.$inferSelect[]
}

const SelectInserat: React.FC<SelectInseratProps> = ({
    foundInserate
}) => {

    const pathname = usePathname();
    const router = useRouter();

    const searchParams = useSearchParams();

    const currentInserat = searchParams.get("inseratId")
    const currentVehicle = searchParams.get("vehicleId")

    const inputRef = useRef(null);
    const [isFocused, setIsFocused] = React.useState(false);

    const [renderedInserate, setRenderedInserate] = React.useState(foundInserate)

    const [currentTitle, setCurrentTitle] = React.useState("")

    const onClick = (id: string) => {
        //@ts-ignore
        const findInserat = foundInserate.find((inserat) => inserat.id === id);
        if(findInserat) {
            setCurrentTitle(findInserat.title)
        } else {
            setCurrentTitle("")
        }
        
        
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                inseratId: id,
                
            }
        }, { skipEmptyString: true, skipNull: true })
        router.push(url)
    }

    const debouncedValue = useDebounce(currentTitle, 100);

    useMemo(() => {
        if (debouncedValue) {
            const filteredInserate = foundInserate.filter((inserat) => {
                return inserat.title.toLowerCase().includes(debouncedValue.toLowerCase())
            })
            setRenderedInserate(filteredInserate)
        } else if(!debouncedValue){
            setRenderedInserate([]);
        }
    }, [debouncedValue])

    const onInseratPopoverClick = (id : string) => {
        
        const findInserat = foundInserate.find((inserat) => inserat.id === id);
        setCurrentTitle(findInserat.title)
        const url = qs.stringifyUrl({
            url : pathname,
            query : {
                inseratId : id
            }
        }, { skipEmptyString: true, skipNull: true })

        router.push(url)
        setIsFocused(false)
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
                    onClick(selectedValue);
                }}
                
                value={
                    currentVehicle ? currentInserat + "++" + currentVehicle : currentInserat
                }

            >
                <div className="relative">
                    <div className="flex items-center w-full">
                        <div className="flex-grow">
                            <Input
                                className="dark:border-none dark:bg-[#141414] rounded-r-none text-sm font-normal w-full"
                                placeholder="Inserat suchen..."
                                value={currentTitle}
                                onChange={(e) => setCurrentTitle(e.target.value)}
                                onClick={() => setIsFocused(true)}
                            />
                        </div>
                        <div>
                            <SelectTrigger className="dark:border-none dark:bg-[#0F0F0F] rounded-l-none" />
                        </div>
                    </div>
                    {((renderedInserate.length) > 0  && isFocused) && (
                        <div className="absolute w-full bg-white dark:bg-[#191919] text-sm border dark:border-[#141414] rounded-b"
                        
                        >
                            {renderedInserate.map((pInserat) => (
                                <div key={pInserat.id} 
                                className="px-4 py-3 hover:bg-gray-200 dark:hover:bg-[#2c2c2c] hover:cursor-pointer"
                                onClick={() => onInseratPopoverClick(pInserat.id)}
                                >
                                    {pInserat.title}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <SelectContent className="dark:bg-[#0F0F0F] dark:border-none">

                    <SelectItem value={null}>
                        Beliebig
                    </SelectItem>
                    {foundInserate.map((thisInserat) => (
                        <>
                            <SelectItem value={thisInserat.id} key={thisInserat.id}
                                className="w-[400px]  line-clamp-1 break-all h-[30px]">
                                {thisInserat.title}
                            </SelectItem>
                            
                        </>
                    ))}
                </SelectContent>

            </Select>
            
            
        </div>
    );
}

export default SelectInserat;