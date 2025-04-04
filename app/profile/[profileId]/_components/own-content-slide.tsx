'use client'

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"



import { useRouter } from "next/navigation"

import { format } from "date-fns"
import InseratCard from "@/app/(dashboard)/_components/inserat-card"
import { inserat, userTable } from "@/db/schema"
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel"


interface OwnContentSlideProps {
  foundInserate: typeof inserat.$inferSelect[];
  currentUser : typeof userTable.$inferSelect
}

const OwnContentSlide: React.FC<OwnContentSlideProps> = ({
  foundInserate,
  currentUser
}) => {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  const formatDate = (date : Date) => {
     const returnedDate = format(new Date(date), "dd.MM");
     return returnedDate;
  }

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

  const router = useRouter();
  return (
    <div className="flex-shrink-1">
  {foundInserate.length > 0 && (
    <div className="">
      <div className="sm:w-full ">
      <Carousel setApi={setApi} className="" plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}>
        
        <CarouselContent className="mt-0">
              {foundInserate.map((thisInserat, index) => (
                <CarouselItem key={index} className="w-full flex justify-center flex-shrink-0">
                  <InseratCard 
                      currentUser={currentUser}
                      thisInserat={thisInserat}
                      profileId={currentUser?.id}
                      />
                </CarouselItem>
              ))}
            </CarouselContent>
      </Carousel>
      </div>
      <div className="text-center text-sm text-muted-foreground mt-2">
        Inserat {current} von {count}
      </div>
    </div>
  )}
</div>
  )
}

export default OwnContentSlide;
