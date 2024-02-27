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
          <div className="md:w-[500px] md:h-[320px] rounded-md overflow-hidden">
    <img
        className="w-full h-full object-cover"
        src={image.url}
        alt="Inserat Image"
    />
</div>
          <p className="flex justify-center text-gray-800 font-semibold text-sm mt-2">
            ( {index + 1} / {sortedImages.length} )
          </p>
        </CarouselItem>
        
        ))}
      </CarouselContent>
      {sortedImages.length > 1 && (
        <>
        <div className="sm:block hidden">
        <CarouselPrevious 
        className="dark:text-gray-100"
        />
      </div>
      
      <div className="sm:block hidden">
      <CarouselNext className="dark:text-gray-100"/>
      </div>
      </>
      )}
      
    </Carousel>
     );
}
 
export default InseratImageCarousel;