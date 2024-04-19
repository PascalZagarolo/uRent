import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MdBlock } from "react-icons/md";

const BlockUser = () => {
    return ( 
        <Dialog>
            <DialogTrigger className="text-xs flex text-gray-200 hover:underline">
                <MdBlock className="w-4 h-4 mr-2"/> Nutzer blockieren
            </DialogTrigger>
            <DialogContent className="dark:border-none dark:bg-[#191919]">
                ...
            </DialogContent>
        </Dialog>
     );
}
 
export default BlockUser;