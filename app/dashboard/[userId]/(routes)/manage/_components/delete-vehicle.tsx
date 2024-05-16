import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import axios from "axios";
import { TrashIcon, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import qs from "query-string"
import { ro } from "date-fns/locale";


interface DeleteVehicleProps {
    vehicleId : string
}

const DeleteVehicle : React.FC<DeleteVehicleProps> = ({
    vehicleId
}) => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const searchParams = useSearchParams();
    const pathname = usePathname();

    

    const onDelete = async  () => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/vehicle/${vehicleId}/delete`)
                .then(() => {
                    const url = qs.stringifyUrl({
                        url : process.env.NEXT_PUBLIC_BASE_URL + pathname,
                        query : {
                            inseratId : searchParams.get("inseratId")
                        }
                    })
                    toast.success("Fahrzeug erfolgreich gelöscht");
                    router.push(url);
                })
        } catch(error : any) {
            console.log("Fehler beim Löschen des Fahrzeugs", error);
            toast.error("Fehler beim Löschen des Fahrzeugs");
        } finally {
            setIsLoading(false);
        }
    }

    return ( 
        <AlertDialog>
            <AlertDialogTrigger>
                <TrashIcon className="w-4 h-4 text-rose-600" />
            </AlertDialogTrigger>
            <AlertDialogContent className="dark:bg-[#191919] dark:border-none">
                <div>
                    <div>
                        <h3 className="text-md font-semibold flex items-center">
                          <X className="w-4 h-4 mr-2 text-rose-600" />  Fahrzeug wirklich löschen?
                        </h3>
                        <p className="text-xs dark:text-gray-200/60">
                            Gelöschte Fahrzeuge können nicht wiederhergstellt werden.
                        </p>
                    </div>
                    <div className="mt-4 flex items-center justify-end">
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
 
export default DeleteVehicle;