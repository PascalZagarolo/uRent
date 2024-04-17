'use client'

import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { AlignJustify, ImageDown, PlusSquare } from "lucide-react";

import Image from "next/image";

import AttachmentRenderMobile from "./attachment-render-mobile";
import ChatSettings from "./chat-settings";
import { message, userTable } from "@/db/schema";

interface MobileProfileSidebarProps {
    user : typeof userTable.$inferSelect;
    attachments : typeof message.$inferSelect[]
}


const MobileProfileSidebar: React.FC<MobileProfileSidebarProps> = ({
    user,
    attachments
}) => {

    const formatDate = (date : Date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
      
        return `${day}.${month}.${year}`;
      };

    return ( 
        <Sheet>
            <SheetTrigger className="ml-auto">
            <div className="flex ml-auto mr-2 rounded-md ">
                            <AlignJustify className="h-8 w-8"/>
                </div>
            </SheetTrigger>
            <SheetContent className="w-3/5 border-2 border-gray-400 ">
                <SheetHeader>
                    <div className="text-2xl p-4 mr-2 ml-2 rounded-md border-black border-2 bg-[#161a28] text-gray-100">
                        {user.name}
                    </div>
                    <div className="flex justify-center">
                    <Image 
                    src={user.image || "/placeholder-person.jpg"}
                    alt="profile picture"
                    height={120}
                    width={120}
                    className="rounded-full border-2 border-gray-300 mt-4 mb-2"
                    />
                    </div>
                    <div className="font-semibold text-sm text-gray-900/80">
                        Mitglied seit : {formatDate(user.createdAt)}
                    </div>
                </SheetHeader>
                <div className="mt-4 font-semibold flex justify-start items-center bg-[#21273c] text-gray-100 p-2 rounded-lg border-2 border-black">
                   <ImageDown className="mr-2"/> Anhänge und Links <p className="font-medium ml-2 text-sm">{(attachments.length > 0) && `(${attachments.length})`}</p>
                </div>
                <div className="grid grid-cols-3 gap-2  mt-4  ">
                {attachments.slice(0,9).map((attachment, index) => (
                                <div key={attachment.id}>
                                    { index === 8 ? (
                                        <div className="bg-gray-300 flex justify-center items-center h-[70px] w-[70px] border-2 border-black rounded-md"
                                        key={attachment.id}
                                        >
                                            <div>
                                            <div className="flex justify-center">
                                            <PlusSquare className="flex justify-center items-center"/>
                                            
                                            </div>
                                            <p className="text-xs mt-1 text-gray-900/90 font-bold">
                                                {attachments.length - 9} weitere..
                                            </p>
                                            </div>
                                        </div>
                                    ) : (
                                        
                                            <AttachmentRenderMobile
                                        key={attachment.id}
                                        messageWithImage={attachment}
                                        />
                                        
                                    )}
                                </div>
                            
                            ))}
                            
                            </div>
                            <div className="mt-8">
                        <ChatSettings/>
                    </div>
            </SheetContent>
        </Sheet>
     );
}
 
export default MobileProfileSidebar;