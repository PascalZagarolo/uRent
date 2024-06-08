'use client'


import { createDeleteUserToken } from "@/actions/create-delete-user-token";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";




import { DeleteIcon } from "lucide-react";
import { startTransition, useState, useTransition } from "react";
import { toast } from "react-hot-toast";
import { TiUserDelete } from "react-icons/ti";

interface DeleteUserProps {
    userId: string
}

const DeleteUser: React.FC<DeleteUserProps> = ({
    userId
}) => {

    const [confirmPassword, setConfirmPassword] = useTransition();
    const [showsConfirm, setShowsConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [givenInput, setGivenInput] = useState("");

    const changeConfirm = () => {
        startTransition(() => {
            setShowsConfirm(true)

        })
    }

    const onClose = () => {
        setShowsConfirm(false);
        setGivenInput("")
    }

    const onDelete = async () => {
        try {
            console.log("Deleting user...")
            setIsLoading(true);
            createDeleteUserToken(userId)
                .then((data) => {
                    if (data?.error) {
                        toast.error("Fehler beim absenden des Formulars")
                    } else {
                        toast.success("Bestätigungsmail wurde an deine E-Mail versandt. Bitte überprüfe deinen Posteingang.")
                    }
                })
        } catch (error: any) {
            console.log("Fehler beim absenden des Formulars", error);
            toast.error("Fehler beim absenden des Formulars")
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog onOpenChange={(e) => {
            if (!e) {
                onClose()
            }
        }}>
            <DialogTrigger className="" asChild>
                <Button className="bg-rose-800 hover:bg-rose-900 text-gray-200 hover:text-gray-300" size="sm" variant="ghost">
                    <TiUserDelete className="w-4 h-4 mr-2" />  Account löschen
                </Button>
            </DialogTrigger>
            <DialogContent className="dark:border-none dark:bg-[#191919]">
                <div>
                    {showsConfirm ? (
                        <div>
                            <h3 className="w-full text-md font-semibold flex items-center">
                                <DeleteIcon className="w-4 h-4 text-rose-600 mr-2" /> Account löschen bestätigen?
                            </h3>

                            <div>
                                <div className="text-sm font-base mt-4">
                                    Gebe {`'LÖSCHEN'`} ein um deine Account zu löschen
                                </div>
                                <div className="mt-2">
                                    <Input
                                        value={givenInput}
                                        className="w-full dark:border-none dark:bg-[#1c1c1c] dark:text-gray-200"
                                        onChange={(e) => setGivenInput(e.target.value)}
                                        placeholder="Gebe das Keyword ein..."
                                    />
                                </div>
                            </div>
                            <div className="w-full flex justify-end mt-2">
                                <DialogTrigger asChild>
                                    <Button className="bg-rose-800 hover:bg-rose-900 text-gray-200 hover:text-gray-300"
                                        disabled={givenInput !== "LÖSCHEN"}
                                        onClick={onDelete}
                                    >
                                        Bestätigen
                                    </Button>
                                    </DialogTrigger >
                                    <DialogTrigger asChild>
                                        <Button className="dark:text-gray-200" variant="ghost">
                                            Abbrechen
                                        </Button>
                                    </DialogTrigger>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h3 className="w-full text-md font-semibold flex items-center">
                                <DeleteIcon className="w-4 h-4 text-rose-600 mr-2" /> Account löschen?
                            </h3>
                            <p className="text-xs dark:text-gray-200/60">
                                Bist du sicher, dass du deinen Account löschen möchtest? <br />
                                Diese Aktion kann nicht rückgängig gemacht werden.<br />
                                Jegliche Daten, die mit deinem Account verbunden sind, werden gelöscht und können nicht wiederhergestellt werden.
                            </p>
                            <div className="w-full flex justify-end mt-2">
                                <Button className="bg-rose-800 hover:bg-rose-900 text-gray-200 hover:text-gray-300"
                                    onClick={() => changeConfirm()}
                                >
                                    Löschen
                                </Button>
                                <Button className="dark:text-gray-200" variant="ghost">
                                    Abbrechen
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default DeleteUser;