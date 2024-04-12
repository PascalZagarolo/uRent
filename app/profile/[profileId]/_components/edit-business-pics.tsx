'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { businessImages } from "@/db/schema";
import axios from "axios";

import { PencilIcon, Trash2Icon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


interface EditBusinessPicsProps {
    usedImages: typeof businessImages.$inferSelect[];
}

const EditBusinessPics: React.FC<EditBusinessPicsProps> = ({
    usedImages
}) => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onDelete = async (imageId: string) => {
        try {
            setIsLoading(true)
            await axios.delete(`/api/businessImage/${imageId}`)
                .then(() => {
                    router.refresh();
                })
        } catch {
            toast.error("Fehler beim Löschen")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="hover:underline" size="sm" variant="ghost" >
                    Bilder verwalten
                </Button>
            </DialogTrigger>
            <DialogContent className="w-full dark:bg-[#191919] dark:border-none">
                <div className="w-full">
                    <h1 className="font-semibold">
                        Bilder verwalten
                    </h1>
                    <div className="space-y-2">
                        {usedImages?.map((image, index) => (
                            <div key={index} className="flex gap-2">
                                <img
                                    src={image.url}
                                    alt="Bild"
                                    className="w-full h-[100px] object-cover rounded-md"
                                />
                                <div className="ml-auto flex justify-end">
                                    <Button size="sm" variant="ghost">
                                        <PencilIcon className="w-4 h-4" />
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button size="sm" variant="ghost" >
                                                <Trash2Icon className="w-4 h-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="dark:bg-[#191919] dark:border-none">
                                            <div>
                                                <h1 className="font-semibold text-md flex items-center">
                                                  <X className="w-4 h-4 mr-2 text-rose-600" />  Bild löschen?
                                                </h1>
                                                <p className="text-xs dark:text-gray-200/70">Gelöschte Bilder können nicht wiederhergestellt werden.</p>
                                                <div className="w-full flex justify-end mt-2">
                                                    <AlertDialogCancel className="dark:border-none">
                                                        Abbrechen
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction className="dark:bg-[#111111] hover:dark:bg-[#181818] dark:text-gray-200"
                                                    onClick={() => {onDelete(image.id)}}>
                                                        Löschen
                                                    </AlertDialogAction>
                                                    
                                                </div>
                                            </div>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default EditBusinessPics;