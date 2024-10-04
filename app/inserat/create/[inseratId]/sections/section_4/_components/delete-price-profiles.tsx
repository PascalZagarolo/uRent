'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { TrashIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


interface DeletePriceProfilesCreationProps {
    thisProfileId : string
    setCurrentPriceProfiles : (value) => void;
}

const DeletePriceProfilesCreation : React.FC<DeletePriceProfilesCreationProps> = ({
    thisProfileId,
    setCurrentPriceProfiles
}) => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();


    const onDelete = async () => {
        // try {
        //     setIsLoading(true);
        //     await axios.delete(`/api/priceprofile/${thisProfileId}/delete`)
        //         .then(() => {
        //             router.refresh();
        //             toast.success("Preisprofil gelöscht");
        //         })
        // } catch(error : any) {
        //     console.log(error);
        // } finally {
        //     setIsLoading(false);
        // }
        try {
            setCurrentPriceProfiles((prev) => prev.map((item) => {
                if(item.id === thisProfileId) {
                    return {
                        ...item,
                        getsDeleted : true
                    }
                }
                return item;
            }));
        } catch(e : any) {
            console.log(e);
        }
    }

    return ( 
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="dark:bg-[#1C1C1C] dark:hover:bg-[#191919]">
                    <TrashIcon className="w-4 h-4 text-rose-600 dark:text-rose-700" />
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
                        disabled={isLoading}
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
 
export default DeletePriceProfilesCreation;