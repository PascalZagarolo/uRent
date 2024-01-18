'use client'

import { Button } from "@/components/ui/button";
import {  ImageIcon, MailCheck, PhoneCall, User2, UserCheck, UserCircle } from "lucide-react";
import { User } from "@prisma/client";
import Image from "next/image";

interface ConversationProfileBarProps {
    otherUser : User
}

const ConversationProfileBar: React.FC<ConversationProfileBarProps> = ({
    otherUser
}) => {

    const formatDate = (inputDate: Date): string => {
        const day = ('0' + inputDate.getDate()).slice(-2);
        const month = ('0' + (inputDate.getMonth() + 1)).slice(-2);
        const year = inputDate.getFullYear();
      
        return `${day}.${month}.${year}`;
      };

      
    return ( 
        <div className="flex justify-end overflow-y-hidden h-full drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.6)] ">
        <div className=" bg-white w-[360px] border-2 border-black">
                <div className="">
                    <h3 className="flex justify-center mt-2 p-2 border-2 border-black ml-2 mr-2 rounded-md font-bold text-xl">
                      <User2 className="mr-2"/>  {otherUser.name}
                    </h3>
                </div>
                <div className=" flex justify-center mt-8">
                    <Image
                    src={otherUser.image || "/placeholder-person.jpg"}
                    width={120}
                    height={120}
                    alt="profile picture"
                    className="rounded-full border-2 border-black"
                    />
                </div>
                <div className="mt-2">
                    <div className="flex justify-center text-gray-900/60 font-semibold text-sm">
                        auf <p className="text-[#4e5889] font-bold ml-1">u</p><p className="text-gray-900 font-bold mr-1">Rent</p> seit {formatDate(otherUser.createdAt)}
                    </div>
                </div>
                <div className="flex justify-center mt-2 gap-x-12">
                    <div className="">
                        <Button variant="ghost">
                            <UserCircle/>
                        </Button>                        
                    </div>
                    <div className="">
                        <Button variant="ghost">
                            <PhoneCall/>
                        </Button>                        
                    </div>
                    <div className="">
                        <Button variant="ghost">
                            <MailCheck className=""/>
                        </Button>                        
                    </div>
                </div>
                <div>
                <div className="ml-4 mt-4">
                    <div className="font-semibold flex">
                       <ImageIcon className="mr-4"/> Anhänge und Links
                    </div>
                </div>
            </div>
            </div>
            
        </div>
     );
}
 
export default ConversationProfileBar;