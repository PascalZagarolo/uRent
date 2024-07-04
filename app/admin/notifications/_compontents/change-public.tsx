import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaLock } from "react-icons/fa";
import { IoMdLock, IoMdUnlock } from "react-icons/io";


interface ChangePublicProps {
    isPublic?: boolean;
    notificationId?: string;
}

const ChangePublic: React.FC<ChangePublicProps> = ({
    isPublic,
    notificationId
}) => {

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const onPrivate = async () => {
        try {
            setIsLoading(true);
            await axios.patch(`/api/globalnotifications/${notificationId}/changePublic`, { isPublic: false })
                .then((res) => {
                    toast.success("Benachrichtigung erfolgreich privat geschaltet");
                    router.refresh()
                })
        } catch (error: any) {
            console.log(error);
            toast.error("Fehler beim privat Schalten");
        } finally {
            setIsLoading(false);
        }
    }

    const onPublic = async () => {
        try {
            setIsLoading(true);
            await axios.patch(`/api/globalnotifications/${notificationId}/changePublic`, { isPublic: true })
                .then((res) => {
                    toast.success("Benachrichtigung erfolgreich öffentlich geschaltet");
                    router.refresh()
                })
        } catch (error: any) {
            toast.error("Fehler beim öffentlich Schalten");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className="w-full">
            {isPublic ? (
                <Button className="w-full" variant="ghost" onClick={onPrivate}>
                    <IoMdLock className="w-4 h-4 mr-2" /> Privat schalten
                </Button>
            ) : (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="w-full bg-emerald-600 text-gray-200 hover:bg-emerald-700 hover:text-gray-300"
                        >
                            <IoMdUnlock className="w-4 h-4 mr-2" />  Öffentlich schalten
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="dark:border-none dark:bg-[#191919]">
                        <div>
                            <div>
                            <h3 className="text-md font-semibold flex items-center">
                               <IoMdUnlock className="w-4 h-4 mr-2"/> Benachrichtigung öffentlich schalten?
                            </h3>
                            <p className="text-xs dark:text-gray-200/60">
                                Öffentliche Nachrichten sind für ALLE Nutzer sichtbar.
                            </p>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <AlertDialogAction className="bg-indigo-800 hover:bg-indigo-900 text-gray-200 hover:text-gray-300"
                                onClick={onPublic}
                                >
                                    Öffentlich schalten
                                </AlertDialogAction>
                                <AlertDialogCancel className="border-none">
                                    Abbrechen
                                </AlertDialogCancel>
                            </div>
                        </div>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </div>
    );
}

export default ChangePublic;