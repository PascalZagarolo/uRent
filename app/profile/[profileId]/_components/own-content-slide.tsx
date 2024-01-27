'use client'

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import { Inserat, Images } from "@prisma/client"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

interface OwnContentSlideProps {
    inserat : Inserat[] & { images : Images[]}[];
}

const OwnContentSlide: React.FC<OwnContentSlideProps> = ({
    inserat
}) => {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
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
    <div className="">
      {inserat.length > 0 ? (
        <div>
        <Carousel setApi={setApi} className="w-full max-w-xs" plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}>
          <CarouselContent>
            {inserat.map((inserat, index) => (
              <CarouselItem key={index}>
              <Card className="bg-white p-4 rounded-md border-2 border-gray-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] w-[200px] h-[400px]">
                <CardContent className="flex aspect-square items-center justify-center p-6 ">
                <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="py-2 text-center text-sm text-muted-foreground">
          Slide {current} of {count}
        </div>
        </div>
      ) : (
        <p>
            Noch keine Inserate vorhanden
            
        </p>
        
      )}
    </div>
  )
}

export default OwnContentSlide;
