import { CarIcon } from "lucide-react";
import { Rezension, User } from "@prisma/client";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

type RezensionWithSender = Rezension & {
    sender: User;
  };

interface RezensionenRenderProps {
    rezension : RezensionWithSender
}

const RezensionenRender: React.FC<RezensionenRenderProps> = ({
    rezension
}) => {
    return ( 
        <Dialog>
            <DialogTrigger asChild>
            <div className="bg-white w-full rounded-md p-4 border-gray-100 border-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.28)]
             dark:bg-[#1e1e1e]  dark:text-gray-100 hover:cursor-pointer">
            <div className="flex items-center">
            <div className="w-[40px] h-[40px]">
                <Image 
                    src="/placeholder-person.jpg"
                    
                    className="rounded-full border-gray-300 border-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] sm:w-[40px] sm:h-[40px] w-[30px] h-[30px]"
                    alt="Rezension_User_Bild"
                    width={40}
                    height={40}
                />
            </div>
            <div className="ml-4 font-semibold">
                {rezension.sender.name}
            </div>
            <div className="ml-auto flex font-bold">
                {rezension.rating}/5 <CarIcon className="ml-2 text-blue-800"/>
            </div>
            </div>
            <div className="mt-2 truncate  text-gray-800 dark:text-gray-100">
            {rezension.content}
            </div>
        </div>
       </DialogTrigger>
       <DialogContent className="dark:bg-[#1e1e1e] dark:border dark:border-gray-100 ">
        <DialogHeader className="w-full">
            <div className="flex items-center">
                
                <Image 
                    src="/placeholder-person.jpg"
                    
                    className="rounded-full border-gray-300 border-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] w-[40px] h-[40px]"
                    alt="Rezension_User_Bild"
                    width={40}
                    height={40}
                />
                
                
                <div className="ml-4 text-lg">
                    {rezension.sender.name}
                    <p className="text-xs dark:text-gray-100/70">
                        {rezension.sender.email}
                    </p>
                </div>
                <div className="ml-auto mr-8">
                    <div className="flex font-bold">
                        {rezension.rating}/5 <CarIcon className="ml-2 text-blue-800"/>
                    </div>
                </div>
            </div>
        </DialogHeader>
        <div>
            {rezension.content} 
        </div>
        <div>
          
        </div>
        </DialogContent>
        </Dialog>
     );
}
 
export default RezensionenRender;