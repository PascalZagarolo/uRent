import { CarIcon } from "lucide-react";
import { Rezension } from "@prisma/client";

interface RezensionenRenderProps {
    rezension : Rezension
}

const RezensionenRender: React.FC<RezensionenRenderProps> = ({
    rezension
}) => {
    return ( 
        <div className="bg-white w-full rounded-md p-4 border-gray-100 border-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.28)]">
            <div className="flex items-center">
            <div className="w-[10%] h-[40px]">
                <img 
                    src="/placeholder-person.jpg"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    className="rounded-full border-gray-300 border-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]"
                />
            </div>
            <div className="ml-4 font-semibold">
                name
            </div>
            <div className="ml-auto flex font-bold">
                {rezension.rating}/5 <CarIcon className="ml-2 text-blue-800"/>
            </div>
            </div>
            <div className="mt-2 truncate  text-gray-800 ">
                {rezension.content}
            </div>
        </div>
     );
}
 
export default RezensionenRender;