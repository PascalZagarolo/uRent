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
        <Carousel className="w-full items-center md:h-[320px]  ">
      <CarouselContent className="items-center">
        {sortedImages.map((image, index) => (
          <CarouselItem key={index}>
          <div className="w-full md:h-[320px] rounded-md overflow-hidden">
          <Image
        className="w-full h-full object-cover"
        src={image.url}
        alt="Inserat Image"
        width={1920}
        height={1920}
    />
</div>
          <p className="flex justify-center text-gray-100 font-semibold text-sm mt-2">
            ( {index + 1} / {sortedImages.length} )
          </p>
        </CarouselItem>
        
        ))}
      </CarouselContent>
      
      
    </Carousel>
     );
}
 
export default InseratImageCarousel;