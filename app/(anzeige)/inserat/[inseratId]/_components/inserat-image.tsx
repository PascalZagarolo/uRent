'use client'


import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
    <Carousel className="w-full items-center md:h-[320px]">
      <CarouselContent className="items-center">
        {sortedImages.map((image, index) => (
          <>

            <CarouselItem key={index}>
              <div className="w-full md:h-[320px] h-[240px] sm:rounded-md  overflow-hidden">
                <Dialog>
                  <DialogTrigger asChild>
                    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
                    <Image
                      className="w-full h-full  object-cover hover:cursor-pointer"
                      src={image.url}
                      alt="Inserat Image"
                      fill
                    />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="dark:bg-[#0F0F0F] dark:border-none w-screen p-1">
                    <div className="flex justify-center">
                    <Image
                        className="w-full h-full object-cover flex justify-center"
                        src={image.url}
                        alt="Inserat Image"
                        width={1920}
                        height={1080}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <p className="flex justify-center text-gray-100 font-semibold text-sm mt-2">
                ( {index + 1} / {sortedImages.length} )
              </p>

            </CarouselItem>
          </>
        ))}

      </CarouselContent>
      {
        imagesData.length > 1 && (
          <div className="sm:block hidden">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        )
      }

    </Carousel>
  );
}

export default InseratImageCarousel;