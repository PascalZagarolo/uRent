import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { conversation } from "@/db/schema";
import { cn } from "@/lib/utils";
import { PlusCircle, PlusCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface AddConversationProps {
    foundConversations : typeof conversation.$inferSelect[];
    currentUserId : string;
}

const AddConversations : React.FC<AddConversationProps> = ({
    foundConversations,
    currentUserId
}) => {

    const [selectedConversations, setSelectedConversations] = useState([]);

    useEffect(() => {
        console.log(selectedConversations)
    }, [selectedConversations])

    const findOtherUser = (conversation) => {
        if(conversation.user1Id !== currentUserId) {
            return conversation.user1
        } else {
            return conversation.user2
        }
    }

    return ( 
        <Dialog>
            <DialogTrigger className="" asChild>
                <Button className="w-full dark:bg-[#131313] dark:hover:bg-[#171717] text-gray-200 hover:text-gray-200/60">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Konversation hinzufügen
                </Button>
            </DialogTrigger>
            <DialogContent className="dark:border-none dark:bg-[#131313]">
                <div>
                    <div className="text-lg font-semibold flex flex-row items-center">
                        
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Konversation hinzufügen
                    </div>
                    <p className="text-xs dark:text-gray-200/60">
                        Wähle Konversationen aus, die du den Ordner hinzufügen möchtest.
                    </p>
                    <div className="flex flex-col space-y-2 mt-4 p-4">
                        {foundConversations?.map((conversation) => (
                            <div key={conversation.id}
                            className="flex flex-row items-center hover:cursor-pointer"
                            onClick={() => {
                                if(selectedConversations.includes(conversation.id)) {
                                    setSelectedConversations(selectedConversations.filter((id) => id !== conversation.id))
                                } else {
                                    setSelectedConversations([...selectedConversations, conversation.id])
                                }
                            }}
                            >
                                <div className="w-1/12">
                                    <Checkbox 
                                    checked={selectedConversations.includes(conversation.id)}
                                    onCheckedChange={(checked) => {
                                        if(checked) {
                                            setSelectedConversations([...selectedConversations, conversation.id])
                                        } else {
                                            setSelectedConversations(selectedConversations.filter((id) => id !== conversation.id))
                                        }
                                    }}
                                    />
                                </div>
                                <div className="px-4 py-2 dark:bg-[#111111] rounded-md w-11/12">
                                    <div className="flex flex-row items-center gap-x-2">
                                        <div>
                                            <img src={findOtherUser(conversation).image} alt="" className="w-10 h-10 rounded-full" />
                                        </div>
                                        <div className="flex flex-col ">
                                            <div>
                                                <div className={
                                                    cn("text-sm font-semibold dark:text-gray-200/20",
                                                    selectedConversations.includes(conversation.id) && "dark:text-gray-200"
                                                    )
                                                }>
                                                    {findOtherUser(conversation).name}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {selectedConversations.length > 0 && (
                        <div>
                            <div className="text-xs dark:text-gray-200/40">
                                {selectedConversations.length} {selectedConversations.length === 1 ? 
                                "Konversation" : "Konversationen"} ausgewählt
                            </div>
                        </div>
                    )}
                    <div>
                        <Button className="w-full bg-indigo-800 text-gray-200 hover:bg-indigo-900 hover:text-gray-300"
                        disabled={selectedConversations.length === 0}
                        >
                          <PlusCircleIcon className="w-4 h-4 mr-2" /> {selectedConversations?.length}  Hinzufügen
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
     );
}
 
export default AddConversations;