'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { inserat, vehicle, } from '../../../../../../db/schema';
import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
;
import React, { use, useEffect, useMemo, useRef } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import useOnclickOutside from "react-cool-onclickoutside";
import { Separator } from "@/components/ui/separator";


interface SelectInseratProps {
    foundInserate: typeof inserat.$inferSelect[];
    selectChange: (selectedId) => void;
}

const SelectInserat: React.FC<SelectInseratProps> = ({
    foundInserate,
    selectChange
}) => {
    

    const pathname = usePathname();
    const router = useRouter();

    const searchParams = useSearchParams();

    const currentInserat = searchParams.get("inseratId")
    const currentVehicle = searchParams.get("vehicleId")

    const inputRef = useRef(null);
    const [isFocused, setIsFocused] = React.useState(false);

    const alphabeticOrder = (published) => {

        const filteredArray = foundInserate.filter((thisInserat) => {
            return thisInserat?.multi == true
        })
            .filter((thisInserat) => { 
                if(published) {
                    return thisInserat.isPublished === true
                } else {
                    return thisInserat.isPublished === false
                }
             })
            .sort((a, b) => a.title.localeCompare(b.title, 'de', { sensitivity: 'base' }))





        return filteredArray;
    };



    const [foundInseratePublic, setFoundInseratePublic] = React.useState<any[]>(alphabeticOrder(true));
    const [foundInseratePrivate, setFoundInseratePrivate] = React.useState<any[]>(alphabeticOrder(false));
    const [renderedInserate, setRenderedInserate] = React.useState(foundInserate.filter((pInserat) => pInserat?.multi == true));



    const [currentTitle, setCurrentTitle] = React.useState("")

    /*
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
    */

    const debouncedValue = useDebounce(currentTitle, 100);

    useMemo(() => {
        if (debouncedValue) {
            const filteredInserate = foundInserate.filter((inserat) => {
                return inserat.title.toLowerCase().includes(debouncedValue.toLowerCase())
            })
            setRenderedInserate(filteredInserate)
        } else if (!debouncedValue) {
            setRenderedInserate([]);
        }
    }, [debouncedValue])

    const onInseratPopoverClick = (id: string) => {

        const findInserat = foundInserate.find((inserat) => inserat.id === id);
        setCurrentTitle(findInserat.title)
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                inseratId: id
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
                    selectChange(selectedValue)
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
                    {((renderedInserate.length) > 0 && isFocused) && (
                        <div className="absolute w-full bg-white dark:bg-[#191919] text-sm border dark:border-[#141414] rounded-b"

                        >
                            {renderedInserate.slice(0, 6).map((pInserat) => (
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
                <SelectContent className="dark:bg-[#0F0F0F] dark:border-none p-4 rounded-md shadow-lg">
                {foundInserate.length > 0 && (
            <SelectItem value={null} className="text-gray-100 font-semibold hover:bg-gray-700  rounded-md">
            Alle Inserate
            </SelectItem>
    )}

    {foundInserate.length > 0 ? (
        <>
            {foundInseratePublic.length > 0 && (
                <SelectGroup className="mt-4">
                    <SelectLabel className="text-gray-400 text-sm mb-2">
                        Öffentliche Inserate
                    </SelectLabel>
                    <Separator className="mb-4 border-gray-600" />
                    {foundInseratePublic.map((thisInserat) => (
                        <SelectItem value={thisInserat.id} key={thisInserat.id}
                            className="w-[400px] line-clamp-1 break-all h-[30px] text-gray-200 hover:bg-gray-700 p-2 rounded-md">
                            {thisInserat.title}
                        </SelectItem>
                    ))}
                </SelectGroup>
            )}

            {foundInseratePrivate.length > 0 && (
                <SelectGroup className="mt-6">
                    <SelectLabel className="text-gray-400 text-sm mb-2">
                        Private Inserate
                    </SelectLabel>
                    <Separator className="mb-4 border-gray-600" />
                    {foundInseratePrivate.map((thisInserat) => (
                        <SelectItem value={thisInserat.id} key={thisInserat.id}
                            className="w-[400px] line-clamp-1 break-all h-[30px] text-gray-200 hover:bg-gray-700 p-2 rounded-md">
                            {thisInserat.title}
                        </SelectItem>
                    ))}
                </SelectGroup>
            )}
        </>
    ) : (
        <div className="text-sm flex justify-center items-center text-gray-400/60 w-[400px] line-clamp-1 break-all h-[60px]">
            Noch keine Inserate erstellt
        </div>
    )}
</SelectContent>


            </Select>


        </div>
    );
}

export default SelectInserat;