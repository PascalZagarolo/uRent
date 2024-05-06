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
import { useGetFilterAmount, useResultsPerPage } from "@/store";
import { cn } from "@/lib/utils";

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

  const itemsPerPage = useResultsPerPage((state) => state.results);
  const globalResults = useGetFilterAmount((state) => state.amount);

  const expectedPages = (Math.ceil(globalResults / itemsPerPage)) ? Math.ceil(globalResults / itemsPerPage) : 1;
  

    return ( 
    <>
    {expectedPages > 1 && (
      <div className=" dark:bg-[#13141C] 
       bg-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] py-4 mt-2 sm:mt-0 sm:p-4 w-full sm:w-[1060px] flex justify-center">
      <Pagination>
      <PaginationContent>
        {Number(currentPage) > 1 && (
          <PaginationItem onClick={() => {changePage(Number(currentPage) - 1)}} className="">
          <PaginationPrevious/>
        </PaginationItem>
        )}
        
       
        {Array.from({length : expectedPages}, (_, index) => (
          
            <PaginationItem className={cn(`bg-[#191B27] hover:bg-[#242738]
            text-gray-200 rounded-md hover:cursor-pointer`, Number(currentPage) == index + 1 && "bg-[#252838]")} onClick={() => {changePage(index + 1)}} key={index}>
            <PaginationLink className="hover:bg-[#242738] hover:text-gray-300">{index + 1}</PaginationLink>
          </PaginationItem>
         
        ))}
        {Number(expectedPages) > 5 && (
          <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        )}
        {Number(currentPage) < expectedPages && expectedPages > 1 &&  (
          <PaginationItem onClick={() => {changePage(Number(currentPage) + 1)}} className="hover:cursor-pointer">
          <PaginationNext />
        </PaginationItem>
        )}
      </PaginationContent>
    </Pagination> 

    
  </div>
    )}
    </>
      );
}
 
export default PaginationComponent;