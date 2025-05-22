'use client';

import { Separator } from "@/components/ui/separator";
import { inserat, userTable } from "@/db/schema";
import OtherInserateRender from "./other-inserate-render";
import { ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import { useRef, useState, useEffect } from "react";

interface OtherInserateProps {
    thisUser: typeof userTable.$inferSelect,
    inserateArray: typeof inserat.$inferSelect[];
}

// Add CSS for WebKit scrollbar hiding
const scrollbarHiddenStyle = `
  #other-inserate-container::-webkit-scrollbar {
    display: none;
  }
`;

const OtherInserate: React.FC<OtherInserateProps> = ({
    thisUser,
    inserateArray
}) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScroll, setCanScroll] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    // Check if scrolling is possible
    const checkScrollability = () => {
        if (scrollContainerRef.current) {
            const { scrollHeight, clientHeight } = scrollContainerRef.current;
            setCanScroll(scrollHeight > clientHeight);
        }
    };

    // Check scrollability after rendering or window resize
    useEffect(() => {
        checkScrollability();
        window.addEventListener('resize', checkScrollability);
        return () => window.removeEventListener('resize', checkScrollability);
    }, [inserateArray]);

    // Track scroll position
    const handleScroll = () => {
        if (scrollContainerRef.current) {
            setScrollPosition(scrollContainerRef.current.scrollTop);
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const scrollUp = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ top: -150, behavior: 'smooth' });
        }
    };

    const scrollDown = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ top: 150, behavior: 'smooth' });
        }
    };

    const atTop = scrollPosition <= 10;
    const atBottom = scrollContainerRef.current ? 
        scrollContainerRef.current.scrollHeight - scrollContainerRef.current.clientHeight - scrollPosition <= 10 : 
        false;

    return (
        <div className="bg-gradient-to-b from-[#151823] to-[#1B1F2E] rounded-xl border border-gray-800/30 shadow-lg overflow-hidden">
            {/* Add style tag for WebKit scrollbar hiding */}
            <style jsx>{scrollbarHiddenStyle}</style>
            
            <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center">
                            <LayoutGrid className="w-4 h-4 text-indigo-400" />
                        </div>
                        <div>
                            <h3 className="text-sm text-gray-400">Weitere Inserate von</h3>
                            <p className="font-semibold text-gray-200 line-clamp-1">{thisUser?.name}</p>
                        </div>
                    </div>
                    
                    {canScroll && inserateArray.length > 0 && (
                        <div className="flex gap-2">
                            <button 
                                onClick={scrollUp}
                                className={`w-8 h-8 rounded-full transition-all duration-300 ${
                                    !atTop 
                                        ? 'bg-gradient-to-br from-indigo-400/80 to-indigo-600/80 hover:from-indigo-400 hover:to-indigo-600 shadow-lg' 
                                        : 'bg-gray-800/50 text-gray-500'
                                } flex items-center justify-center`}
                                disabled={atTop}
                            >
                                <ChevronLeft className={`w-5 h-5 rotate-90 ${!atTop ? 'text-white' : 'text-gray-500'}`} />
                            </button>
                            <button 
                                onClick={scrollDown}
                                className={`w-8 h-8 rounded-full transition-all duration-300 ${
                                    !atBottom 
                                        ? 'bg-gradient-to-br from-indigo-400/80 to-indigo-600/80 hover:from-indigo-400 hover:to-indigo-600 shadow-lg' 
                                        : 'bg-gray-800/50 text-gray-500'
                                } flex items-center justify-center`}
                                disabled={atBottom}
                            >
                                <ChevronRight className={`w-5 h-5 rotate-90 ${!atBottom ? 'text-white' : 'text-gray-500'}`} />
                            </button>
                        </div>
                    )}
                </div>
                
                <Separator className="my-3 bg-gray-800/50" />
                
                {inserateArray.length > 0 ? (
                    <div 
                        id="other-inserate-container"
                        ref={scrollContainerRef}
                        className="space-y-3 max-h-[350px] overflow-y-auto pr-1 scrollbar-none relative"
                        style={{ 
                            msOverflowStyle: 'none',
                            scrollbarWidth: 'none',
                            overflowClipMargin: 'unset'
                        }}
                    >
                        {inserateArray.map((pInserat) => (
                            <OtherInserateRender
                                key={pInserat.id}
                                thisInserat={pInserat}
                            />
                        ))}
                        
                        {/* Gradient fades at top and bottom for smooth scrolling visual */}
                        {canScroll && (
                            <>
                                <div className={`absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#151823] to-transparent pointer-events-none transition-opacity duration-300 ${atTop ? 'opacity-0' : 'opacity-100'}`}></div>
                                <div className={`absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#1B1F2E] to-transparent pointer-events-none transition-opacity duration-300 ${atBottom ? 'opacity-0' : 'opacity-100'}`}></div>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="py-8 text-center">
                        <p className="text-gray-400 text-sm">
                            Keine weiteren Inserate vorhanden
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default OtherInserate;