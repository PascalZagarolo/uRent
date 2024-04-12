'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { businessImages } from "@/db/schema";
import axios from "axios";

import { ArrowDown, ArrowDown01, ArrowDownWideNarrowIcon, ArrowUp, ArrowUp01Icon, PencilIcon, Trash2Icon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { business } from '../../../../db/schema';


interface EditBusinessPicsProps {
    usedImages: typeof businessImages.$inferSelect[];
    businessId: string;
}

const EditBusinessPics: React.FC<EditBusinessPicsProps> = ({
    usedImages,
    businessId
}) => {

    const [pImage, setImage] = useState(usedImages);

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

    
        useEffect(() => {
            setImage(usedImages)
        }, [usedImages])
  

    const onPositionChange = async (newPosition, action, imageId) => {
        try {
            setIsLoading(true);
            const values = {
                position: newPosition,
                action: action,
                imageId: imageId
            };
            
            await axios.patch(`/api/business/${businessId}/images/reorder`, values).
                then((res) => {
                    
                    router.refresh();
                    
                })
            
            
        } catch {
            toast.error("Fehler beim Verschieben");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="hover:underline text-xs" size="sm" variant="ghost" >
                Bilder verwalten
                </Button>
            </DialogTrigger>
            <DialogContent className="w-full dark:bg-[#191919] dark:border-none">
                <div className="w-full">
                    <h1 className="font-semibold flex items-center ">
                       <X className="w-4 h-4 mr-2" /> Bilder verwalten
                    </h1>
                    <div className="space-y-2 mt-4">
                        {pImage?.map((image, index) => (
                            <div key={index} className="flex gap-2">
                                <div>
                                    <Button size="sm" variant="ghost" disabled={image.position === 1 || isLoading} onClick={() => {
                                        onPositionChange(image.position, "up", image.id)
                                    }}>
                                        <ArrowUp className="w-6 h-6" />
                                    </Button>
                                    <Button size="sm" variant="ghost" disabled={image.position === pImage.length || isLoading}
                                    onClick={() => {
                                        onPositionChange(image.position, "down", image.id)
                                    }}
                                    >
                                        <ArrowDown className="w-6 h-6" />
                                    </Button>
                                </div>
                                <img
                                    src={image.url}
                                    alt="Bild"
                                    className="w-full h-[100px] object-cover rounded-md"
                                />
                                <div className="ml-auto flex justify-end">
                                   
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