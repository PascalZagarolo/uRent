'use client'

import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Images, Inserat, User } from "@prisma/client";
import InseratRender from "./inserat-render";

type inseratWithImages = Inserat & { images : Images[] }

interface SwitchThroughAdvertsProps {
  inserate : Inserat[] & { images : Images[] }[]
}

const SwitchThroughAdverts: React.FC<SwitchThroughAdvertsProps> = ({
  inserate
}) => {
    return ( 
        <Carousel
      opts={{
        align: "start",
      }}
      className=""
    >
      <CarouselContent className="w-[400px] flex justify-center">
        
        {inserate.map((inserat : inseratWithImages , index) => (
          <CarouselItem key={index} className="flex justify-center ">
            <div className="">
              
                  <InseratRender
                  inserat = {inserat}
                  />
               
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
     );
}
 
export default SwitchThroughAdverts;