'use client'


import { inserat } from "@/db/schema";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface OtherInserateRenderProps {
    thisInserat : typeof inserat.$inferSelect
}

const OtherInserateRender: React.FC<OtherInserateRenderProps> = ({
    thisInserat
}) => {

    const router = useRouter();
    
    return ( 
        <div className="w-full bg-[#1D1F2B]  pt-2 pb-2 rounded-md shadow-lg">
            <div className="flex h-[160px]">
            
            <div className="rounded-md w-2/3">
                <Image
                src={thisInserat?.images[0]?.url} 
                width={320}
                height={160}
                alt="Inserat Image"
                className="w-full h-[160px] px-2 py-2 rounded-md object-cover"
                />
            </div>
            
            <div className="w-1/3 space-y-2">
            <h3 className=" font-medium h-1/2 overflow-hidden  text-gray-200 text-sm w-full hover:underline hover:cursor-pointer" 
            onClick={() => {router.push(`/inserat/${thisInserat.id}`)}}>
            {thisInserat?.title} 
            </h3>
            <div className="h-1/2   p-2  bg-[#161923] shadow-lg rounded-l-md">
                <p className="text-sm text-gray-100 font-semibold truncate">
                    {thisInserat?.price} € {thisInserat.dailyPrice && "/ Tag"}
                </p>
                
            </div>
            </div>
            </div>
            
        </div>
     );
}
 
export default OtherInserateRender;