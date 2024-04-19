import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";

import { block, userTable } from "@/db/schema";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdBlock } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";

interface BlockUserProps {
    foundBlocks: typeof block.$inferSelect[];
    currentUser: typeof userTable.$inferSelect;
}

const BlockUser: React.FC<BlockUserProps> = ({
    foundBlocks,
    currentUser
}) => {

    const userBlocked = foundBlocks.some(block => block.userId === currentUser.id);

    const [isLoading, setIsLoading] = useState(false);
    const params = useParams();
    const router = useRouter();

    const onBlock = async () => {
        try {
            setIsLoading(true);
            await axios.patch(`/api/block/${params.conversationId}`)
                .then(() => {
                    toast.success("Nutzer erfolgreich blockiert")
                    router.refresh();
                })
        } catch {
            toast.error("Nutzer konnte nicht blockiert werden")
        } finally {
            setIsLoading(false);
        }
    }

    const onUnBlock = () => {

    }

    return (
        <AlertDialog>
            {userBlocked ? (
                <div className="text-xs flex text-gray-200 hover:underline hover:cursor-pointer" >
                    
                    <CgUnblock  className="w-4 h-4 mr-2 text-emerald-600" /> Nutzer freigeben
                    
                </div>
            ) : (
                <AlertDialogTrigger className="text-xs flex text-gray-200 hover:underline">
                    <MdBlock className="w-4 h-4 mr-2 text-rose-600" /> Nutzer blockieren
                </AlertDialogTrigger>
            )}
            <AlertDialogContent className="dark:border-none dark:bg-[#191919]">
                <div>
                    <h1 className="text-md font-semibold flex items-center">
                        <MdBlock className="w-4 h-4 mr-2" />   Nutzer wirklich blockieren?
                    </h1>
                    <p className="text-xs font-medium dark:text-gray-200/70">
                        Wenn du den Nutzer blockierst, kann er dir keine Nachrichten mehr senden.
                        Gesendete Nachrichten bleiben bestehen
                    </p>
                    <div className="w-full flex justify-end mt-4 ">
                        <AlertDialogCancel className="dark:border-none">
                            Abbrechen
                        </AlertDialogCancel>
                        <AlertDialogAction className="bg-rose-800 text-gray-200 font-semibold hover:bg-rose-900 hover:text-gray-300"
                            onClick={onBlock}
                        >
                            Nutzer blockieren
                        </AlertDialogAction>
                    </div>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default BlockUser;