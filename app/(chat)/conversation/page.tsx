import getCurrentUser from "@/actions/getCurrentUser";

import { MessageSquareIcon, User2Icon } from "lucide-react";

import StartedChats from "./[conversationId]/_components/started-chats";
import HeaderLogo from "@/app/(dashboard)/_components/header-logo";

import { redirect } from "next/navigation";
import MobileHeader from "@/app/(dashboard)/_components/mobile-header";
import db from "@/db/drizzle";
import { eq, or } from "drizzle-orm";
import { conversation, notification } from '../../../db/schema';
import Footer from "@/app/(dashboard)/_components/footer";
import AdsComponent from "@/components/ad-component";




const ConversationPage = async () => {

    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return redirect("/")
    }

    if(!currentUser) {
        redirect("/login")
    }

    let startedConversations : typeof conversation.$inferSelect[] = [];

    
        const findStartedConversations = db.query.conversation.findMany({
            where : (
                or(
                    eq(conversation.user1Id, currentUser.id),
                    eq(conversation.user2Id, currentUser.id)
                
                )
            ), with : {
                messages : true,
                user1 : true,
                user2 : true
            }
        }).prepare("findStartedConversations")
   

    startedConversations = await findStartedConversations.execute();
    
    const foundNotifications = await db.query.notification.findMany({
        where : (
            eq(notification.userId, currentUser?.id)
        )
    
    })


   

    return ( 
        <div className="dark:bg-[#0F0F0F] bg-[#404040]/10 min-h-screen">
            <div className="relative top-0 w-full z-50">
                <HeaderLogo
                    currentUser={currentUser}
                    foundNotifications={foundNotifications}
                    />
            </div>
            <div className="sm:hidden">
                <MobileHeader
                currentUser={currentUser}
                foundNotifications={foundNotifications}
                />
             </div>
            <div className="flex justify-center h-full sm:py-8 sm:px-4 ">
            <div className='h-screen sm:flex items-center justify-center w-2/12  p-16 hidden'>
                        <div className=' w-full sm:block hidden space-y-4'>
                            <div>
                                <AdsComponent dataAdSlot='3797720061' />
                            </div>
                            
                        </div>
                    </div>
            <div className="dark:bg-[#0F0F0F] sm:mr-4 sm:rounded-md sm:w-[280px] w-full min-h-screen dark:border-[#1C1C1C] border">  
                    <h3 className="text-md font-semibold flex items-center p-4 ">
                    <MessageSquareIcon className="w-4 h-4 mr-2"/>  Konversationen {startedConversations.length > 0 && <p className="ml-4 text-base"> {startedConversations.length} </p>}
                    </h3>
                    {startedConversations.length > 0 ? (
                        <div className="mt-4">
                        {startedConversations.map((conversation) => (
                           <StartedChats
                           key={conversation.id}
                           conversations={conversation}
                           currentUser = {currentUser}
                           />
                        ))}
                    </div>
                    ) : (
                        <div className="mt-4 flex justify-center">
                            <p className="text-sm text-gray-300/60"> Noch keine Konversation begonnen...</p>
                        </div>
                    )}
                </div>
                
                <div className="w-[1044px] dark:bg-[#1c1c1c] h-screen overflow-y-auto no-scrollbar rounded-md bg-white hidden md:block">
                    <div className="rounded-lg h-full no-scrollbar">
                        <div className="relative h-full flex justify-center items-center font-semibold text-lg">
                            
                            
                            
                            <div className="mr-2">
                                <User2Icon className="w-12 h-12 text-gray-500 dark:text-gray-400" />
                            </div>
                                Tippe auf eine Konversation um sie zu öffnen...
                           
                            
                        </div>
                    </div>
                </div>
                <div className='h-screen sm:flex items-center justify-center w-2/12  p-16 hidden'>
                        <div className=' w-full sm:block hidden space-y-4'>
                            <div>
                                <AdsComponent dataAdSlot='3797720061' />
                            </div>
                            
                            
                        </div>
                    </div>
            </div>
            <div>
            <Footer />
            </div>
        </div>
     );
}
 
export default ConversationPage;