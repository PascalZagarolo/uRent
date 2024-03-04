'use client'

import qs from "query-string";

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
import { getSearchParamsFunction } from "@/actions/getSearchParams";

const PaginationComponent = () => {


  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const router = useRouter();

  const currentPage = searchParams.getAll("page");

  const params = getSearchParamsFunction("page");

  const changePage = (page : number) => {
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        page: page,
        ...params
      }
    }, { skipEmptyString : true, skipNull : true })

    router.push(url)
  }

    return ( 
    <div className=" dark:bg-[#13141C] p-4 sm:w-[1060px] flex justify-center">
        <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem onClick={() => {changePage(1)}}>
            <PaginationLink>1</PaginationLink>
          </PaginationItem>
          <PaginationItem onClick={() => {changePage(2)}}>
            <PaginationLink>
              2
            </PaginationLink>
          </PaginationItem>
          
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination> 
    </div>
      );
}
 
export default PaginationComponent;