'use client'

import qs from "query-string"
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { Search } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { useEffect, useState } from "react";
import path from "path";
import FilterDialog from "./filter-dialog";

const SearchItem = () => {

    const [value, setValue] = useState("");

    const debouncedValue = useDebounce(value);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                title: debouncedValue
            }
        }, { skipEmptyString: true, skipNull: true })

        router.push(url)
    }, [debouncedValue, router, pathname])

    return (
        <div className="flex items-center justify-start position: static sm:mr-4 md:mr-4 2xl:mr-4 ">

            <FilterDialog/>
            

            <Input
                className="2xl:w-[240px] dark:border-none dark:focus:bring-0 dark:focus-visible:ring-0"
                placeholder="Ich suche nach..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <div className="px-2 py-2  rounded-md border-2 border-black  bg-[#191d2e] hover: cursor-pointer hidden xl:flex" >
            <Search
                className=" text-white h-6 w-6"
            />
            </div>
        </div>
    );
}

export default SearchItem;