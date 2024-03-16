'use client'

import { Images, Inserat } from "@prisma/client";
import { format } from "date-fns";
import { CalendarSearchIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface OtherInserateRenderProps {
    inserat : Inserat & {images : Images[]}
}

const OtherInserateRender: React.FC<OtherInserateRenderProps> = ({
    inserat
}) => {

    const router = useRouter();
    
    return ( 
        <div className="w-full bg-[#1D1F2B] pl-2 pt-2 pb-2 rounded-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            <div className="flex h-[160px]">
            
            <div className="rounded-md w-2/3">
                <Image
                src={inserat.images[0]?.url} 
                width={1920}
                height={1080}
                alt="Inserat Image"
                className="w-full h-[160px] px-2 py-2 rounded-md"
                />
            </div>
            
            <div className="w-1/3 space-y-2">
            <h3 className=" font-medium h-1/2 overflow-hidden text-sm w-full hover:underline hover:cursor-pointer" 
            onClick={() => {router.push(`/inserat/${inserat.id}`)}}>
            {inserat.title} 
            </h3>
            <div className="h-1/2   p-2  bg-[#161923]">
                <p className="text-sm text-gray-100 font-semibold truncate">
                    {inserat.price} € {inserat.annual && "/ Tag"}
                </p>
                <p className="text-xs mt-2 ">
                    {format(new Date(inserat.begin), 'dd.MM')} - {format(new Date(inserat.end), 'dd.MM')}
                </p>
            </div>
            </div>
            </div>
            
        </div>
     );
}
 
export default OtherInserateRender;