import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";

const AddConversations = () => {
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
                </div>
            </DialogContent>
        </Dialog>
     );
}
 
export default AddConversations;