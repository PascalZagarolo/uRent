'use client';

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "react-hot-toast";
import { TrashIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

interface DeleteBookingProps {
    bookingId: string;
    useHover?: boolean;
}

const DeleteBooking: React.FC<DeleteBookingProps> = ({
    bookingId,
    useHover
}) => {

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const onDelete = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/booking/delete/${bookingId}`)
                .then(() => router.refresh())
            toast.success("Buchung erfolgreich gelöscht")
        } catch (error: any) {
            console.log(error)
            toast.error("Fehler beim Löschen der Buchung")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AlertDialog>
            {useHover ? (
                <AlertDialogTrigger>
                    <Button variant="ghost">
                        <TrashIcon className="w-4 h-4" />
                    </Button>
                </AlertDialogTrigger>
            ) : (
                <AlertDialogTrigger>
                    <TrashIcon className="w-4 h-4" />
                </AlertDialogTrigger>
            )}
            <AlertDialogContent className="dark:border-none dark:bg-[#191919]">
                <div>
                    <div>
                        <h1 className="text-md font-semibold flex items-center">
                            <X className="w-4 h-4 mr-2 text-rose-800" /> Buchung wirklich löschen?
                        </h1>
                        <p className="text-xs dark:text-gray-200/70">
                            Gelöschte Buchungen können nicht wiederhergestellt werden.
                        </p>
                    </div>
                    <div className="w-full flex justify-end mt-2">
                        <AlertDialogCancel className="dark:border-none">
                            Abbrechen
                        </AlertDialogCancel>
                        <AlertDialogAction className="bg-rose-800 hover:bg-rose-900 text-gray-200 hover:text-gray-300" onClick={onDelete}>
                            Löschen
                        </AlertDialogAction>
                    </div>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default DeleteBooking;