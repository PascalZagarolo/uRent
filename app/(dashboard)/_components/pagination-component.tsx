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
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "@/components/motion";

const PaginationComponent = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page") || "1");
  const params = getSearchParamsFunction("page");

  const changePage = (page: number) => {
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        page: page,
        ...params
      }
    }, { skipEmptyString: true, skipNull: true })

    router.push(url)
  }

  const itemsPerPage = useResultsPerPage((state) => state.results);
  const globalResults = useGetFilterAmount((state) => state.amount);

  const expectedPages = Math.max(Math.ceil(globalResults / itemsPerPage), 1);
  
  let renderedPages: (number | string)[] = [];

  // Calculate which page numbers to show
  if (expectedPages <= 5) {
    // Show all pages if 5 or fewer
    for (let i = 1; i <= expectedPages; i++) {
      renderedPages.push(i);
    }
  } else {
    // Always include first and last page
    renderedPages.push(1);
    
    // Middle pages
    if (currentPage <= 3) {
      // Near the start
      renderedPages.push(2, 3, 4);
    } else if (currentPage >= expectedPages - 2) {
      // Near the end
      renderedPages.push(expectedPages - 3, expectedPages - 2, expectedPages - 1);
    } else {
      // Middle
      renderedPages.push(currentPage - 1, currentPage, currentPage + 1);
    }
    
    // Add last page if not already included
    if (!renderedPages.includes(expectedPages)) {
      renderedPages.push(expectedPages);
    }
    
    // Sort and deduplicate
    renderedPages = [...new Set(renderedPages)].sort((a, b) => Number(a) - Number(b));
    
    // Add ellipses indicators
    const finalRenderedPages: (number | string)[] = [];
    renderedPages.forEach((page, index) => {
      if (index > 0 && Number(page) - Number(renderedPages[index - 1]) > 1) {
        finalRenderedPages.push("...");
      }
      finalRenderedPages.push(page);
    });
    
    renderedPages = finalRenderedPages;
  }

  if (expectedPages <= 1) {
    return null;  // Don't show pagination if there's only one page
  }

  return (
    <div className="dark:bg-[#13141C] bg-white py-4 mt-2 sm:mt-0 sm:p-4 w-full sm:w-[1060px] flex justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-1 md:gap-2 bg-[#1a1d28]/80 backdrop-blur-sm rounded-full py-2 px-2 border border-indigo-500/10 shadow-lg"
      >
        {/* Previous Button */}
        {currentPage > 1 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => changePage(currentPage - 1)}
            className="flex items-center justify-center h-9 w-9 rounded-full bg-[#252838] text-gray-300 hover:bg-indigo-600 hover:text-white transition-all duration-200"
            aria-label="Previous page"
          >
            <ChevronLeft size={18} />
          </motion.button>
        )}

        {/* Page Numbers */}
        {renderedPages.map((page, index) => {
          if (page === "...") {
            return (
              <span key={`ellipsis-${index}`} className="text-gray-400 px-2">
                ...
              </span>
            );
          }

          const pageNumber = Number(page);
          return (
            <motion.button
              key={`page-${page}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => changePage(pageNumber)}
              className={cn(
                "relative h-9 min-w-9 px-3 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200",
                currentPage === pageNumber
                  ? "bg-indigo-600 text-white"
                  : "bg-[#252838] text-gray-300 hover:bg-[#2a2e40] hover:text-white"
              )}
            >
              {page}
              {currentPage === pageNumber && (
                <motion.span
                  layoutId="activePage"
                  className="absolute inset-0 rounded-full bg-indigo-600 -z-10"
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.button>
          );
        })}

        {/* Next Button */}
        {currentPage < expectedPages && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => changePage(currentPage + 1)}
            className="flex items-center justify-center h-9 w-9 rounded-full bg-[#252838] text-gray-300 hover:bg-indigo-600 hover:text-white transition-all duration-200"
            aria-label="Next page"
          >
            <ChevronRight size={18} />
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}
 
export default PaginationComponent;