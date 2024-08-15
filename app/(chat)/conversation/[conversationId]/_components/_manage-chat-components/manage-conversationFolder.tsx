import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PencilLineIcon } from "lucide-react";

const ManageConversationFolder = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="bg-[#191919]
             hover:bg-[#292929] hover:text-gray-200/60 p-1 px-4 rounded-md border border-dashed border-[#252525] 
             flex flex-row items-center gap-x-2 mt-2">
                    <PencilLineIcon className="w-2 h-2" />
                    <div className="text-xs">
                        Ordner verwalten
                    </div>
                </button>
            </DialogTrigger>
        </Dialog>
    );
}

export default ManageConversationFolder;