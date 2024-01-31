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
import { CarFront } from "lucide-react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

interface OwnContentSlideProps {
  inserat: Inserat[] & { images: Images[] }[];
}

const OwnContentSlide: React.FC<OwnContentSlideProps> = ({
  inserat
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
      {inserat.length > 0 ? (
        <div>
          <Carousel setApi={setApi} className=" " plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}>
            <CarouselContent className="w-[360px] h-[360px]">
              {inserat.map((inserat, index) => (
                <CarouselItem key={index} className="">
                  <Card className="bg-white p-2 rounded-md border-2 border-gray-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] hover:cursor-pointer" onClick={() => {
                    router.push(`/inserat/${inserat.id}`)
                  }}>
                  <CardContent className="aspect-square flex items-center justify-center ">
                      <div>
                        <div className="flex items-center mb-4">
                          <div className="p-2 border-black border rounded-md">
                            <CarFront className="" />
                          </div>
                          <h3 className="font-semibold text-medium ml-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] p-2 ">
                            {inserat.title}
                          </h3>
                        </div>
                        <div className="h-[200px] w-[300px] flex items-center border-2 border-gray-300 rounded-md">
                          <img
                            //@ts-ignore 
                            src={inserat.images[0].url}
                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                          />
                        </div>
                        <div className="flex mt-1">
                          <Badge className="bg-emerald-600 border border-black">
                            Verfügbar
                          </Badge>
                          
                          <div>
                          <p className="flex font-semibold ml-8 italic text-gray-900/70 text-sm"> {formatDate(inserat.begin)} - {formatDate(inserat.end)}</p>
                          </div>
                          <div className="flex ml-auto font-bold text-md">
                          {inserat.price}  <p className="text-xs mr-1">00</p> €
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            {inserat.length > 1 && (
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
        <p>
          Noch keine Inserate vorhanden

        </p>

      )}
    </div>
  )
}

export default OwnContentSlide;
