import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { conversation } from "@/db/schema";
import { cn } from "@/lib/utils";
import axios from "axios";
import { MinusCircleIcon, PlusCircle, PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { conversationFolder } from '../../../../../../db/schema';

interface DeleteConversationsFolderProps {
    foundConversations : typeof conversation.$inferSelect[];
    currentUserId : string;
    conversationFolderId : string;
}

const DeleteConversationsFolder : React.FC<DeleteConversationsFolderProps> = ({
    foundConversations,
    currentUserId,
    conversationFolderId
}) => {

    

    const [selectedConversations, setSelectedConversations] = useState([]);
    const [renderedConversations, setRenderedConversations] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    useMemo(() => {
        const notRelated = foundConversations?.filter((conversation : any) => {
            for (const folder of conversation?.folderOnConversation) {
                
                if(folder.folderId === conversationFolderId) {
                    return true;
                }
            }
            return false;
        })

        setRenderedConversations(notRelated);
    },[foundConversations])
    

    

   

    const findOtherUser = (conversation) => {
        if(conversation?.user1Id !== currentUserId) {
            return conversation?.user1
        } else {
            return conversation?.user2
        }
    }


    const onSubmit = async () => {
        try {
            setIsLoading(true);
            const allIds = selectedConversations;
            console.log(conversationFolderId)
            axios.patch(`/api/conversationFolder/${conversationFolderId}/conversations/delete`, selectedConversations)
                .then(() => {
                    toast.success("Konversationen aus Ordner gelöscht.");
                    setSelectedConversations([]);
                    router.refresh();
                })
        } catch(e : any) {
            console.log(e);
            return null;
        } finally {
            setIsLoading(false);
        }
    }

    return ( 
        <Dialog>
            <DialogTrigger className="" asChild>
                <Button className="w-full dark:bg-[#131313] dark:hover:bg-[#171717] text-gray-200 hover:text-gray-200/60">
                    <MinusCircleIcon className="w-4 h-4 mr-2" />
                    Konversation entfernen
                </Button>
            </DialogTrigger>
            <DialogContent className="dark:border-none dark:bg-[#131313]">
                <div>
                    <div className="text-lg font-semibold flex flex-row items-center">
                        
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Konversation  {renderedConversations?.length}
                    </div>
                    <p className="text-xs dark:text-gray-200/60">
                        Wähle Konversationen aus, die du aus dem Ordner entfernen möchtest.
                    </p>
                    <div className="flex flex-col space-y-2 mt-4 p-4">
                        {renderedConversations?.map((conversation) => (
                            <div key={conversation?.id}
                            className="flex flex-row items-center hover:cursor-pointer"
                            onClick={() => {
                                if(selectedConversations.includes(conversation?.id)) {
                                    setSelectedConversations(selectedConversations?.filter((id) => id !== conversation?.id))
                                } else {
                                    setSelectedConversations([...selectedConversations, conversation?.id])
                                }
                            }}
                            >
                                <div className="w-1/12">
                                    <Checkbox 
                                    checked={selectedConversations.includes(conversation?.id)}
                                    onCheckedChange={(checked) => {
                                        if(checked) {
                                            setSelectedConversations([...selectedConversations, conversation?.id])
                                        } else {
                                            setSelectedConversations(selectedConversations.filter((id) => id !== conversation.id))
                                        }
                                    }}
                                    />
                                </div>
                                <div className="px-4 py-2 dark:bg-[#111111] rounded-md w-11/12">
                                    <div className="flex flex-row items-center gap-x-2">
                                        <div>
                                            <img src={findOtherUser(conversation)?.image} alt="" className="w-10 h-10 rounded-full" />
                                        </div>
                                        <div className="flex flex-col ">
                                            <div>
                                                <div className={
                                                    cn("text-sm font-semibold dark:text-gray-200/20",
                                                    selectedConversations.includes(conversation?.id) && "dark:text-gray-200"
                                                    )
                                                }>
                                                    {findOtherUser(conversation)?.name}
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
                        <Button className="w-full bg-rose-800 text-gray-200 hover:bg-rose-900 hover:text-gray-300"
                        onClick={onSubmit}
                        disabled={selectedConversations.length === 0}
                        >
                          <MinusCircleIcon className="w-4 h-4 mr-2" /> {selectedConversations?.length} entfernen
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
     );
}
 
export default DeleteConversationsFolder;