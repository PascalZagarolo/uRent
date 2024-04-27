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

const HeaderInfo = () => {

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

    useEffect(() => {
      if (!api) {
        return
      }
  
      setCount(api.scrollSnapList().length)
      setCurrent(api.selectedScrollSnap() + 1)
  
      api.on("select", () => {
        setCurrent(api.selectedScrollSnap() + 1)
      })
    }, [api])


  return (
    <div className="sm:w-[1060px] h-[320px]">
      <Carousel
        setApi={setApi} className="" plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
      >
        <CarouselContent className="h-[320px]">

          <CarouselItem>
            <div className="w-full h-[320px]">
              <Card className="w-full h-full border-none rounded-md">
                <CardContent className="flex w-full h-full items-center justify-center p-6 
                dark:bg-[#131620] dark:border-none rounded-md">
                  <FreeRentCard />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          <CarouselItem>
            <div className="w-full h-[320px]">
              <Card className="w-full h-full border-none rounded-md">
                <CardContent className="flex w-full h-full items-center justify-center p-6 
                dark:bg-[#131620] dark:border-none rounded-md">
                  <BasicUrentBanner />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

        </CarouselContent>

      </Carousel>
    </div>
  );
}

export default HeaderInfo;