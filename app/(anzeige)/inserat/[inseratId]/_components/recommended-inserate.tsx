"use client";

import { useEffect, useState, useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, ChevronLeft, SparklesIcon } from "lucide-react";
import OtherInserateRender from "./other-inserate-render";
import { getRecommendedInserate } from "@/actions/inserat/getRecommendedInserate";

// UUID validation regex
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

interface RecommendedInserateProps {
  currentCategory?: string;
  currentInseratId?: string;
}

const RecommendedInserate: React.FC<RecommendedInserateProps> = ({
  currentCategory,
  currentInseratId
}) => {
  const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFromHistory, setIsFromHistory] = useState(false);
  const [canScroll, setCanScroll] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Check if scrolling is possible
  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScroll(scrollWidth > clientWidth);
    }
  };

  useEffect(() => {
    const fetchRecommendedInserate = async () => {
      try {
        // Get recently viewed inserate IDs from localStorage
        const visitedIds = JSON.parse(localStorage.getItem("visitedInserate") || "[]");
        
        // Filter out invalid UUIDs and the current inserat ID
        const validVisitedIds = Array.isArray(visitedIds) 
          ? visitedIds.filter(id => typeof id === 'string' && UUID_REGEX.test(id) && id !== currentInseratId)
          : [];
        
        let data;
        
        // If we have valid visited inserate, fetch them directly using our server action
        if (validVisitedIds.length > 0) {
          setIsFromHistory(true);
          data = await getRecommendedInserate({ 
            ids: validVisitedIds,
            limit: 10
          });
        } 
        // Otherwise fetch recommendations based on category
        else if (currentCategory) {
          setIsFromHistory(false);
          data = await getRecommendedInserate({
            category: currentCategory,
            excludeId: currentInseratId,
            limit: 10
          });
        }
        
        if (data?.success && data.inserate && Array.isArray(data.inserate)) {
          // Filter again to be absolutely sure the current inserat is excluded
          const filteredInserate = data.inserate.filter(inserat => inserat.id !== currentInseratId);
          setRecentlyViewed(filteredInserate);
        } else {
          setRecentlyViewed([]);
        }
      } catch (error) {
        console.error("Error fetching recommended inserate:", error);
        setRecentlyViewed([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendedInserate();
  }, [currentCategory, currentInseratId]);

  // Check scrollability after data is loaded or window is resized
  useEffect(() => {
    if (!isLoading) {
      checkScrollability();
      window.addEventListener('resize', checkScrollability);
      return () => window.removeEventListener('resize', checkScrollability);
    }
  }, [isLoading, recentlyViewed]);

  // Track scroll position
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-[#151823]/80 to-[#1B1F2E]/80 shadow-lg backdrop-blur-sm border border-gray-800/30 p-5 h-[180px]">
        <div className="h-full w-full flex flex-col justify-center items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 animate-pulse"></div>
          <div className="w-40 h-4 bg-blue-500/10 rounded-full animate-pulse"></div>
          <div className="w-64 h-16 bg-blue-500/5 rounded-lg mt-4 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#151823] via-[#1B1F2E] to-[#151823] shadow-lg border border-gray-800/30">
      {/* Glowing accent */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="p-5 relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-md"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center relative z-10 shadow-lg">
                <SparklesIcon className="w-4 h-4 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">
                <span className="text-gray-200/80">
                  Das könnte dir auch gefallen
                </span>
              </h3>
            </div>
          </div>
          
          {canScroll && (
            <div className="flex gap-2">
              <button 
                onClick={scrollLeft}
                className={`w-8 h-8 rounded-full transition-all duration-300 ${
                  scrollPosition > 10 
                    ? 'bg-gradient-to-br from-blue-400/80 to-indigo-600/80 hover:from-blue-400 hover:to-indigo-600 shadow-lg' 
                    : 'bg-gray-800/50 text-gray-500'
                } flex items-center justify-center`}
                disabled={scrollPosition <= 10}
              >
                <ChevronLeft className={`w-5 h-5 ${scrollPosition > 10 ? 'text-white' : 'text-gray-500'}`} />
              </button>
              <button 
                onClick={scrollRight}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400/80 to-indigo-600/80 hover:from-blue-400 hover:to-indigo-600 flex items-center justify-center shadow-lg transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          )}
        </div>
        
        <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent my-4"></div>
        
        <div 
          ref={scrollContainerRef}
          id="inserate-scroll-container"
          className="flex overflow-x-auto gap-4 pb-2 scrollbar-none"
          style={{ msOverflowStyle: 'none' }}
        >
          {recentlyViewed
            .filter(inserat => inserat.id !== currentInseratId)
            .map((inserat) => (
              <div key={inserat.id} className="min-w-[280px] w-[280px] flex-shrink-0 transform transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-1">
                <OtherInserateRender thisInserat={inserat} />
              </div>
            ))}
            
          {/* Gradient fade effect at the end */}
          {canScroll && (
            <div className="absolute right-0 top-[68px] bottom-2 w-12 bg-gradient-to-l from-[#1B1F2E] to-transparent pointer-events-none"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendedInserate;
