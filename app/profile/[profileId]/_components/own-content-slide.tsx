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
  type CarouselApi,
} from "@/components/ui/carousel"
import { CarFront, CaravanIcon, ConstructionIcon, TractorIcon, TramFront, Truck } from "lucide-react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import InseratCard from "@/app/(dashboard)/_components/inserat-card"
import { inserat, users } from "@/db/schema"

interface OwnContentSlideProps {
  foundInserate: typeof inserat.$inferSelect[];
  currentUser : typeof users.$inferSelect
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
    <div className="">
      {foundInserate.length > 0 ? (
        <div className="">
          <Carousel setApi={setApi} className=" " plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}>
            <CarouselContent className="">
              {foundInserate.map((thisInserat, index) => (
                <CarouselItem key={index} className="">
                  <Card className="bg-white  rounded-md border-none flex items-center justify-center  hover:cursor-pointer
                  dark:bg-[#1C1C1C]
                  " 
                  >
                  <CardContent>
                  <InseratCard 
                      currentUser={currentUser}
                      thisInserat={thisInserat}
                      isFaved={false}
                      profileId={currentUser?.id}
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            {foundInserate.length > 10000 && (
              <>
                <CarouselPrevious />
                <CarouselNext />
              </>
            )}
          </Carousel>
          <div className=" text-center text-sm text-muted-foreground">
            Inserat {current} von {count}
          </div>
        </div>
      ) : (
        <p className="mb-16  text-gray-900/50  dark:text-gray-100 justify-center flex">
          Noch keine Inserate vorhanden...
        </p>

      )}
    </div>
  )
}

export default OwnContentSlide;
