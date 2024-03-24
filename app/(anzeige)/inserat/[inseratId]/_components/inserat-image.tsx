'use client'


import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { images } from "@/db/schema";


import Image from "next/image";


interface InseratImageCarouselProps {
  imagesData: typeof images.$inferSelect[]
}

const InseratImageCarousel: React.FC<InseratImageCarouselProps> = ({
  imagesData
}) => {

  const sortedImages = [...imagesData].sort((a, b) => a.position - b.position);

  return (
    <Carousel className="w-full items-center md:h-[320px]  ">
      <CarouselContent className="items-center">
        {sortedImages.map((image, index) => (
          <CarouselItem key={index}>
            <div className="w-full md:h-[320px] rounded-md overflow-hidden drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              <Image
                className="w-full h-full object-cover"
                src={image.url}
                alt="Inserat Image"
                width={1920}
                height={1080}
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