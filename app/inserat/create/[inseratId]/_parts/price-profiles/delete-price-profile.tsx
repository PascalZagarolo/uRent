'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { TrashIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


interface DeletePriceProfileProps {
    priceprofileId : string
}

const DeletePriceProfile : React.FC<DeletePriceProfileProps> = ({
    priceprofileId
}) => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();


    const onDelete = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/priceprofile/${priceprofileId}/delete`)
                .then(() => {
                    router.refresh();
                    toast.success("Preisprofil gelöscht");
                })
        } catch(error : any) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return ( 
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="bg-rose-800 hover:bg-rose-900  hover:text-gray-300">
                    <TrashIcon className="w-4 h-4 text-gray-200 dark:text-rose-200" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="dark:border-none dark:bg-[#191919]">
                <div>
                    <div>
                        <h3 className="text-md font-medium flex items-center">
                          <X className="text-rose-600 w-4 h-4 mr-2" />  Preisprofil löschen?
                        </h3>
                        <p className="text-xs dark:text-gray-200/60">
                            Gelöschte Preisprofile können nicht wiederhergestellt werden.
                        </p>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <AlertDialogAction className="bg-rose-600 hover:bg-rose-700 text-gray-200 hover:text-gray-300"
                        onClick={onDelete}
                        >
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
 
export default DeletePriceProfile;