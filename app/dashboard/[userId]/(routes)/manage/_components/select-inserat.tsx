'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { inserat, vehicle,  } from '../../../../../../db/schema';
import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
;
import React from "react";

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

    const [currentTitle, setCurrentTitle] = React.useState("")

    const onClick = (id: string) => {
        //@ts-ignore
        let [firstPart, secondPart] = [null, null]
        if(id) {
             [firstPart, secondPart] = id?.split("++");
        }
        console.log("First part:", firstPart);
        console.log("Second part:", secondPart);
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                inseratId: firstPart,
                vehicleId: secondPart
            }
        }, { skipEmptyString: true, skipNull: true })
        router.push(url)
    }



    return (
        <>
            <Select
                onValueChange={(selectedValue) => {
                    console.log("selectedValue", selectedValue)
                    onClick(selectedValue);
                }}
                value={
                    currentVehicle ? currentInserat + "++" + currentVehicle : currentInserat
                }
                
            >
                <div className="flex items-center">
                    <Input
                     className="dark:border-none dark:bg-[#141414] rounded-r-none"
                     placeholder="Inserat suchen..."
                     value={currentTitle}
                     onChange={(e) => {setCurrentTitle(e.target.value)}}
                     />
                <div>
                <SelectTrigger className="dark:border-none dark:bg-[#0F0F0F] rounded-l-none"/>
                    
                    
                </div>
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
                                {thisInserat.vehicles.map((vehicle : any) => (
                                    <SelectItem value={thisInserat.id + "++" + vehicle.id} key={vehicle.id} 
                                    className="text-xs ml-8"
                                        onClick={(selectedValue) => {

                                            onClick(thisInserat.id)
                                        }}
                                    >
                                        {vehicle.title}
                                    </SelectItem>
                                ))}
                            </>
                        ))}
                    </SelectContent>
                
            </Select>
        </>
    );
}

export default SelectInserat;