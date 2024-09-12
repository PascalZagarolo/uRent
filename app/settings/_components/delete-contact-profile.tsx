import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { TrashIcon, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface DeleteContactProfileProps {
    profileId: string;
    onDelete : (deletedProfile) => void;
}

const DeleteContactProfile = ({ profileId, onDelete }: DeleteContactProfileProps) => {

    const [isLoading, setIsLoading] = useState(false);

    const onDeleteVoid = async () => {
        try {
            setIsLoading(true);

            const res = await axios.delete(`/api/contactProfile/${profileId}/delete`);
            toast.success('Kontaktprofil erfolgreich gelöscht.');
            onDelete(res.data);

        } catch(e : any) {
            console.log(e);
            toast.error('Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm">
                    <TrashIcon className="w-4 h-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="dark:border-none dark:bg-[#191919]">
                <div>
                    <div className="text-lg font-semibold flex flex-row items-center">
                       <X className="w-4 h-4 mr-2 text-rose-800" /> Kontaktprofil löschen?
                    </div>
                    <div>
                        <p className="text-xs text-gray-200/60">
                            Gelöschte Kontaktprofile können nicht wiederhergestellt werden.
                        </p>
                        <div className="mt-2 flex justify-end">
                            <AlertDialogAction asChild>
                                <Button className="bg-rose-800 hover:bg-rose-900 hover:text-gray-300 text-gray-200" 
                                onClick={onDeleteVoid}
                                >
                                    Löschen
                                </Button>
                            </AlertDialogAction>
                            <AlertDialogCancel asChild>
                                <Button className="border-none" variant="ghost" >
                                    Abbrechen
                                </Button>
                            </AlertDialogCancel>
                        </div>
                    </div>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default DeleteContactProfile;