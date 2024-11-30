'use client'

import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import FreeRentCard from "./_header-cards/free-rent"
import BasicUrentBanner from "./_header-cards/basic-urent-banner"
import { useEffect, useState } from "react"
import BasicUrentNewsletter from "./_header-cards/basic-urent-newsletter"
import { userTable } from "@/db/schema"

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
    <FreeRentCard key={1} />,
    <BasicUrentBanner 
    isLoggedIn={userId ? true : false}
    isBusiness={isBusiness}
    currentUser={currentUser}
    key={2} />,
    !subscribedToNewsletter && <BasicUrentNewsletter key={3} userId={userId} />
  ].filter(Boolean) // This filters out `false`, `null`, or `undefined`

  return (
    <div className="sm:w-[1060px] h-[320px]">
      <Carousel
        setApi={setApi}
        className=""
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
      >
        <CarouselContent className="h-[320px]">
          {renderedBanner.map((item) => (
            <CarouselItem key={item?.key}> {/* Correctly using the component's key */}
              <div className="w-full h-[320px]">
                <Card className="w-full h-full border-none rounded-md">
                  <CardContent className="flex w-full h-full items-center justify-center p-0 
                    dark:bg-[#131620] dark:border-none rounded-md">
                    {item}
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default HeaderInfo
