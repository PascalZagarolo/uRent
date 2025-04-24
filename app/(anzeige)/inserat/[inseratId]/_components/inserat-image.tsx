'use client'

import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { images } from "@/db/schema";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";

interface InseratImageCarouselProps {
  imagesData: typeof images.$inferSelect[]
}

const InseratImageCarousel: React.FC<InseratImageCarouselProps> = ({
  imagesData
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const sortedImages = [...imagesData].sort((a, b) => a.position - b.position);
  
  useEffect(() => {
    if (!api) return;
    
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="relative w-full">
      <Carousel 
        setApi={setApi} 
        className="w-full items-center md:h-[400px]"
      >
        <CarouselContent className="items-center">
          {sortedImages.map((image, index) => (
            <CarouselItem key={index} className="overflow-hidden">
              <div className="w-full md:h-[400px] h-[240px] overflow-hidden relative group">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="h-full w-full relative cursor-pointer">
                      <Image
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src={image.url}
                        alt="Inserat Image"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="bg-[#0F0F0F] border-none w-screen p-1 2xl:max-w-[1320px] xl:max-w-[920px] lg:max-w-[720px]">
                    <div className="flex justify-center w-full">
                      <Image
                        className="w-full h-full object-contain"
                        src={image.url}
                        alt="Inserat Image"
                        width={1920}
                        height={1080}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Top right image counter */}
        <div className="absolute top-3 right-3 z-20">
          <div className="bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2 border border-white/10 shadow-md">
            <span className="text-sm font-medium text-white">
              {current}/{count}
            </span>
          </div>
        </div>

        {/* Modern image indicators */}
        
        
        {imagesData.length > 1 && (
          <>
            <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10">
              <button 
                onClick={() => api?.scrollPrev()}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm text-white border border-white/10 hover:bg-black/60 transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10">
              <button 
                onClick={() => api?.scrollNext()}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm text-white border border-white/10 hover:bg-black/60 transition-all duration-200"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </>
        )}

        {/* Subtle dots indicator */}
        {imagesData.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
            {sortedImages.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  current === index + 1 
                    ? "bg-white w-6" 
                    : "bg-white/70 hover:bg-white/90"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </Carousel>
    </div>
  );
}

export default InseratImageCarousel;