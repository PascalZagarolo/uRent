import { Separator } from "@/components/ui/separator";
import { Images, Inserat, User } from "@prisma/client";
import { CarFront } from "lucide-react";
import Image from "next/image";


interface InseratRenderProps {
    inserat : Inserat & { images : Images[] }
}

const InseratRender: React.FC<InseratRenderProps> = ({
    inserat
}) => {
    return ( 
        <div className="">
            <div className="flex justify-start mr-10 font-semibold">
                <CarFront className="mr-2 text-black/80"/> 
                {inserat.title}
            </div>
            <div className="mt-2">
                <Image
                src={inserat.images[0].url}
                height={250}
                width={250}
                alt="Vorschaubild"
                className="mb-4 rounded-md"
                />
            </div>
            <div className="flex items-center  mb-2">
                <p className="font-semibold">
                    Zeitraum : 
                </p>
                <p className="text-blue-800  text-sm ml-2 font-bold">
                12.03 - 19.03
            </p>
            </div>
            
            <Separator className="w-16 bg-black flex justify-start"/>
            <div className="flex justify-start mt-2">
                <div className="flex">
                   <p className="font-bold mr-2">Preis :</p>  <p className="font-semibold"> {inserat.price} </p> <p className="font-bold  ml-1"> € </p> 
                </div>
            </div>
        </div>
     );
}
 
export default InseratRender;