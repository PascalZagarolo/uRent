
'use client';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import axios from "axios";
import { TrashIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import toast from "react-hot-toast";

interface DeleteMessageProps {
    messageId: string;

}

const DeleteMessage: React.FC<DeleteMessageProps> = ({
    messageId
}) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = () => {
        try {
            setIsLoading(true);
            axios.delete(`/api/message/delete/${messageId}`)
        } catch {
            toast.error("Nachricht konnte nicht gelöscht werden.")
        } finally {
            setIsLoading(false);
            
        }
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger className="ml-auto flex">
                    <div className="hover: cursor-pointer">
                        <TrashIcon className="w-4 h-4 text-right " />
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="font-bold flex">
                            <X className="text-rose-600" /> Möchtest du diese Nachricht wirklich löschen ?
                        </DialogTitle>
                        <div className="text-sm">
                            Gelöschte Nachrichten können nicht wiederhergestellt werden.
                        </div>
                    </DialogHeader>
                    <div className="flex gap-x-8 mt-4">
                        <DialogTrigger>
                            <Button className="" variant="ghost">
                                Abbrechen
                            </Button>
                        </DialogTrigger>

                        <DialogTrigger>
                            <Button className="bg-rose-600 hover:bg-rose-400" onClick={onClick}>
                                Endgültig löschen
                            </Button>
                        </DialogTrigger>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default DeleteMessage;