'use client'

import qs from "query-string"
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { Search } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { useEffect, useState } from "react";
import path from "path";

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
        <div className="flex items-center justify-start position: static ">

            <div className="px-2 py-2 mt-2 rounded-md border border-black mr-4 bg-[#262b45] hover: cursor-pointer" >
            <Search
                className=" text-white h-6 w-6"
            />
            </div>
            

            <Input
                className="mt-2"
                placeholder="Ich suche nach..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />

        </div>
    );
}

export default SearchItem;