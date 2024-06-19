import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import toast from "react-hot-toast";


interface DeleteNotificationAlertProps {
    notificationId: string
}

const DeleteNotificationAlert : React.FC<DeleteNotificationAlertProps> = ({
    notificationId
}) => {

    const onDelete = () => {
        try {

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
            <AlertDialogContent>
                <div>
                    <div>
                        <h3 className="font-semibold text-md">
                            Benachrichtigung löschen?
                        </h3>
                        <p className="text-xs text-gray-200/60">
                            gelöschte Benachrichtigungen können nicht wiederhergestellt werden
                        </p>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <AlertDialogAction onClick={onDelete}>
                            Löschen
                        </AlertDialogAction>
                        <AlertDialogCancel>
                            Abbrechen
                        </AlertDialogCancel>
                    </div>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default DeleteNotificationAlert;