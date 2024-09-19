'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string"

import { getSearchParamsFunction } from "@/actions/getSearchParams";

const OrderBy = () => {

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentTitle = searchParams.get("title");
    const category = searchParams.get("category");
    const startPrice = searchParams.get("start");
    const endPrice = searchParams.get("end");

    const router = useRouter();

    const params = getSearchParamsFunction("filter");
    const onClick = (filter : string) => {
        const url = qs.stringifyUrl({
            url : pathname,
            query : {
                filter : filter,
                ...params,
            }
        }, { skipEmptyString : true , skipNull : true })
        router.push(url)
    }

    return (
        <Select onValueChange={(e) => {onClick(e)}} >
            <SelectTrigger className="w-[180px] dark:text-gray-100 dark:focus:ring-0 dark:bg-[#191B27] dark:border-none dark:border-gray-900" >
                <SelectValue placeholder="Sortieren nach" className="dark:text-gray-100" />
            </SelectTrigger>
            <SelectContent className="dark:bg-[#191B27] dark:border-gray-900 border-none">
            <SelectItem value="relevance">Relevanz</SelectItem>
                <SelectItem value="desc">Preis absteigend</SelectItem>
                <SelectItem value="asc">Preis aufsteigend</SelectItem>
                <SelectItem value="date_newest">Neueste zuerst</SelectItem>
                <SelectItem value="date_oldest">Älteste zuerst</SelectItem>

                
            </SelectContent>
        </Select>

    );
}

export default OrderBy;