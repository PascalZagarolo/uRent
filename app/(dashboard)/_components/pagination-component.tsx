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
import { ArrowRight } from "lucide-react";
import { BsArrowRightSquareFill } from "react-icons/bs";

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

  let renderedPages : number[] = [];

  const itemsPerPage = useResultsPerPage((state) => state.results);
  const globalResults = useGetFilterAmount((state) => state.amount);

  const expectedPages = (Math.ceil(globalResults / itemsPerPage)) ? Math.ceil(globalResults / itemsPerPage) : 1;
  
  if (expectedPages > 5 && Number(currentPage) >= 3) {
    const pageIndex = Number(currentPage);

    const startingIndex = pageIndex - 2;
    const endingIndex = pageIndex + 2;

    for(let i = startingIndex; i < endingIndex + 1; i++) {
      if (i > 0 && i < Number(expectedPages) + 1) {
        renderedPages.push(i);
      }
    }
  } else if(expectedPages > 5 && Number(currentPage) < 3) {
    for(let i = 1; i < 6; i++) {
      renderedPages.push(i);
    }
    
  } else {
    
      for(let i = 1; i < expectedPages + 1; i++) {
        renderedPages.push(i);
      }
   
  }

    return ( 
    <>
    {expectedPages > 1 && (
      <div className=" dark:bg-[#13141C] 
       bg-white  py-4 mt-2 sm:mt-0 sm:p-4 w-full sm:w-[1060px] flex justify-center">
      <Pagination>
      <PaginationContent>
        {Number(currentPage) > 1 && (
          <PaginationItem onClick={() => {changePage(Number(currentPage) - 1)}} className="">
          <PaginationPrevious/>
        </PaginationItem>
        )}
        
       
        {renderedPages.map((page) => (
          
            <PaginationItem className={cn(`bg-[##14151E]
            text-gray-200 rounded-md hover:cursor-pointer`, 
            Number(currentPage) == page && "bg-[#252838] border-b border-[#252838] text-gray-300")} 
            onClick={() => {changePage(page)}} key={page}>
            <PaginationLink className="hover:bg-[#242738] hover:text-gray-300">{page}</PaginationLink>
          </PaginationItem>
         
        ))}
        
        {Number(currentPage) < expectedPages && expectedPages > 1 &&  (
          <PaginationItem onClick={() => {changePage(Number(currentPage) + 1)}} className="hover:cursor-pointer">
          <PaginationNext/>
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