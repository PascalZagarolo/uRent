'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { inserat, vehicle } from '../../../../../../db/schema';
import qs from "query-string";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";

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

    const onClick = (id: string) => {
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

                <SelectTrigger className="dark:border-none dark:bg-[#0F0F0F]" >
                    <SelectValue>

                    </SelectValue>
                    <SelectContent className="dark:bg-[#0F0F0F] dark:border-none">
                        <SelectItem value={null}>
                            Beliebig
                        </SelectItem>
                        {foundInserate.map((thisInserat) => (
                            <>
                                <SelectItem value={thisInserat.id} key={thisInserat.id}>
                                    {thisInserat.title}
                                </SelectItem>
                                {thisInserat.vehicles.map((vehicle) => (
                                    <SelectItem value={thisInserat.id + "++" + vehicle.id} key={vehicle.id} className="text-xs ml-8"
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
                </SelectTrigger>
            </Select>


        </>
    );
}

export default SelectInserat;