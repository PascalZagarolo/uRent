'use client'

import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Images, Inserat, User } from "@prisma/client";
import InseratRender from "./inserat-render";


interface SwitchThroughAdvertsProps {
  inserate : Inserat[]
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
      <CarouselContent>
        
        {inserate.map((inserat, index) => (
          <CarouselItem key={index} className="">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 h-[250px] w-[250px]">
                  <InseratRender
                  inserat = {inserat}
                  />
                </CardContent>
              </Card>
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