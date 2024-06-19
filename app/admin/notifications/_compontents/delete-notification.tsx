import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";


interface DeleteNotificationAlertProps {
    notificationId : string
}

const DeleteNotificationAlert = () => {

    const onDelete = () => {
        try {

        } catch(error : any) {
            console.log(error);
            toast.error('Fehler beim Löschen der Benachrichtigung');
        }
    }

    return ( 
        <AlertDialog>
            <AlertDialogTrigger>

            </AlertDialogTrigger>
        </AlertDialog>
     );
}
 
export default DeleteNotificationAlert;