'use client'

import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import FreeRentCard from "./_header-cards/free-rent"
import BasicUrentBanner from "./_header-cards/basic-urent-banner"
import { useEffect, useState } from "react"
import BasicUrentNewsletter from "./_header-cards/basic-urent-newsletter"
import { userTable } from "@/db/schema"
import WhyURent from "./_header-cards/why-urent-banner"
import { cn } from "@/lib/utils"

interface HeaderInfoProps {
  subscribedToNewsletter?: boolean
  userId: string
  isBusiness?: boolean
  currentUser : typeof userTable.$inferSelect
}

const HeaderInfo = ({ subscribedToNewsletter, userId, isBusiness, currentUser }: HeaderInfoProps) => {
  const [api, setApi] = useState<CarouselApi | undefined>(undefined)
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    const onSelect = () => setCurrent(api.selectedScrollSnap() + 1)
    api.on("select", onSelect)

    return () => {
      api.off("select", onSelect) // Cleanup event listener on unmount
    }
  }, [api])

  const renderedBanner = [
    <WhyURent key={0} />,
    <BasicUrentBanner 
      isLoggedIn={userId ? true : false}
      isBusiness={isBusiness}
      currentUser={currentUser}
      key={2} 
    />,
    !subscribedToNewsletter && <BasicUrentNewsletter key={3} userId={userId} />,
    <FreeRentCard key={1} />,
  ].filter(Boolean) // This filters out `false`, `null`, or `undefined`

  return (
    <div className="w-full max-w-[1060px] mx-auto h-[300px] mt-6">
      <div className="relative h-full">
        <Carousel
          setApi={setApi}
          className="rounded-xl overflow-hidden h-full"
          plugins={[
            Autoplay({
              delay: 12000,
            }),
          ]}
          opts={{
            loop: true,
            align: "center",
          }}
        >
          <CarouselContent className="h-full">
            {renderedBanner.map((item) => (
              <CarouselItem key={item?.key} className="h-full"> 
                <div className="w-full h-full">
                  <Card className="w-full h-full border-none rounded-xl overflow-hidden shadow-lg">
                    <CardContent className="flex w-full h-full items-center justify-center p-0 
                      dark:bg-[#131620] dark:border-none rounded-xl">
                      <div className="w-full h-full card-container">
                        {item}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
            {Array.from({length: count}).map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  current === i + 1 
                    ? "bg-white w-6" 
                    : "bg-white/50 hover:bg-white/70"
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          
          <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 hidden md:block">
            <CarouselPrevious className="bg-white/10 hover:bg-white/20 border-none text-white" />
          </div>
          <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 hidden md:block">
            <CarouselNext className="bg-white/10 hover:bg-white/20 border-none text-white" />
          </div>
        </Carousel>
      </div>
      
      {/* Add global styles for card containers */}
      <style jsx global>{`
        .card-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        /* Set general height for all header cards */
        .card-container > div {
          height: 300px;
          width: 100%;
        }
      `}</style>
    </div>
  )
}

export default HeaderInfo
