'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string"
import type { Category } from "@prisma/client";

const OrderBy = () => {

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentTitle = searchParams.get("title");
    const category = searchParams.get("category");
    const startPrice = searchParams.get("start");
    const endPrice = searchParams.get("end");

    const router = useRouter();


    const onClick = (filter : string) => {
        const url = qs.stringifyUrl({
            url : pathname,
            query : {
                title : currentTitle,
                category : category,
                end : endPrice,
                start : startPrice,
                filter : filter
            }
        }, { skipEmptyString : true , skipNull : true })
        router.push(url)
    }

    return (
        <Select onValueChange={(e) => {onClick(e)}}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sortieren nach" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="desc">Preis absteigend</SelectItem>
                <SelectItem value="asc">Preis aufsteigend</SelectItem>
                <SelectItem value="relevance">Relevanz</SelectItem>
            </SelectContent>
        </Select>

    );
}

export default OrderBy;