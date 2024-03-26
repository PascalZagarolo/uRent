'use client'

import qs from "query-string"
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { Search } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { useEffect, useState } from "react";
import { getSearchParamsFunction } from "@/actions/getSearchParams";


const SearchItem = () => {

    

    

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentLocation = searchParams.get("location");
    const currentTitle = searchParams.get("title")

    const [value, setValue] = useState(currentTitle || "");

    const params = getSearchParamsFunction("title");
    

    const debouncedValue = useDebounce(value);

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                title: debouncedValue,
                ...params
            }
        }, { skipEmptyString: true, skipNull: true })

        router.push(url)
    }, [debouncedValue, router, pathname, currentLocation])

    const onSearch = () => {
        const url = qs.stringifyUrl({
            url: "/",
            query: {
                title: debouncedValue,
                location : currentLocation,
            }
        }, { skipEmptyString: true, skipNull: true })

        router.push(url)
    }

    return (
        <div className="flex w-full items-center justify-start sm:position: static sm:mr-4 md:mr-4 2xl:mr-4 ">

            
            

            <Input
                className="2xl:w-[240px] w-full border-none dark:focus:bring-0 dark:focus-visible:ring-0 focus:border-none bg-[#1B1F2C]"
                placeholder="Ich suche nach..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <div className="px-2 py-2  rounded-md ml-1  bg-slate-800 dark:hover:bg-slate-700 hover: cursor-pointer lg:hidden xl:flex" onClick={onSearch}>
            <Search
                className=" text-white h-6 w-6"
            />
            </div>
        </div>
    );
}

export default SearchItem;