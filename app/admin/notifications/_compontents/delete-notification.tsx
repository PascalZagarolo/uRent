import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { TrashIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


interface DeleteNotificationAlertProps {
    notificationId: string
}

const DeleteNotificationAlert : React.FC<DeleteNotificationAlertProps> = ({
    notificationId
}) => {

    const router = useRouter();

    const onDelete = async () => {
        try {
            await axios.delete(`/api/globalnotifications/${notificationId}/delete`)
                .then(() => {
                    router.refresh();
                    toast.success('Benachrichtigung gelöscht');
                })
        } catch (error: any) {
            console.log(error);
            toast.error('Fehler beim Löschen der Benachrichtigung');
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="w-1/2 bg-rose-800 text-gray-200 font-semibold hover:bg-rose-900">
                    <TrashIcon className="w-4 h-4 mr-2" /> Benachrichtigung löschen
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="dark:border-none bg-[#131313]">
                <div>
                    <div>
                        <h3 className="font-semibold text-md flex items-center">
                           <X className="w-4 h-4 mr-2 text-rose-600" /> Benachrichtigung löschen?
                        </h3>
                        <p className="text-xs text-gray-200/60">
                            gelöschte Benachrichtigungen können nicht wiederhergestellt werden
                        </p>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <AlertDialogAction onClick={onDelete} className="dark:bg-rose-600 dark:hover:bg-rose-700 text-gray-200 hover:text-gray-300">
                            Löschen
                        </AlertDialogAction>
                        <AlertDialogCancel className="border-none">
                            Abbrechen
                        </AlertDialogCancel>
                    </div>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default DeleteNotificationAlert;