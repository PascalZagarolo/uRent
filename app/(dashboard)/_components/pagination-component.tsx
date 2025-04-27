'use client'

import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getSearchParamsFunction } from "@/actions/getSearchParams";
import { useGetFilterAmount, useResultsPerPage, useSavedSearchParams } from "@/store";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "@/components/motion";
import { useEffect, useState } from "react";
import axios from "axios";

const PaginationComponent = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Track whether pagination should be shown even when no results in store
  const [shouldShow, setShouldShow] = useState(false);
  // Track total results count from direct API call
  const [totalResults, setTotalResults] = useState(0);
  // Track if we're currently loading results
  const [isLoading, setIsLoading] = useState(false);

  const currentPage = Number(searchParams.get("page") || "1");
  const params = getSearchParamsFunction("page");
  const filter = searchParams.get("filter");
  
  // Get saved search params from store
  const savedSearchParams = useSavedSearchParams((state) => state.searchParams);
  const itemsPerPage = useResultsPerPage((state) => state.results);

  // Direct API call to get total count
  useEffect(() => {
    const fetchTotalCount = async () => {
      if (!savedSearchParams) return;
      
      setIsLoading(true);
      try {
        const response = await axios.patch('/api/search', savedSearchParams);
        if (response.data !== undefined) {
          // Set total count from API response
          const count = Number(response.data);
          setTotalResults(count);
          
          // If we have a filter, ensure pagination is shown
          if (filter) {
            setShouldShow(true);
          }
        }
      } catch (error) {
        console.error("Error fetching total count:", error);
        setTotalResults(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTotalCount();
  }, [savedSearchParams, filter]);

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

  // Make pagination visible when a sorting filter is applied
  useEffect(() => {
    // Check if there's a filter param and force pagination to show
    if (filter) {
      setShouldShow(true);
      
      // If we have a sort filter but no results,
      // we need to force at least one page to be shown
      if (totalResults <= 0) {
        // Set a minimum of 1 page when filter is applied
        // This ensures pagination is visible even if result count isn't properly updated
        setShouldShow(true);
      }
    } else {
      setShouldShow(filter ? true : false);
    }
  }, [filter, totalResults]);

  // Calculate total pages based on the total number of results from API
  // If sorting filter is applied and no results, show at least one page
  const expectedPages = shouldShow && totalResults <= 0 
    ? 1 
    : Math.max(Math.ceil(totalResults / itemsPerPage), 1);
  
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

  // If current page is greater than expected pages, redirect to the first page
  useEffect(() => {
    if (currentPage > expectedPages && expectedPages > 0) {
      changePage(1);
    }
  }, [expectedPages, currentPage]);

  // Don't show pagination if there's only one page and no filter applied
  if ((expectedPages <= 1 && !shouldShow) || isLoading) {
    return null;
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