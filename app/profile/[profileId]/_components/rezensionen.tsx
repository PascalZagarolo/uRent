import { CarIcon } from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { format } from "date-fns";
import { rezension } from "@/db/schema";



interface RezensionenRenderProps {
    thisRezension : typeof rezension.$inferSelect;
}

const RezensionenRender: React.FC<RezensionenRenderProps> = ({
    thisRezension
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
                {thisRezension[0].sender.name}
            </div>
            <div className="ml-auto flex font-bold">
                {thisRezension[0].rating}/5 <CarIcon className="ml-2 text-blue-800"/>
            </div>
            </div>
            <div className="mt-2 truncate  text-gray-800 dark:text-gray-100">
            {thisRezension[0].content}
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
                    {thisRezension[0].sender.name}
                    <p className="text-xs dark:text-gray-100/70">
                        {thisRezension[0].sender.email}
                    </p>
                </div>
                
                
            </div>
            <div className=" items-center mr-8">
                    <div className="flex font-bold items-center">
                    <div className=" mr-4 text-xs text-gray-100/60 flex gap-x-2">
                  <p className="text-gray-100/80">erstellt : </p>  {format(new Date(thisRezension[0].createdAt), "dd.MM.yyyy")}
                </div>
                        <p className="ml-auto text-sm">
                        {thisRezension[0].rating}/5 
                        </p>
                    </div>
                </div>
        </DialogHeader>
        <div>
            {thisRezension[0].content} 
        </div>
        <div>
          
        </div>
        </DialogContent>
        </Dialog>
     );
}
 
export default RezensionenRender;