'use client'


import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import  { Images } from "@prisma/client";

import Image from "next/image";


interface InseratImageCarouselProps {
    images : Images[]
}

const InseratImageCarousel: React.FC<InseratImageCarouselProps> = ({
    images
}) => {

    const sortedImages = [...images].sort((a, b) => a.position - b.position);

    return ( 
        <Carousel className="md:w-[500px] items-center md:h-[320px]  ">
      <CarouselContent className="items-center">
        {sortedImages.map((image, index) => (
          <CarouselItem key={index}>
          <div className="md:w-[500px] md:h-[320px]  border-2 border-gray-300 rounded-md">
            <img
              className="rounded-md"
              src={image.url}
              alt="Inserat Image"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <p className="flex justify-center text-gray-800 font-semibold text-sm mt-2">
            ( {index + 1} / {sortedImages.length} )
          </p>
        </CarouselItem>
        
        ))}
      </CarouselContent>
      <div className="sm:block hidden">
        <CarouselPrevious />
      </div>
      
      <div className="sm:block hidden">
      <CarouselNext className=""/>
      </div>
      
    </Carousel>
     );
}
 
export default InseratImageCarousel;