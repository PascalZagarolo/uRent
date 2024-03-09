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
      <div className=" dark:bg-[#13141C] bg-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] p-4 w-full sm:w-[1060px] flex justify-center">
      <Pagination>
      <PaginationContent>
        {Number(currentPage) > 1 && (
          <PaginationItem onClick={() => {changePage(Number(currentPage) - 1)}}>
          <PaginationPrevious/>
        </PaginationItem>
        )}
        
       
        {Array.from({length : expectedPages}, (_, index) => (
          
            <PaginationItem className="bg-[#191B27] rounded-md" onClick={() => {changePage(index + 1)}} key={index}>
            <PaginationLink>{index + 1}</PaginationLink>
          </PaginationItem>
         
        ))}
        {Number(expectedPages) > 5 && (
          <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        )}
        {Number(currentPage) < expectedPages && expectedPages > 1 &&  (
          <PaginationItem onClick={() => {changePage(Number(currentPage) + 1)}}>
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