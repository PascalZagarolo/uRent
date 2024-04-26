'use client'


import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
 
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import FreeRentCard from "./_header-cards/free-rent"
import BasicUrentBanner from "./_header-cards/basic-urent-banner"

const HeaderInfo = () => {

   
        const plugin = React.useRef(
          Autoplay({ delay: 6000, stopOnInteraction: true }))
        

    return ( 
        <div className="sm:w-[1060px] h-[320px]"> 
            <Carousel
      plugins={[plugin.current]}
      className="w-full h-[320px]"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="h-[320px]">
        
          <CarouselItem>
            <div className="w-full h-[320px]">
              <Card className="w-full h-full border-none rounded-md">
                <CardContent className="flex w-full h-full items-center justify-center p-6 
                dark:bg-[#131620] dark:border-none rounded-md">
                  <FreeRentCard/>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          <CarouselItem>
            <div className="w-full h-[320px]">
              <Card className="w-full h-full border-none rounded-md">
                <CardContent className="flex w-full h-full items-center justify-center p-6 
                dark:bg-[#131620] dark:border-none rounded-md">
                  <BasicUrentBanner/>
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