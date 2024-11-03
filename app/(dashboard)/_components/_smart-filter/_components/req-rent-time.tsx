import { getSearchParamsFunction } from "@/actions/getSearchParams";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { minTimeValues } from "@/hooks/min-time/useMinTime";
import { useSavedSearchParams } from "@/store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ReqRentTime = () => {
    const params = getSearchParamsFunction("minTime");
    const minTime = useSearchParams().get("minTime");

    const [currentAge, setCurrentAge] = useState(minTime);
    const [isLoading, setIsLoading] = useState(false);



    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (minTime) {
            changeSearchParams("reqAge", minTime);
            setCurrentAge(minTime);
        }
    }, [])


    const currentObject = useSavedSearchParams((state) => state.searchParams)

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const setStart = (reqAge: string) => {

        if (!reqAge) {
            deleteSearchParams("reqAge");
            setCurrentAge(null);
        } else {
            //@ts-ignore
            changeSearchParams("reqAge", reqAge);
            setCurrentAge(reqAge);
        }

    }

    const renderCorresponding = (value: number) => {
        switch (value) {
            case 1: return (
                <SelectLabel className="pl-4 font-semibold mb-4">
                    Stunden
                </SelectLabel>
            );
            case 24: return (
                <SelectLabel className="pl-4 font-semibold mb-4 mt-4">
                    Tag(e)
                </SelectLabel>
            );
            case 168: return (
                <SelectLabel className="pl-4 font-semibold mb-4 mt-4 ">
                    Woche(n)
                </SelectLabel>
            );
            case 720: return (
                <SelectLabel className="pl-4 font-semibold mb-4  mt-4">
                    Monat(e)
                </SelectLabel>
            );
            case 8760: return (
                <SelectLabel className="pl-4 font-semibold mb-4  mt-4">
                    Jahr(e)
                </SelectLabel>
            )
        }
    }





    function removeUnderscore(inputString: string): string {
        const outputString = inputString.replace(/_/g, ' ');
        return outputString;
    }

    return (
        <div className="w-full">
            <div className="w-full">
                <Label className="flex justify-start items-center ">
                    <p className=" font-semibold text-gray-200 flex"> Maximale Mindest Mietdauer </p>
                </Label>

                <Select
                    onValueChange={(brand) => {
                        setStart(brand)
                    }}
                    value={currentAge}
                    disabled={isLoading}
                >

                    <SelectTrigger className="dark:bg-[#0F0F0F] dark:border-gray-200 dark:border-none   focus-visible:ring-0 mt-2 rounded-md "
                        disabled={isLoading}

                    >
                        <SelectValue
                            placeholder="Wie viele Sitze?"
                            className="flex justify-center"

                        />
                    </SelectTrigger>

                    <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full flex justify-center" >
                        <SelectGroup>
                            <SelectItem key="beliebig" value={null} className="font-semibold mb-4">
                                Beliebig
                            </SelectItem>
                            {minTimeValues.map((item) => (
                                <>
                                    {renderCorresponding(item.value)}
                                    <SelectItem key={item.value} value={String(item.value)} className="px-16">
                                        {item.label}
                                    </SelectItem>
                                </>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default ReqRentTime;