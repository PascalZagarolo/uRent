'use client'

import { Button } from "@/components/ui/button";

import { businessImages } from "@/db/schema";
import axios from "axios";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {  Trash2Icon  } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface UploadBusinessPicsProps {
    usedImages: typeof businessImages.$inferSelect[];
    businessId: string;
    ownProfile: boolean;
}

const UploadBusinessPics: React.FC<UploadBusinessPicsProps> = ({
    usedImages,
    businessId,
    ownProfile
}) => {



    const [rightImages, setRightImages] = useState(usedImages);

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onUpload = (result: any) => {
        try {
            setIsLoading(true)
            axios.post(`/api/business/${businessId}/images`, {
                image: result?.info?.secure_url
            }).then(() => {
                router.refresh();
            })
            toast.success("Profilbild erfolgreich hochgeladen")
        } catch {
            toast.error("Fehler beim Upload")
        } finally {
            setIsLoading(false)
        }
    }




    useEffect(() => {
        setRightImages(usedImages)
    }, [usedImages])


    return (
        <div>
            {ownProfile && usedImages.length > 0 && (
                <div className="ml-auto flex flex-row justify-end">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button size="sm" variant="ghost" className="shadow-lg bg-[#202020] rounded-b-none">
                                <Trash2Icon className="w-4 h-4 text-rose-600" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-[#191919] border-none">
                            <div>
                                <h3 className="text-lg font-semibold">
                                    Banner löschen?
                                </h3>
                                <p className="text-gray-200/60 text-xs">
                                    Gelöschte Banner können nicht wiederhergestellt werden.
                                </p>
                                <div className="ml-auto flex flex-row justify-end mt-2">
                                    <AlertDialogAction asChild>
                                        <Button className="bg-rose-600 hover:bg-rose-700 text-gray-200 hover:text-gray-300">
                                            Löschen
                                        </Button>
                                    </AlertDialogAction>
                                    <AlertDialogCancel asChild>
                                    <Button variant="ghost" className="border-none text-gray-200 hover:text-gray-300">
                                            Abbrechen
                                        </Button>
                                    </AlertDialogCancel>
                                </div>
                            </div>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            )}
            {usedImages.length > 0 && (
                <div className="w-full h-[240px] relative overflow-hidden">
                    <Image
                        src={usedImages[0].url}
                        quality={100}
                        fill
                        style={{ objectFit: "cover" }}
                        className="shadow-lg"
                        alt="Shitty Image Component i hate next/image"
                    />
                </div>
            )}
        </div>
    );
}

export default UploadBusinessPics;