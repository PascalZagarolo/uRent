'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import axios from "axios";


import { TrashIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface DeleteFaqProps {
    faqId : string
}

const DeleteFaq : React.FC<DeleteFaqProps> = ({
    faqId  
}) => {

    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter();

    const onDelete = async () => {
        try {
            setIsLoading(true)
            await axios.delete(`/api/businessfaq/${faqId}/delete`)
                .then(() => {
                    router.refresh();
                    toast.success("Frage gelöscht")
                })
        } catch (e : any) {
            
        } finally {
            setIsLoading(false)
        }
    }

    return ( 
        <AlertDialog>
            <AlertDialogTrigger>
                <TrashIcon className="w-4 h-4 text-rose-600" />
            </AlertDialogTrigger>
            <AlertDialogContent className="dark:border-none dark:bg-[#191919]">
                <div>
                    <div>
                        <h3 className="text-md font-semibold flex items-center">
                           <X className="w-4 h-4 mr-2 text-rose-600"/> Frage löschen?
                        </h3>
                        <p className="text-xs text-gray-200/60">
                            Gelöschte Fragen können nicht wiederhergestellt werden.
                        </p>
                    </div>
                    <div className="mt-2 flex justify-end">
                        <AlertDialogAction className="dark:bg-rose-800 hover:bg-rose-900 text-gray-200 hover:text-gray-200">
                            Löschen
                        </AlertDialogAction>
                        <AlertDialogCancel className="dark:border-none">
                            Abbrechen
                        </AlertDialogCancel>
                    </div>
                </div>
            </AlertDialogContent>
        </AlertDialog>
     );
}
 
export default DeleteFaq;