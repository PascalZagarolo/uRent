'use client'

import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Images } from "@prisma/client";
import Image from "next/image";


interface InseratImageCarouselProps {
    images : Images[]
}

const InseratImageCarousel: React.FC<InseratImageCarouselProps> = ({
    images
}) => {

    const sortedImages = [...images].sort((a, b) => a.position - b.position);

    return ( 
        <Carousel className="max-w-md">
      <CarouselContent>
        {sortedImages.map((image, index) => (
          <CarouselItem key={index}>
            <div className="">
              
               
                  <Image
                  className="rounded-md flex justify-center"
                  src={image.url}
                  width={450}
                  height={250}
                  
                  alt="Inserat Image"
                  />
                  
                
                <p className="flex justify-center text-gray-100 text-sm mt-2">
                   ( {index + 1} / {sortedImages.length} )
                  </p>
              
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="">
        <CarouselPrevious />
      </div>
      
      <div className="">
      <CarouselNext className=""/>
      </div>
      
    </Carousel>
     );
}
 
export default InseratImageCarousel;