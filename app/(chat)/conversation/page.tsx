import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/utils/db";
import { MessageSquareIcon, User2Icon } from "lucide-react";
import ChatLogo from "./_components/chat-logo";
import ChatSideBar from "./_components/chat-sidebar";


const Conversation = async () => {

    const currentUser = await getCurrentUser();

    return ( 
        <div className="overflow-y-hidden  h-screen bg-[#404040]/10 font-medium">
            <div className="w-full h-[100px] overflow-y-hidden bg-[#1d2235] border-2 border-[#23283d] sm:flex items-center hidden">
                <ChatLogo/>
                <h3 className="flex justify-center w-full text-[#eaebf0] text-3xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.12)] items-center">
                   <MessageSquareIcon className="mr-4"/> Konversationen
                </h3>
            </div>
            
           <div className="h-screen flex overflow-y-hidden">
            <ChatSideBar
            />
            <div className="w-full">
            
                <div className="flex justify-center items-center h-full">
                
                    <p className="text-2xl">
                    <User2Icon className="flex justify-center items-center w-full  h-8"/>
                        Wähle eine bereits gestarte Konversation und/oder starte eine neue Konversation
                    </p>
                </div>
                
            </div>
           
           
           </div>
        </div>
     );
}
 
export default Conversation;