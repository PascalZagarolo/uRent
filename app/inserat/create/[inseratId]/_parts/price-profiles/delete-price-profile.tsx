import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TrashIcon, X } from "lucide-react";


interface DeletePriceProfileProps {
    priceprofileId : string
}

const DeletePriceProfile : React.FC<DeletePriceProfileProps> = ({
    priceprofileId
}) => {
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
                        <AlertDialogAction className="bg-rose-600 hover:bg-rose-700 text-gray-200 hover:text-gray-300">
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