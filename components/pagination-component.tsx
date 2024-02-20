'use client';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { usePathname, useRouter, useSearchParams } from "next/navigation";


import qs from "query-string"
import { useEffect } from "react";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationComponentProps {
    amount: number;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
    amount
}) => {

    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    
       const onChange = (page: number) => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                page
            }
        }, { skipEmptyString: true, skipNull: true })

        router.push(url)
       }

       const page = Number(searchParams.get("page")) || 1;
    

    const pages = Math.ceil((amount / 8));
    return (
        <Pagination>
            <PaginationContent>
                {pages > 1 && (
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                )}
                {Array.from({ length: pages }).map((_, index) => (
                    <Button className="bg-gray-100 text-gray-900 border-gray-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] hover:bg-gray-300" 
                    onClick={() => {onChange(index+1)}}
                    key={index}
                    >
                        {index + 1} 
                    </Button>
                ))}

                {pages > 1 && page > 1 && (
                    <PaginationItem>
                        <ArrowRight/>
                    </PaginationItem>
                )}

                {pages > 1 && (
                    <PaginationItem>
                        <ArrowLeft/>
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationComponent;