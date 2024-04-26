'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import axios from "axios";
import { TrashIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


interface DeleteCodeProps {
    codeId : string
}

const DeleteCode : React.FC<DeleteCodeProps> = ({
    codeId
}) => {


    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onDelete = async () => {
        try {
            setIsLoading(true);
            console.log(codeId)
            await axios.patch(`/api/giftcode/delete/${codeId}`)
                .then(() => {
                    router.refresh();
                    toast.success("Code erfolgreich gelöscht");
                })
        } catch(error : any) {  
            console.log(error);
            toast.error("Fehler beim Löschen des Codes");
        } finally {
            setIsLoading(false);
        }
    }

    return ( 
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <TrashIcon className="w-4 h-4 text-rose-600 hover:cursor-pointer" />
            </AlertDialogTrigger>
            <AlertDialogContent className="dark:border-none dark:bg-[#191919]">
                <div>
                    <h3 className="text-md font-semibold flex items-center">
                       <X className="w-4 h-4 mr-2 text-rose-600" /> Code löschen?
                    </h3>
                    <p className="text-xs dark:text-gray-200/70">
                        Gelöschte Codes können nicht wiederhergestellt werden.
                    </p>
                    <div className="flex w-full justify-end items-center mt-4">
                        <AlertDialogCancel className="dark:border-none">
                            Abbrechen
                        </AlertDialogCancel>
                        <AlertDialogAction 
                        className="bg-rose-600 hover:bg-rose-700 dark:text-gray-200 dark:hover:text-gray-300"
                        onClick={onDelete}
                        >
                            Löschen
                        </AlertDialogAction>
                    </div>
                </div>
            </AlertDialogContent>
        </AlertDialog>
     );
}
 
export default DeleteCode;