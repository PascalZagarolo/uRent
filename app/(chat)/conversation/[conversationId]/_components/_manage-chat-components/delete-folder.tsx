import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { conversationFolder } from "@/db/schema";
import axios from "axios";
import { CarFrontIcon, StarIcon, TruckIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { PiVanFill } from "react-icons/pi";
import { RiCaravanLine } from "react-icons/ri";

interface DeleteFolderProps {
    thisFolder: typeof conversationFolder.$inferSelect;
}

const DeleteFolder: React.FC<DeleteFolderProps> = ({
    thisFolder
}) => {

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const colorResponse = (color: string) => {
        switch (color) {
            case "blue":
                return "bg-blue-800";
            case "red":
                return "bg-red-800";
            case "indigo":
                return "bg-indigo-800";
            case "green":
                return "bg-green-800";
            case "yellow":
                return "bg-yellow-800";
            case "white":
                return "bg-white";
            case "black":
                return "bg-black";
        }
    }

    const selectableColors = [
        {
            key: "blue",
            value: "bg-blue-800"
        },
        {
            red: "red",
            value: "bg-red-800"
        },
        {
            key: "green",
            value: "bg-green-800"
        },
        {
            key: "yellow",
            value: "bg-yellow-800"
        },
        {
            key: "indigo",
            value: "bg-indigo-800"
        },
        {
            key: "white",
            value: "bg-white"
        },
        {
            key: "black",
            value: "bg-black"
        }
    ]

    const selectableIcons = [
        {
            key: "star",
            value: <StarIcon className="w-4 h-4" />
        },
        {
            key: "car",
            value: <CarFrontIcon className="w-4 h-4" />
        },
        {
            key: "truck",
            value: <TruckIcon className="w-4 h-4" />
        },
        {
            key: "trailer",
            value: <RiCaravanLine className="w-4 h-4" />
        },
        {
            key: "transport",
            value: <PiVanFill className="w-4 h-4" />
        }
    ]

    function getIconByKey(key) {
        const iconObject = selectableIcons.find(icon => icon.key === key);
        return iconObject ? iconObject.value : null;
    }

    const onDelete = () => {
        try {
            setIsLoading(true);
            axios.delete(`/api/conversationFolder/${thisFolder.id}/delete`)
                .then(() => {
                    toast.success("Ordner gelöscht");
                    router.refresh();
                })
        } catch(e : any) {
            console.log(e);
            toast.error("Etwas ist schief gelaufen. Bitte versuche es erneut.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="ghost"
                    className={`
                    ${colorResponse(thisFolder.color)}
                    text-gray-200 font-semibold justify-start hover:text-gray-200/60
                `}>
                    <div className="mr-2">
                        {getIconByKey(thisFolder.icon)}
                    </div>
                    {thisFolder.title}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="dark:border-none dark:bg-[#191919]">
                <div>
                    <div>
                        <div>
                            <h3 className="flex flex-row items-center text-lg font-semibold">
                                <X className="w-4 h-4 mr-2 text-rose-600" />
                                Möchtest du den Ordner wirklich löschen?
                            </h3>
                            <p className="text-xs text-gray-200/60">
                                Gelöschte Ordner können nicht wiederhergestellt werden.
                            </p>
                        </div>
                        <div className="mt-4 flex flex-row justify-end">
                        <AlertDialogTrigger>
                                <Button variant="ghost" className="bg-rose-600 hover:bg-rose-800 text-gray-200 font-semibold"
                                onClick={onDelete}
                                >
                                    Löschen
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogCancel asChild>
                                <Button variant="ghost" className="text-gray-200 font-semibold border-none">
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

export default DeleteFolder;